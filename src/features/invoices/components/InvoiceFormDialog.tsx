import { Button, Switch, TextField, Typography} from "@mui/material";
import Stack from '@mui/material/Stack';
import { useEffect, useReducer, useState, type FormEvent } from "react";
import { initialInvoiceClient, initialInvoiceState, invoiceReducer } from "../reducers";
import { useCreateInvoice, useUpdateInvoice } from "../hooks";
import { useCheckClientNipExists } from "../../../hooks/useCheckClientNipExists";
import { invoiceRequestSchema } from "../../../schemas/invoiceRequestSchema";
import BaseDialog from "../../../components/BaseDialog";
import InvoiceItemAddDialog from "./InvoiceItemAddDialog";
import InvoiceClientAutocomplete from "./InvoiceClientAutocomplete";
import type { InvoiceResponse } from "../../../types/invoice";
import { v4 as uuidv4 } from 'uuid';
import { getNipError } from "../../../utils/nipValidation";

interface InvoiceFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  invoiceToEdit?: InvoiceResponse;
}

const InvoiceFormDialog = ({ isOpen, onClose, invoiceToEdit }: InvoiceFormDialogProps) => {
    const [state, dispatch] = useReducer(invoiceReducer, initialInvoiceState);
    const [isCreatingNewClient, setIsCreatingNewClient] = useState(false);
    const [invoiceFormErrors, setInvoiceFormErrors] = useState<
        Partial<Record<string, string | Partial<Record<string, string>>>>
    >({});

    useEffect(() => {
        if (invoiceToEdit) {
            dispatch({
                type: "SET_CLIENT",
                payload: {
                    client: {
                    name: invoiceToEdit.client?.name ?? "",
                    nip: invoiceToEdit.client?.nip ?? "",
                    address: invoiceToEdit.client?.address ?? "",
                    email: invoiceToEdit.client?.email ?? "",
                    phone: invoiceToEdit.client?.phone ?? "",
                    },
                },
            });
            dispatch({
                type: "UPDATE_INVOICE_FIELD",
                payload: {
                    invoiceNumber: invoiceToEdit.invoiceNumber ?? "",
                    issueDate: invoiceToEdit.issueDate ?? "",
                    dueDate: invoiceToEdit.dueDate ?? "",
                },
            });
            dispatch({
            type: "SET_ITEMS",
            payload: {
                items: (invoiceToEdit.items ?? []).map(item => ({
                ...item,
                __key: uuidv4(), 
                })),
            },
            });
        }
    }, [invoiceToEdit, isOpen])

    const { mutate: createInvoice } = useCreateInvoice();
    const { mutate: updateInvoice } = useUpdateInvoice();
    const { data: clientNipExists } = useCheckClientNipExists(state.data.client.nip, isCreatingNewClient);

    const nipError = getNipError({
        clientNip: state.data.client.nip,
        clientNipExists,
        formErrors: invoiceFormErrors,
        editNip: invoiceToEdit?.client.nip,
    });

    const toggleCreatingClient = (checked: boolean) => {
        setIsCreatingNewClient(checked);
        dispatch({ type: "SET_CLIENT", payload: { client: initialInvoiceClient } })
    }

    const handleOnClose = () => {
        dispatch({ type: "SET_CLIENT", payload: { client: initialInvoiceClient } });
        dispatch({ type: "CLEAR_ITEMS" });
        dispatch({ type: "UPDATE_INVOICE_FIELD", payload: { invoiceNumber: "", issueDate: "", dueDate: "" } });
        setIsCreatingNewClient(false);
        onClose();
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const invoiceJson = {
            invoiceNumber: state.data.invoiceNumber,
            issueDate: state.data.issueDate,
            dueDate: state.data.dueDate,
            client: {
                name: state.data.client.name,
                nip: state.data.client.nip,
                address: state.data.client.address,
                email: state.data.client.email,
                phone: state.data.client.phone,
            },
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            items: state.data.items.map(({ __key, ...rest }) => rest),
        };

        const result = invoiceRequestSchema.safeParse(invoiceJson);

        if (result.success) {
            if (invoiceToEdit) {
                updateInvoice({ id: invoiceToEdit.id, data: invoiceJson }, {
                    onSuccess: () => {
                        alert("Invoice Updated");
                        handleOnClose();
                    },
                    onError: (err: Error) => {
                        alert(err.message);
                    }
                })
            } else {
                createInvoice(invoiceJson, {
                    onSuccess: () => {
                        alert("Created");
                        handleOnClose();
                    },
                    onError: (err) => {
                        alert(err.message);
                    }
                })
            }
        } else {
            const nestedErrors: Partial<Record<string, string>> = {};
            const fieldErrors: Partial<Record<string, string | typeof nestedErrors>> = {};
            result.error.issues.forEach((err) => {
                const field = err.path[0] as string
                const nestedField = err.path[1] as string;

                if (!field) return;

                if (nestedField) {
                    nestedErrors[nestedField] = err.message
                    fieldErrors[field] = nestedErrors;
                } else {
                    fieldErrors[field] = err.message;
                }
            });
            setInvoiceFormErrors(fieldErrors);
        }
    };

    return (
        <>
            <BaseDialog
                isOpen={isOpen} 
                onClose={handleOnClose}
                title="Create Invoice"
            >
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Invoice Number"
                        value={state.data.invoiceNumber}
                        onChange={(e) =>
                            dispatch({ type: "UPDATE_INVOICE_FIELD", payload: { invoiceNumber: e.target.value } })
                        }
                        error={!!invoiceFormErrors.invoiceNumber}
                        helperText={invoiceFormErrors.invoiceNumber as string}
                    />
                    <TextField
                        label="Issue Date"
                        type="date"
                        placeholder=""
                        value={state.data.issueDate}
                        onChange={(e) =>
                            dispatch({ type: "UPDATE_INVOICE_FIELD", payload: { issueDate: e.target.value } })
                        }
                        slotProps={{
                            inputLabel: {
                                shrink: true,
                            }
                        }}
                        error={!!invoiceFormErrors.issueDate}
                        helperText={invoiceFormErrors.issueDate as string}
                    />
                    <TextField
                        label="Due Date"
                        type="date"
                        value={state.data.dueDate}
                        onChange={(e) =>
                            dispatch({ type: "UPDATE_INVOICE_FIELD", payload: { dueDate: e.target.value } })
                        }
                        slotProps={{
                            inputLabel: {
                                shrink: true,
                            }
                        }}
                        error={!!invoiceFormErrors.dueDate}
                        helperText={invoiceFormErrors.dueDate as string}
                    />
                    <Button variant="contained" onClick={() => dispatch({ type: "OPEN_ADD_ITEM" })}>
                        Add
                    </Button>
                    <Stack
                        spacing={2}
                        sx={{
                            height: 200,
                            maxHeight: 200,
                            overflowY: "auto",
                            padding: 2,
                            border: "1px solid #ccc",
                            borderRadius: 1,
                            ...(invoiceFormErrors.items && {
                                border: "1px solid red",
                            })
                        }}
                    >
                        {state.data.items.map((item) => (
                            <div key={item.__key}>
                                {item.description}{item.quantity}
                                <Button onClick={() => dispatch({ type: "REMOVE_ITEM", payload: { key: item.__key } })}>X</Button>
                                <Button onClick={() => dispatch({ type: "EDIT_ITEM", payload: { key: item.__key } })}>Edit</Button>
                            </div>
                        ))}
                    </Stack>
                    { invoiceFormErrors.items &&
                        <span className="text-red-700 text-sm">{invoiceFormErrors.items as string}</span> 
                    }
                    <br />
                    <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                        <Typography>Select client</Typography>
                        <Switch
                            checked={isCreatingNewClient}
                            onChange={(_, checked) => toggleCreatingClient(checked)}
                        />
                        <Typography>Create client</Typography>
                    </Stack>
                    { !isCreatingNewClient ? (
                        <>
                            <InvoiceClientAutocomplete 
                                value={state.data.client}
                                onChange={(client) => dispatch({ type:"SET_CLIENT", payload: { client } })}
                                style={{
                                    ...(invoiceFormErrors.client && {
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "red",
                                        },
                                    })
                                }}
                            />
                            { invoiceFormErrors.client && <span className="text-red-700 text-sm">Client is required</span>  }
                        </>
                    ) : (
                        <>
                            <TextField
                                label="Name"
                                value={state.data.client.name}
                                onChange={(e) =>
                                    dispatch({ type: "UPDATE_CLIENT_FIELD", payload: { name: e.target.value } })
                                }
                                error={typeof invoiceFormErrors.client === "object" && !!invoiceFormErrors.client.name}
                                helperText={typeof invoiceFormErrors.client === "object" && invoiceFormErrors.client.name}
                            />
                            <TextField
                                label="NIP"
                                value={state.data.client.nip}
                                onChange={(e) =>
                                    dispatch({ type: "UPDATE_CLIENT_FIELD", payload: { nip: e.target.value } })
                                }
                                error={
                                    !!nipError
                                }
                                helperText={
                                    nipError
                                }
                            />
                            <TextField
                                label="Address (Not required)"
                                value={state.data.client.address}
                                onChange={(e) =>
                                    dispatch({ type: "UPDATE_CLIENT_FIELD", payload: { address: e.target.value } })
                                }
                                error={typeof invoiceFormErrors.client === "object" && !!invoiceFormErrors.client.address}
                                helperText={typeof invoiceFormErrors.client === "object" && invoiceFormErrors.client.address}
                            />
                            <TextField
                                type="email"
                                label="Email (Not required)"
                                value={state.data.client.email}
                                onChange={(e) =>
                                    dispatch({ type: "UPDATE_CLIENT_FIELD", payload: { email: e.target.value } })
                                }
                                error={typeof invoiceFormErrors.client === "object" && !!invoiceFormErrors.client.email}
                                helperText={typeof invoiceFormErrors.client === "object" && invoiceFormErrors.client.email}                                
                            />
                            <TextField
                                type="tel"
                                label="Phone (Not required)"
                                value={state.data.client.phone}
                                onChange={(e) =>
                                    dispatch({ type: "UPDATE_CLIENT_FIELD", payload: { phone: e.target.value } })
                                }
                                error={typeof invoiceFormErrors.client === "object" && !!invoiceFormErrors.client.phone}
                                helperText={typeof invoiceFormErrors.client === "object" && invoiceFormErrors.client.phone}                                
                            />
                        </>
                    )}
                    <Button 
                        type="submit" 
                        variant="contained" 
                        disabled={isCreatingNewClient && (clientNipExists === undefined || clientNipExists.exists === true)
                            
                        }>
                        Save Invoice
                    </Button>
                </form>
            </BaseDialog>
            <InvoiceItemAddDialog 
                isOpen={state.ui.isAddOpen} 
                onClose={() => dispatch({ type: "CLOSE_ADD_ITEM" })} 
                onSave={(item, key) => dispatch({ type: 'SAVE_ITEM', payload: { item, key } })} 
                initialItem={state.ui.editingItem} 
            />
        </>
    )
}

export default InvoiceFormDialog;