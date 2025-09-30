import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layouts/Mainlayout";
import Invoices from "../pages/Invoices";
import Clients from "../pages/Clients";
import InvoicePreviewPage from "../pages/InvoicePreviewPage";

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Invoices />} />
                    <Route path="/client" element={<Clients />} />
                    <Route path="/invoice/:publicToken/preview" element={<InvoicePreviewPage />} />
                </Route>

                <Route path='*' element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;   