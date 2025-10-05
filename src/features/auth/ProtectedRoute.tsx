import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { type RootState } from "../../app/store";

interface ProtectedRouteProps {
  allowedRoles: string[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user) {
    return <Navigate to={"/login"} replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to={"/unauthorized"} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
