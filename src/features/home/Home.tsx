// import types
import { type User } from "../../shared/types/index";

const Home = () => {
  const userString = localStorage.getItem("user");
  const user: User | null = userString
    ? (JSON.parse(userString) as User)
    : null;

  return (
    <div className="flex h-full items-center justify-center pt-10">
      {/* Welcome Section */}
      <div className="text-center">
        <h1 className="mb-2 text-4xl font-bold text-gray-800">
          Welcome Home, {user?.name || "User"}!
        </h1>
        <p className="text-lg text-gray-600">We're glad to see you back!</p>
      </div>
    </div>
  );
};

export default Home;
