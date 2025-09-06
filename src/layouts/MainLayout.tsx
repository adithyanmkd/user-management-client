import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <p>nabar</p>
      <main>
        <Outlet />
      </main>
      <p>footer</p>
    </>
  );
};

export default MainLayout;
