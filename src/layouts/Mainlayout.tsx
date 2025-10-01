import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 flex p-4">
        <div className="flex flex-col items-center justify-center p-4 bg-gray-100 w-full rounded-3xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
