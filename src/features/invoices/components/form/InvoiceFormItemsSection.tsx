import { Button, Stack } from "@mui/material";
import type { InvoiceItemWithKey } from "../../../../types/invoiceItem";

interface InvoiceFormItemsSectionProps {
    items: InvoiceItemWithKey[];
    errors?: string;
    dispatch: React.Dispatch<
      | { type: "OPEN_ADD_ITEM" | "CLOSE_ADD_ITEM" }
      | { type: "REMOVE_ITEM"; payload: { key: string } }
      | { type: "EDIT_ITEM"; payload: { key: string } }
    >;
}

const InvoiceFormItemsSection = ({ items, errors, dispatch }: InvoiceFormItemsSectionProps) => {
    return (
      <>
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
            ...(errors && { border: "1px solid red" }),
          }}
        >
          {items.map(item => (
            <div key={item.__key}>
              {item.description} {item.quantity}
              <Button
                onClick={() => dispatch({ type: "REMOVE_ITEM", payload: { key: item.__key } })}
              >
                X
              </Button>
              <Button
                onClick={() => dispatch({ type: "EDIT_ITEM", payload: { key: item.__key } })}
              >
                Edit
              </Button>
            </div>
          ))}
        </Stack>
        {errors && <span className="text-red-700 text-sm">{errors}</span>}
      </>
    );
};

export default InvoiceFormItemsSection;