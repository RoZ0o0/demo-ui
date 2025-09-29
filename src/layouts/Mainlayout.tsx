import { Outlet } from "react-router-dom";

const MainLayout = () => {
    return (
        <div className="min-h-screen w-screen flex flex-col bg-white">
            <main className="flex-1 flex p-4">
                <Outlet />
            </main>
        </div>
    )
}

export default MainLayout;