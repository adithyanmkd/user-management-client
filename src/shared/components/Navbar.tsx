import { UserRound } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../app/store";
import { logout } from "../../features/auth/authSlice";
import { useEffect } from "react";

const Navbar = () => {
  const { user, token } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = Boolean(token);
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  useEffect(() => {
    const handleStorage = () => {
      const token = localStorage.getItem("token");
      if (!token) dispatch(logout());
    };

    window.addEventListener("storage", handleStorage);
    return window.removeEventListener("storage", handleStorage);
  }, [dispatch, token]);

  return (
    <>
      {/* Top Navbar */}
      <nav className="flex w-full items-center justify-between bg-white p-4 shadow">
        <h1 className="text-xl font-bold text-gray-800">My App</h1>
        <div className="flex items-center space-x-4">
          <button className="focus:outline-none" title="View Profile">
            {user && (
              <Link
                to={"/profile"}
                className="bg-blu flex size-10 cursor-pointer items-center justify-center rounded-full bg-blue-200"
              >
                <UserRound />
              </Link>
            )}
          </button>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="cursor-pointer rounded bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <Link
              to={"/login"}
              className="cursor-pointer rounded bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
