import { useState } from "react";
import { InvoiceCreateDialog, InvoiceList } from "../features/invoices";
import { IconButton, Tooltip } from "@mui/material";

const Invoices = () => {
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    const handleOpenCreate = () => {
        setIsCreateOpen(true);
    }

    return (
        <>
            <div className="relative w-full flex justify-center items-center pb-4">
                <h2 className="text-center text-2xl">Invoice List</h2>
                <div className="absolute right-0">
                    <Tooltip title="Add invoice">
                        <IconButton
                            onClick={handleOpenCreate}
                            size="small"
                            className="w-8 h-8 p-0 rounded-full flex items-center justify-center !bg-green-400"
                        >
                            <span className="text-white text-2xl font-mono">+</span>
                        </IconButton>
                    </Tooltip>
                </div>
            </div>

            <div className="bg-white px-8 rounded-lg shadow-lg w-full h-full">
                <InvoiceList />
            </div>

            <InvoiceCreateDialog
                isOpen={isCreateOpen}
                onClose={() => setIsCreateOpen(false)}
            />
        </>
    )
}

export default Invoices;