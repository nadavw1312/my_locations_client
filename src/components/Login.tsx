import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";

const Login = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      setLoading(true);
      await login(formData.username, formData.password);
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message, {});
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form className="flex flex-col">
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-2">Username</label>
          <input
            type="text"
            className="w-full p-2 border text-gray-600 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter your username"
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-2">Password</label>
          <input
            type="password"
            className="w-full p-2 border text-gray-600 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter your password"
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          onClick={handleSubmit}
        >
          Login
        </button>
        <Link to="/register" className=" text-blue-700 align-middle self-center text-center">
          Register
        </Link>
        <div className="h-8 flex items-center justify-center border-t-2">
          {loading && (
            <RotatingLines strokeColor="grey" strokeWidth="5" animationDuration="0.75" width="20" visible={true} />
          )}
        </div>
      </form>
    </div>
  );
};
export default Login;
