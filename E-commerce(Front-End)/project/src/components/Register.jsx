import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { createUserApi } from "../service/BackEnd";
function Register() {
  const [user, SetUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
  });
 const navigator=useNavigate()
  const handleChange = (e) => {
    SetUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const fields = [
      { field: "firstName", label: "First Name" },
      { field: "lastName", label: "Last Name" },
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
        const response = await createUserApi(user);
          console.log(response)
          toast.success("User Registered Successfully");
          navigator("/login")
        
      } catch (error) {
        console.log(error);
        if (error.response.data.error.errorCode=="001409001")
        {
          toast.error(error.response.data.error.errorDescription);
        }
        else if(error.response.data.error.errorCode=="001500001"){
          toast.error(error.response.data.error.errorDescription);
        }
        
      }
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
      <div>
        <label className="block text-gray-700 mb-2">First Name</label>
        <input
          type="text"
          name="firstName"
          value={user.firstName}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 mb-2">Last Name</label>
        <input
          type="text"
          name="lastName"
          value={user.lastName}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 mb-2">Email</label>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 mb-2">Phone Number</label>
        <input
          type="tel"
          name="phoneNumber"
          value={user.phoneNumber}
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
          value={user.password}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <button
        onClick={createUser}
        className="mt-2 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
      >
        Register
      </button>
      <p className="text-center text-gray-600">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500 hover:text-blue-600">
          Login here
        </Link>
      </p>
    </div>
  );
}

export default Register;
