import { Button, TextField } from '@mui/material';
import { useEffect, useReducer, useState, type FormEvent } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { InvoiceResponse } from '../../../../types/invoice';
import { initialInvoiceClient, initialInvoiceState, invoiceReducer } from '../../reducers';
import { useCreateInvoice, useUpdateInvoice } from '../../hooks';
import { useCheckClientNipExists } from '../../../../hooks/useCheckClientNipExists';
import { getNipError } from '../../../../utils/nipValidation';
import { invoiceRequestSchema } from '../../../../schemas/invoiceRequestSchema';
import BaseDialog from '../../../../components/BaseDialog';
import InvoiceItemAddDialog from './InvoiceItemAddDialog';
import { InvoiceFormItemsSection } from '.';
import InvoiceFormClientSection from './InvoiceFormClientSection';

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
        type: 'SET_CLIENT',
        payload: {
          client: {
            name: invoiceToEdit.client?.name ?? '',
            nip: invoiceToEdit.client?.nip ?? '',
            address: invoiceToEdit.client?.address ?? '',
            email: invoiceToEdit.client?.email ?? '',
            phone: invoiceToEdit.client?.phone ?? '',
          },
        },
      });
      dispatch({
        type: 'UPDATE_INVOICE_FIELD',
        payload: {
          invoiceNumber: invoiceToEdit.invoiceNumber ?? '',
          issueDate: invoiceToEdit.issueDate ?? '',
          dueDate: invoiceToEdit.dueDate ?? '',
        },
      });
      dispatch({
        type: 'SET_ITEMS',
        payload: {
          items: (invoiceToEdit.items ?? []).map((item) => ({
            ...item,
            __key: uuidv4(),
          })),
        },
      });
    }
  }, [invoiceToEdit, isOpen]);

  const { mutate: createInvoice } = useCreateInvoice();
  const { mutate: updateInvoice } = useUpdateInvoice();
  const { data: clientNipExists } = useCheckClientNipExists(
    state.data.client.nip,
    isCreatingNewClient,
  );

  const nipError = getNipError({
    clientNip: state.data.client.nip,
    clientNipExists,
    formErrors: invoiceFormErrors,
    editNip: invoiceToEdit?.client.nip,
  });

  const toggleCreatingClient = (checked: boolean) => {
    setIsCreatingNewClient(checked);
    dispatch({ type: 'SET_CLIENT', payload: { client: initialInvoiceClient } });
  };

  const handleOnClose = () => {
    dispatch({ type: 'SET_CLIENT', payload: { client: initialInvoiceClient } });
    dispatch({ type: 'CLEAR_ITEMS' });
    dispatch({
      type: 'UPDATE_INVOICE_FIELD',
      payload: { invoiceNumber: '', issueDate: '', dueDate: '' },
    });
    setIsCreatingNewClient(false);
    onClose();
  };

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
        updateInvoice(
          { id: invoiceToEdit.id, data: invoiceJson },
          {
            onSuccess: () => {
              alert('Invoice Updated');
              handleOnClose();
            },
            onError: (err: Error) => {
              alert(err.message);
            },
          },
        );
      } else {
        createInvoice(invoiceJson, {
          onSuccess: () => {
            alert('Created');
            handleOnClose();
          },
          onError: (err) => {
            alert(err.message);
          },
        });
      }
    } else {
      const nestedErrors: Partial<Record<string, string>> = {};
      const fieldErrors: Partial<Record<string, string | typeof nestedErrors>> = {};
      result.error.issues.forEach((err) => {
        const field = err.path[0] as string;
        const nestedField = err.path[1] as string;

        if (!field) return;

        if (nestedField) {
          nestedErrors[nestedField] = err.message;
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
        title={invoiceToEdit ? 'Edit Invoice' : 'Create Invoice'}
      >
        <form onSubmit={handleSubmit}>
          <TextField
            label="Invoice Number"
            value={state.data.invoiceNumber}
            onChange={(e) =>
              dispatch({ type: 'UPDATE_INVOICE_FIELD', payload: { invoiceNumber: e.target.value } })
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
              dispatch({ type: 'UPDATE_INVOICE_FIELD', payload: { issueDate: e.target.value } })
            }
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            error={!!invoiceFormErrors.issueDate}
            helperText={invoiceFormErrors.issueDate as string}
          />
          <TextField
            label="Due Date"
            type="date"
            value={state.data.dueDate}
            onChange={(e) =>
              dispatch({ type: 'UPDATE_INVOICE_FIELD', payload: { dueDate: e.target.value } })
            }
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            error={!!invoiceFormErrors.dueDate}
            helperText={invoiceFormErrors.dueDate as string}
          />
          <InvoiceFormItemsSection
            items={state.data.items}
            errors={invoiceFormErrors.items as string | undefined}
            dispatch={dispatch}
          />
          <br />
          <InvoiceFormClientSection
            client={state.data.client}
            isCreatingNewClient={isCreatingNewClient}
            errors={invoiceFormErrors.client}
            nipError={nipError}
            onToggleCreate={toggleCreatingClient}
            dispatch={dispatch}
          />
          <Button
            type="submit"
            variant="contained"
            disabled={
              isCreatingNewClient &&
              (clientNipExists === undefined || clientNipExists.exists === true)
            }
          >
            Save Invoice
          </Button>
        </form>
      </BaseDialog>
      <InvoiceItemAddDialog
        isOpen={state.ui.isAddOpen}
        onClose={() => dispatch({ type: 'CLOSE_ADD_ITEM' })}
        onSave={(item, key) => dispatch({ type: 'SAVE_ITEM', payload: { item, key } })}
        initialItem={state.ui.editingItem}
      />
    </>
  );
};

export default InvoiceFormDialog;
