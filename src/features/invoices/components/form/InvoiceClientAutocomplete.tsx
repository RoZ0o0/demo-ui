import { Autocomplete, CircularProgress, TextField, type SxProps } from '@mui/material';
import type { Theme } from '@emotion/react';
import type { ClientRequest } from '../../../../types/client';
import { useClients } from '../../../clients/hooks';

interface ClientAutocompleteProps {
  value?: ClientRequest;
  onChange: (value?: ClientRequest) => void;
  style?: SxProps<Theme>;
}

const InvoiceClientAutocomplete = ({ value, onChange, style }: ClientAutocompleteProps) => {
  const { data, isLoading, isError, error } = useClients('', 0, 5);
  const clients = data?.content ?? [];

  return (
    <>
      {!isLoading && !isError && (
        <Autocomplete
          disablePortal
          options={clients}
          sx={{
            width: '100%',
            padding: 1,
            ...style,
          }}
          slotProps={{
            paper: {
              sx: {
                '& .MuiAutocomplete-listbox': {
                  maxHeight: 200,
                },
              },
            },
          }}
          value={value}
          onChange={(_, newValue) => onChange(newValue ?? undefined)}
          getOptionLabel={(option) => `${option.name} ${option.nip}`}
          renderInput={(params) => <TextField {...params} label="Client" />}
        />
      )}
      {isLoading && <CircularProgress />}
      {isError && (
        <div className="flex flex-1 justify-center items-center">
          <h2 className="font-bold">{error.message}</h2>
        </div>
      )}
    </>
  );
};

export default InvoiceClientAutocomplete;
