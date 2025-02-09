import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { createUserApi } from "../service/BackEnd";
import { MdPerson, MdEmail, MdLock, MdPhone } from "react-icons/md";
import { UserPlus } from "lucide-react";

function Register() {
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const fields = [
      { field: "fullName", label: "Full Name" },
      { field: "email", label: "Email" },
      { field: "password", label: "Password" },
      { field: "phoneNumber", label: "Phone Number" },
    ];

    for (let { field, label } of fields) {
      if (user[field] === "") {
        toast.error(`Enter the ${label}`);
        return false;
      }
    }
    return true;
  };

  const createUser = async () => {
    if (validateForm()) {
      try {
        await createUserApi(user);
        toast.success("User Registered Successfully");
        navigate("/login");
      } catch (error) {
        toast.error(
          error?.response?.data?.error?.errorDescription ||
            "An unexpected error occurred"
        );
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-6">
      <div className="max-w-md w-full bg-gray-800 rounded-xl shadow-xl p-8 border border-gray-700">
        <h2 className="text-center text-2xl font-bold text-white mb-6">
          Create Account
        </h2>
        <p className="text-center text-gray-400 mb-8">
          Join us to start shopping amazing products
        </p>
        <div className="space-y-5">
          {[
            {
              name: "fullName",
              label: "Full Name",
              icon: <MdPerson className="text-gray-500" />,
            },
            {
              name: "email",
              label: "Email",
              icon: <MdEmail className="text-gray-500" />,
            },
            {
              name: "phoneNumber",
              label: "Phone Number",
              icon: <MdPhone className="text-gray-500" />,
            },
            {
              name: "password",
              label: "Password",
              icon: <MdLock className="text-gray-500" />,
              type: "password",
            },
          ].map(({ name, label, icon, type = "text" }) => (
            <div key={name} className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                {label}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {icon}
                </div>
                <input
                  type={type}
                  name={name}
                  value={user[name]}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-100 placeholder-gray-500"
                  placeholder={`Enter your ${label.toLowerCase()}`}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center mt-6">
          <input
            id="terms"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-700 bg-gray-900 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-900"
            required
          />
          <label htmlFor="terms" className="ml-2 block text-sm text-gray-300">
            I agree to the{" "}
            <Link to="/terms" className="text-blue-400 hover:text-blue-300">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-blue-400 hover:text-blue-300">
              Privacy Policy
            </Link>
          </label>
        </div>

        <button
          onClick={createUser}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors duration-200 mt-6"
        >
          <UserPlus className="h-5 w-5" />
          Create Account
        </button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gray-800 text-gray-400">
              Or continue with
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-700 rounded-xl hover:bg-gray-700/50 transition-colors duration-200 text-gray-300"
          >
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              className="w-5 h-5"
            />
            Google
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-700 rounded-xl hover:bg-gray-700/50 transition-colors duration-200 text-gray-300"
          >
            <img
              src="https://github.com/favicon.ico"
              alt="GitHub"
              className="w-5 h-5"
            />
            GitHub
          </button>
        </div>

        <p className="text-center text-sm mt-5 text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-400 hover:text-blue-300 font-medium"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;