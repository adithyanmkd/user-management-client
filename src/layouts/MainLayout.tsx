import { Outlet } from "react-router-dom";

// import components
import Navbar from "../shared/components/Navbar";

const MainLayout = () => {
  return (
    <>
      <div className="flex min-h-screen flex-col bg-gray-100">
        <Navbar />
        <main className="grow">
          <Outlet />
        </main>
        <p>footer</p>
      </div>
    </>
  );
};

export default MainLayout;
