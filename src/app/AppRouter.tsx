import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layouts/Mainlayout";
import Home from "../pages/Home";

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path='/' element={<Home />} />
                </Route>

                <Route path='*' element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;   