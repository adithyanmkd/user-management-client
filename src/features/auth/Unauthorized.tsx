import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600">Unauthorized</h1>
        <p className="mt-4 text-lg text-gray-600">
          You do not have permission to access this page.
        </p>
        <Link
          to="/login"
          className="mt-6 inline-block rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
