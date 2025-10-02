import { Box, Button, Stack } from '@mui/material';
import type { InvoiceItemWithKey } from '../../../../types/invoiceItem';

interface InvoiceFormItemsSectionProps {
  items: InvoiceItemWithKey[];
  errors?: string;
  dispatch: React.Dispatch<
    | { type: 'OPEN_ADD_ITEM' | 'CLOSE_ADD_ITEM' }
    | { type: 'REMOVE_ITEM'; payload: { key: string } }
    | { type: 'EDIT_ITEM'; payload: { key: string } }
  >;
}

const InvoiceFormItemsSection = ({ items, errors, dispatch }: InvoiceFormItemsSectionProps) => {
  return (
    <>
      <Button
        variant="contained"
        onClick={() => dispatch({ type: 'OPEN_ADD_ITEM' })}
        sx={{
          width: 100,
          alignSelf: 'end',
          fontSize: 12,
        }}
      >
        Add Item
      </Button>
      <Stack
        spacing={2}
        sx={{
          height: 200,
          maxHeight: 200,
          width: '100%',
          overflowY: 'auto',
          padding: 2,
          border: '1px solid #ccc',
          borderRadius: 1,
          ...(errors && { border: '1px solid red' }),
        }}
      >
        {items.map((item) => (
          <div className="w-full gap-x-1" key={item.__key}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                columnGap: 1,
                width: '100%',
              }}
            >
              <Box
                sx={{
                  width: 100,
                  display: 'flex',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(218, 221, 227)',
                  color: 'black',
                  fontSize: 18,
                  fontWeight: 'bold',
                  flex: 1,
                  overflowX: 'hidden',
                  borderRadius: 1,
                }}
              >
                {item.description}
              </Box>
              <Box sx={{ display: 'flex', columnGap: 1 }}>
                <Button
                  variant="contained"
                  onClick={() => dispatch({ type: 'EDIT_ITEM', payload: { key: item.__key } })}
                >
                  Edit
                </Button>
                <Button
                  variant="text"
                  sx={{ width: 10, color: 'red', backgroundColor: 'rgb(237, 239, 242)' }}
                  onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: { key: item.__key } })}
                >
                  X
                </Button>
              </Box>
            </Box>
          </div>
        ))}
      </Stack>
      {errors && <span className="text-red-700 text-sm">{errors}</span>}
    </>
  );
};

export default InvoiceFormItemsSection;
