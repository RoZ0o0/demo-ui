import { Autocomplete, CircularProgress, TextField, type SxProps } from "@mui/material"
import type { ClientRequest } from "../../types/client";
import { useClients } from "../../hooks/useClients";
import type { Theme } from "@emotion/react";

interface ClientAutocompleteProps {
    value?: ClientRequest;
    onChange: (value?: ClientRequest) => void;
    style?: SxProps<Theme>;
}

const ClientAutocomplete = ({ value, onChange, style}: ClientAutocompleteProps) => {
    const { data: clients = [], isLoading, isError, error } = useClients();

    return (
        <>
            { !isLoading && !isError && 
                <Autocomplete
                    disablePortal
                    options={clients}
                    sx={{ 
                        width: 300,
                        ...style,
                     }}
                    value={value}
                    onChange={(_, newValue) => onChange(newValue ?? undefined)}
                    getOptionLabel={(option) => (`${option.name} ${option.nip}`)}
                    renderInput={(params) => <TextField {...params} label="Client" />}
                />
            }
            { isLoading && 
                <CircularProgress />
            }
            { isError && 
                <div className="flex flex-1 justify-center items-center">
                    <h2 className="font-bold">{ error.message }</h2>
                </div>
            }
        </>
    )
}

export default ClientAutocomplete;