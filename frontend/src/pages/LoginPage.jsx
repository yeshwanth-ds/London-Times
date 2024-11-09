import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, Loader, Clock } from "lucide-react";
import { useAuthStore } from "../store/authStore";

const Input = ({ icon: Icon, ...props }) => (
  <div className="relative mb-4">
    <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
    <input
      {...props}
      className="w-full px-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
    />
  </div>
);

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isLoading, error } = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      <header className="bg-white shadow-md">
        <div className="container mx-auto flex justify-between items-center p-4">
          <Link to="/" className="flex items-center space-x-2">
            <Clock className="h-8 w-8 text-gold" />
            <span className="text-2xl font-bold text-black">CHRONO</span>
          </Link>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="p-8">
            <h2 className="text-3xl font-bold mb-6 text-center text-gold">Welcome Back</h2>

            <form onSubmit={handleLogin}>
              <Input
                icon={Mail}
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                icon={Lock}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div className="flex items-center justify-between mb-6">
                <Link to="/forgot-password" className="text-sm text-gold hover:underline">
                  Forgot password?
                </Link>
              </div>

              {error && <p className="text-red-600 font-semibold mb-4">{error}</p>}

              <button
                className="w-full bg-gold hover:bg-gold/80 text-black font-bold py-3 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-opacity-50"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? <Loader className="w-6 h-6 animate-spin mx-auto" /> : "Login"}
              </button>
            </form>
          </div>
          <div className="px-8 py-4 bg-gray-50 flex justify-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="text-gold hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} CHRONO Luxury Timepieces. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;