import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layouts/Mainlayout";
import Invoices from "../pages/Invoices";
import Clients from "../pages/Clients";

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Invoices />} />
                    <Route path="/client" element={<Clients />} />
                </Route>

                <Route path='*' element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;   