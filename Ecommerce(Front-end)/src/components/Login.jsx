import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { loginApi } from "../service/BackEnd";
import UserProfileContext from "../context/UserContext";
import { MdEmail, MdLock } from "react-icons/md";

function Login() {
  const { token, setToken } = UserProfileContext();
  const [login, SetLogin] = useState({ email: "", password: "" });
  const navigator = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    SetLogin({
      ...login,
      [name]: value,
    });
  };

  const validateForm = () => {
    if (!login.email || !login.password) {
      toast.error("Please fill in all fields");
      return false;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(login.email)) {
      toast.error("Please enter a valid email");
      return false;
    }
    return true;
  };

  const loginUser = async () => {
    if (validateForm()) {
      try {
        const response = await loginApi(login);
        setToken(response.data);
        toast.success("Login Successful");
        navigator("/products");
      } catch (error) {
        console.error(error);
        toast.error(error?.response?.data?.error?.errorDescription || "An unexpected error occurred");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  bg-gray-900 px-4">
      <div className="max-w-md w-full bg-gray-800 rounded-xl shadow-xl p-8 border border-gray-700">
        <h2 className="text-center text-2xl font-bold text-white mb-6">Welcome Back</h2>
        <p className="text-center text-gray-400 mb-8">Sign in to your account to continue</p>

        <div className="space-y-6">
          {[
            { name: "email", label: "Email address", icon: <MdEmail className="text-gray-500" />, type: "email" },
            { name: "password", label: "Password", icon: <MdLock className="text-gray-500" />, type: "password" },
          ].map(({ name, label, icon, type }) => (
            <div key={name} className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">{label}</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {icon}
                </div>
                <input
                  type={type}
                  name={name}
                  value={login[name]}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-100 placeholder-gray-500"
                  placeholder={label}
                  required
                />
              </div>
            </div>
          ))}

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-700 bg-gray-900 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-900"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                Remember me
              </label>
            </div>
            <Link to="/forgot-password" className="text-sm text-blue-400 hover:text-blue-300">
              Forgot password?
            </Link>
          </div>

          <button
            onClick={loginUser}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors duration-200"
          >
            Sign in
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-800 text-gray-400">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-700 rounded-xl hover:bg-gray-700/50 transition-colors duration-200 text-gray-300"
            >
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
              Google
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-700 rounded-xl hover:bg-gray-700/50 transition-colors duration-200 text-gray-300"
            >
              <img src="https://github.com/favicon.ico" alt="GitHub" className="w-5 h-5" />
              GitHub
            </button>
          </div>

          <p className="text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-400 hover:text-blue-300 font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;