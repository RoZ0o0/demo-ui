import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
    return (
        <div className="min-h-screen w-screen bg-white">
            <main className="p-4">
                <Outlet />
            </main>
        </div>
    )
}

export default MainLayout;