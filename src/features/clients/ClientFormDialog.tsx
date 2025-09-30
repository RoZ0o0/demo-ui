import {useState, type FormEvent } from "react";
import BaseDialog from "../../components/BaseDialog";
import { Button, TextField } from "@mui/material";
import { clientRequestSchema } from "../../schemas/clientRequestSchema";
import { useCreateClient } from "../../hooks/useCreateClient";
import { useCheckClientNipExists } from "../../hooks/useCheckClientNipExists";
import type { ClientRequest } from "../../types/client";

interface ClientFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const ClientFormDialog = ({ isOpen, onClose }: ClientFormDialogProps) => {
    const [client, setClient] = useState<ClientRequest>({
        name: "",
        nip: "",
        email: "",
        address: "",
        phone: "",
    });

    const [clientFormErrors, setClientFormErrors] = useState<
            Partial<Record<string, string>>
        >({});

    const { mutate: createClient } = useCreateClient();
    const { data: clientNipExists } = useCheckClientNipExists(client.nip);
    
    const nipError =
        clientNipExists === undefined
            ? typeof clientFormErrors.client === "object" && clientFormErrors.nip
            : clientNipExists.exists
            ? "NIP already exists"
            : undefined;

    const handleOnClose = () => {
        onClose();
    }

    const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setClient({ ...client, [field]: e.target.value });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const result = clientRequestSchema.safeParse(client);

        if (result.success) {
            createClient(client, {
                onSuccess: () => {
                    alert("Created");
                },
                onError: (err) => {
                    alert(err.message);
                }
            })
        } else {
            const fieldErrors: Partial<Record<string, string>> = {};
            result.error.issues.forEach((err) => {
                const field = err.path[0] as string
                fieldErrors[field] = err.message;
            });
            setClientFormErrors(fieldErrors);
        }
    };

    return (
        <>
            <BaseDialog
                isOpen={isOpen} 
                onClose={handleOnClose}
                title="Create Client"
            >
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Name"
                        value={client.name}
                        onChange={handleChange("name")}
                        error={!!clientFormErrors.name}
                        helperText={clientFormErrors.name}
                    />
                    <TextField
                        label="NIP"
                        value={client.nip}
                        onChange={handleChange("nip")}
                        error={
                            !!nipError
                        }
                        helperText={
                            nipError
                        }
                    />
                    <TextField
                        label="Email (Not required)"
                        value={client.email}
                        onChange={handleChange("email")}
                        error={!!clientFormErrors.email}
                        helperText={clientFormErrors.email}
                    />
                    <TextField
                        label="Address (Not required)"
                        value={client.address}
                        onChange={handleChange("address")}
                        error={!!clientFormErrors.address}
                        helperText={clientFormErrors.address}
                    />
                    <TextField
                        label="Phone (Not required)"
                        value={client.phone}
                        onChange={handleChange("phone")}
                        error={!!clientFormErrors.phone}
                        helperText={clientFormErrors.phone}
                    />
                    <Button type="submit" variant="contained" disabled={clientNipExists === undefined || clientNipExists.exists === true}>
                        Create Client
                    </Button>
                </form>
            </BaseDialog>
        </>
    )
}

export default ClientFormDialog;