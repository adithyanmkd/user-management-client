import { Routes, Route } from "react-router-dom";

// import layout
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

// import pages
import Home from "./features/home/Home";
import Register from "./features/auth/Register";
import Login from "./features/auth/Login";
import Profile from "./features/profile/Profile";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
