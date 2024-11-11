import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Loader, Clock } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import Header from "../components/Header";

const Input = ({ icon: Icon, ...props }) => (
  <div className="relative mb-4">
    <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
    <input
      {...props}
      className="w-full px-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
    />
  </div>
);

const PasswordStrengthMeter = ({ password }) => {
  // Simple password strength calculation
  const getStrength = (password) => {
    if (password.length < 6) return 0;
    if (password.length < 8) return 1;
    if (password.length < 10) return 2;
    return 3;
  };

  const strength = getStrength(password);
  const widths = ["w-1/4", "w-2/4", "w-3/4", "w-full"];
  const colors = ["bg-red-500", "bg-yellow-500", "bg-blue-500", "bg-green-500"];

  return (
    <div className="mb-4">
      <div className="h-2 w-full bg-gray-200 rounded-full">
        <div className={`h-full ${widths[strength]} ${colors[strength]} rounded-full transition-all duration-300`}></div>
      </div>
      <p className="text-xs text-gray-500 mt-1">
        {["Weak", "Fair", "Good", "Strong"][strength]} password
      </p>
    </div>
  );
};

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { signup, error, isLoading } = useAuthStore();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await signup(email, password, name);
      navigate("/verify-email");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      <Header></Header>

      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="p-8">
            <h2 className="text-3xl font-bold mb-6 text-center text-gold">Create Account</h2>

            <form onSubmit={handleSignUp}>
              <Input
                icon={User}
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
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
              
              {error && <p className="text-red-600 font-semibold mb-4">{error}</p>}
              
              <PasswordStrengthMeter password={password} />

              <button
                className="w-full bg-gold hover:bg-gold/80 text-black font-bold py-3 px-4 rounded-full border-2 border-black transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? <Loader className="w-6 h-6 animate-spin mx-auto" /> : "Sign Up"}
              </button>
            </form>

            {/* Disclaimer about administrative access */}
            <p className="text-xs text-gray-500 mt-4">
              Note: Administrative access to certain features is restricted and granted only to authorized users. If granted administrative access, you may be held responsible for specific actions.
            </p>
          </div>
          <div className="px-8 py-4 bg-gray-50 flex justify-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-gold hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} LondonTimes. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default SignUpPage;
