import { useSelector } from "react-redux";
import type { RootState } from "@/configs/store/index";

const Home = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-50">
      {user ? (
        <div className="w-full max-w-md rounded-xl bg-white p-6 text-center shadow-md">
          <h1 className="mb-2 text-2xl font-bold">
            Welcome back, {user.name || user.email} 👋
          </h1>
          <p className="text-gray-600">
            We’re glad to see you again. Hope you’re having a great day!
          </p>
        </div>
      ) : (
        <h1 className="text-xl text-gray-700">Welcome to our app 👋</h1>
      )}
    </div>
  );
};

export default Home;
