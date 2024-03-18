import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import MkdSDK from "../utils/MkdSDK";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../globalContext";

const AdminLoginPage = () => {
  const schema = yup
    .object({
      email: yup.string().email().required(),
      password: yup.string().required(),
    })
    .required();

  const { dispatch } = useContext(GlobalContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    let sdk = new MkdSDK(); // Create an instance of MkdSDK

    try {
      const response = await fetch(
        "https://reacttask.mkdlabs.com/v2/api/lambda/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-project":
              "cmVhY3R0YXNrOmQ5aGVkeWN5djZwN3p3OHhpMzR0OWJtdHNqc2lneTV0Nw==", // Base64 encoded project
          },
          body: JSON.stringify({
            email: data.email,
            password: data.password,
            role: "admin", // Assuming admin role for this login
          }),
        }
      );

      if (response.ok) {
        const json = await response.json();
        if (json.error === false) {
          // Login successful
          const token = json.token; // Extracts the token from the response
          localStorage.setItem("token", token); // Stores the token in localStorage

          dispatch({
            type: "SNACKBAR",
            payload: { message: "Login successful!" },
          }); // Show success message
          navigate("/admin/dashboard"); // Redirects to dashboard
        } else {
          setError("login", {
            type: "manual",
            message: json.message || "Invalid email or password",
          });
        }
      } else {
        setError("login", {
          type: "manual",
          message: "Network error",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("login", {
        type: "manual",
        message: "Unexpected error",
      });
    }
  };

  return (
    <div className="w-full max-w-xs mx-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-8 "
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className={`"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.email?.message ? "border-red-500" : ""
            }`}
          />
          <p className="text-red-500 text-xs italic">{errors.email?.message}</p>
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            placeholder="******************"
            {...register("password")}
            className={`shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
              errors.password?.message ? "border-red-500" : ""
            }`}
          />
          <p className="text-red-500 text-xs italic">
            {errors.password?.message}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <input
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            value="Sign In"
          />
        </div>
      </form>
    </div>
  );
};

export default AdminLoginPage;
