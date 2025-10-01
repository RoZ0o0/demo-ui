import { Pagination, Select, MenuItem, Stack } from '@mui/material';

interface ListPaginationProps {
  page: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  pageSizeOptions?: number[];
}

const ListPagination = ({
  page,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [5, 10, 20, 50],
}: ListPaginationProps) => {
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Pagination
        count={totalPages}
        page={page + 1}
        onChange={(_, value) => onPageChange(value - 1)}
        color="primary"
      />
      <Select value={pageSize} onChange={(e) => onPageSizeChange(Number(e.target.value))}>
        {pageSizeOptions.map((size) => (
          <MenuItem key={size} value={size}>
            {size}
          </MenuItem>
        ))}
      </Select>
    </Stack>
  );
};

export default ListPagination;
