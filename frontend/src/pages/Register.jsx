import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";

import API from "../services/api";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response =
  await API.post(
    "/auth/register",
    formData
  );

localStorage.setItem(
  "token",
  response.data.token
);
localStorage.setItem(
  "is2FAVerified",
  "false"
);

localStorage.setItem(

  "user",

  JSON.stringify(
    response.data.user
  )

);

navigate("/2fa");

    } catch (error) {

      alert("Register failed");

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-96"
      >

        <h1 className="text-3xl font-bold mb-6 text-center">
          Register
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full border p-3 mb-4 rounded"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border p-3 mb-4 rounded"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-3 mb-4 rounded"
          onChange={handleChange}
        />

        <button
          className="w-full bg-black text-white p-3 rounded"
        >
          Register
        </button>

        <p className="mt-4 text-center">

          Already have account?

          <Link
            to="/"
            className="text-blue-500 ml-1"
          >
            Login
          </Link>

        </p>

      </form>

    </div>

  );

}

export default Register;
