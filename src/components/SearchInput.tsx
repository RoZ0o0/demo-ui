import { TextField } from '@mui/material';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchInput = ({ value, onChange, placeholder }: SearchInputProps) => {
  return (
    <TextField
      variant="outlined"
      size="small"
      fullWidth
      placeholder={placeholder || 'Search…'}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default SearchInput;
