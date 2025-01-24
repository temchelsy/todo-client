import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import GoogleAuth from "../../Components/GoogleAuth";
import { FiCheckSquare } from "react-icons/fi"; // Example logo icon

const Registration = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await fetch(`https://todo-fn88.onrender.com/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseText = await response.text();
      if (response.ok) {
        const responseData = JSON.parse(responseText);
        toast.success("Registration successful! Please check your email for verification instructions.");
        navigate("/verify-email");
      } else {
        let errorData = {};
        try {
          errorData = JSON.parse(responseText);
        } catch (error) {
          errorData = { message: "Unknown error occurred" };
        }
        toast.error(errorData.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("An error occurred during registration. Please try again later.");
    } finally {
      setLoading(false); // Ensure loading state is reset in all cases
    }
  };

  return (
    <>
      <div className="min-h-screen w-full bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-800 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
          <Link to="/" className="flex items-center justify-center space-x-2">
            <FiCheckSquare className="w-8 h-8 text-emerald-400" />
            <span className="text-2xl font-bold text-white">TaskFlow</span>
          </Link>
          <h2 className="mt-6 text-3xl font-extrabold text-white">Create your account</h2>
          <p className="mt-2 text-sm text-gray-300">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-emerald-400 hover:text-emerald-300">Sign in</Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white/5 backdrop-blur-sm py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-white/10">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              {errors.username && (
                <p className="text-red-500 text-sm">{errors.username.message}</p>
              )}
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}

              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-200">Username</label>
                <input
                  {...register("username", { required: "Username is required" })}
                  type="text"
                  className="appearance-none block w-full px-3 py-2 border border-white/10 rounded-md shadow-sm placeholder-gray-400 bg-white/5 text-white focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Username"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-200">Your email</label>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^@]+@[^@]+\.[^@]+$/,
                      message: "Enter a valid email address"
                    },
                  })}
                  type="email"
                  className="appearance-none block w-full px-3 py-2 border border-white/10 rounded-md shadow-sm placeholder-gray-400 bg-white/5 text-white focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="name@cgmail.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-200">Password</label>
                <div className="relative">
                  <input
                    {...register("password", { required: "Password is required" })}
                    type={passwordVisible ? "text" : "password"}
                    className="appearance-none block w-full px-3 py-2 border border-white/10 rounded-md shadow-sm placeholder-gray-400 bg-white/5 text-white focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  >
                    {passwordVisible ? <FaEyeSlash className="text-gray-400" /> : <FaEye className="text-gray-400" />}
                  </button>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                  disabled={loading}
                >
                  {loading ? "Registering..." : "Sign up"}
                </button>
              </div>

              <div>
                <GoogleAuth />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;