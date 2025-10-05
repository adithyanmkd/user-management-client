import { Routes, Route } from "react-router-dom";

// import layout
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

// import pages
import Home from "./features/home/Home";
import Register from "./features/auth/Register";
import Login from "./features/auth/Login";
import Profile from "./features/profile/Profile";
import AdminLogin from "./features/auth/AdminLogin";
import Unauthorized from "./features/auth/Unauthorized";
import ProtectedRoute from "./features/auth/ProtectedRoute";
import Dashboard from "./features/dashboard/Dashboard";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/login" element={<AdminLogin />} />
      </Route>

      {/* for admin layout */}
      <Route>
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<Dashboard />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
