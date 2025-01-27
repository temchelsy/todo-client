import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from './AuthContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'sonner';
import GoogleAuth from '../../Components/GoogleAuth';
import { FiCheckSquare } from 'react-icons/fi'; // Example logo icon

export default function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setRefetchCurrentUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const { accessToken, refreshToken } = await response.json();
        console.log('Login successful', { accessToken, refreshToken });
        localStorage.setItem('token', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        setRefetchCurrentUser((prev) => !prev); // Refresh user context
        toast.success('Login successful');
        navigate('/dashboard'); // Redirect to dashboard
      } else {
        const errorData = await response.json();
        console.log('Login failed', errorData);
        toast.error(errorData.message || 'Login failed'); // Display error
      }
    } catch (error) {
      console.error('An error occurred', error);
      toast.error('An error occurred. Please try again later.'); // Handle fetch error
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-800 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="flex items-center justify-center space-x-2">
          <FiCheckSquare className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-400" />
          <span className="text-lg sm:text-2xl font-bold text-white">TaskFlow</span>
        </Link>
        <h2 className="text-3xl font-extrabold text-white mt-6">Log in to your account</h2>
        <p className="mt-2 text-sm text-gray-300">
          Or{' '}
          <Link to="/register" className="font-medium text-emerald-400 hover:text-emerald-300">
            create a new account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white/5 backdrop-blur-sm py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-white/10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-200">
                Email address
              </label>
              <input
                {...register('email', { required: 'Email is required' })}
                type="email"
                id="email"
                className="appearance-none block w-full px-3 py-2 border border-white/10 rounded-md shadow-sm bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-200">
                Password
              </label>
              <div className="relative">
                <input
                  {...register('password', { required: 'Password is required' })}
                  type={passwordVisible ? 'text' : 'password'}
                  id="password"
                  className="appearance-none block w-full px-3 py-2 border border-white/10 rounded-md shadow-sm bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                />
                <button
                  type="button"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
                >
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Sign in'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <GoogleAuth />
          </div>
        </div>
      </div>
    </div>
  );
}