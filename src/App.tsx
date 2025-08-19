import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import layout
import AuthLayout from "./layout/AuthLayout";

// import pages
import Register from "./pages/auth/Register";
import Home from "./pages/user/Home";
import Login from "./pages/auth/Login";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path={"/auth"} element={<AuthLayout />}>
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
