import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { loginApi } from "../service/BackEnd";
import UserProfileContext from "../context/UserContext";

function Login() {
  const { token,setToken } = UserProfileContext()
  const [login, SetLogin] = useState({
    email: "",
    password: "",
  });
  const navigator = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    SetLogin({
      ...login,
      [name]: value,
    });
  };

  const validateForm = () => {
    const fields = [
      { field: "email", label: "Email" },
      { field: "password", label: "Password" },
    ];

    for (let { field, label } of fields) {
      if (login[field] === "") {
        toast.error(`Enter the ${label}`);
        return false;
      }
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
        console.log(response.data);
        setToken(response.data)
        console.log(token)
        toast.success("Login Successful");
        navigator("/products");  
      } catch (error) {
        console.error(error);

        const errorCode = error?.response?.data?.error?.errorCode;
        const errorDescription = error?.response?.data?.error?.errorDescription;

        if (errorCode === "001404001") {
          toast.error(errorDescription || "Error during login");
        } else if (errorCode === "001500001") {
          toast.error(errorDescription || "Server error");
        } else {
          toast.error("An unexpected error occurred");
        }
      }
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
      <div>
        <label className="block text-gray-700 mb-2">Email</label>
        <input
          type="email"
          name="email"
          value={login.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 mb-2">Password</label>
        <input
          type="password"
          name="password"
          value={login.password}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <button
        onClick={loginUser}
        className="mt-2 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
      >
        Login
      </button>
      <p className="text-center text-gray-600">
        Don&apos;t have an account?{" "}
        <Link to="/register" className="text-blue-500 hover:text-blue-600">
          Register here
        </Link>
      </p>
    </div>
  );
}

export default Login;
