import { TextField, Switch, Typography, Box } from '@mui/material';
import Stack from '@mui/material/Stack';
import InvoiceClientAutocomplete from './InvoiceClientAutocomplete';
import type { ClientRequest } from '../../../../types/client';

interface InvoiceFormClientSectionProps {
  client: ClientRequest;
  isCreatingNewClient: boolean;
  errors?: string | Partial<Record<string, string>>;
  nipError?: string;
  onToggleCreate: (checked: boolean) => void;
  dispatch: React.Dispatch<
    | { type: 'SET_CLIENT'; payload: { client: ClientRequest | undefined } }
    | { type: 'UPDATE_CLIENT_FIELD'; payload: Partial<ClientRequest> }
  >;
}

const InvoiceFormClientSection = ({
  client,
  isCreatingNewClient,
  errors,
  nipError,
  onToggleCreate,
  dispatch,
}: InvoiceFormClientSectionProps) => {
  return (
    <>
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        <Typography>Select client</Typography>
        <Switch checked={isCreatingNewClient} onChange={(_, checked) => onToggleCreate(checked)} />
        <Typography>Create client</Typography>
      </Stack>

      {!isCreatingNewClient ? (
        <>
          <InvoiceClientAutocomplete
            value={client}
            onChange={(client) => dispatch({ type: 'SET_CLIENT', payload: { client } })}
            style={{
              ...(errors && {
                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'red' },
              }),
            }}
          />
          {errors && <span className="text-red-700 text-sm">Client is required</span>}
        </>
      ) : (
        <>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 2,
            }}
          >
            <TextField
              label="Name"
              value={client.name}
              onChange={(e) =>
                dispatch({ type: 'UPDATE_CLIENT_FIELD', payload: { name: e.target.value } })
              }
              error={typeof errors === 'object' && !!errors.name}
              helperText={typeof errors === 'object' && errors.name}
            />
            <TextField
              label="NIP"
              value={client.nip}
              onChange={(e) =>
                dispatch({ type: 'UPDATE_CLIENT_FIELD', payload: { nip: e.target.value } })
              }
              error={!!nipError}
              helperText={nipError}
            />
            <TextField
              label="Address (Not required)"
              value={client.address}
              onChange={(e) =>
                dispatch({ type: 'UPDATE_CLIENT_FIELD', payload: { address: e.target.value } })
              }
              error={typeof errors === 'object' && !!errors.address}
              helperText={typeof errors === 'object' && errors.address}
            />
            <TextField
              type="email"
              label="Email (Not required)"
              value={client.email}
              onChange={(e) =>
                dispatch({ type: 'UPDATE_CLIENT_FIELD', payload: { email: e.target.value } })
              }
              error={typeof errors === 'object' && !!errors.email}
              helperText={typeof errors === 'object' && errors.email}
            />
            <TextField
              type="tel"
              label="Phone (Not required)"
              value={client.phone}
              onChange={(e) =>
                dispatch({ type: 'UPDATE_CLIENT_FIELD', payload: { phone: e.target.value } })
              }
              error={typeof errors === 'object' && !!errors.phone}
              helperText={typeof errors === 'object' && errors.phone}
            />
          </Box>
        </>
      )}
    </>
  );
};

export default InvoiceFormClientSection;
