import React from "react";
import { Link } from "react-router-dom";
import { Clock, LogOut, User, Mail, Calendar, Clock as LastLogin } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { formatDate } from "../utils/date";

const DashboardPage = () => {
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
    <header className="bg-white shadow-md">
  <div className="container mx-auto flex justify-between items-center p-4">
    <Link to="/" className="flex items-center space-x-2">
      <Clock className="h-8 w-8 text-gold" />
      <span className="text-2xl font-bold text-black">LondonTimes</span>
    </Link>
    <button
      onClick={handleLogout}
      className="flex items-center space-x-2 text-gold hover:text-gold/80 transition-colors duration-200"
    >
      <LogOut className="h-5 w-5" />
      <span>Logout</span>
    </button>
  </div>
</header>


      <main className="flex-grow container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center text-gold">Dashboard</h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-xl p-6 border border-gray-200">
            <h3 className="text-xl font-semibold text-gold mb-4">Profile Information</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <User className="h-5 w-5 text-gray-400" />
                <p className="text-gray-700">Name: {user.name}</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <p className="text-gray-700">Email: {user.email}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-xl p-6 border border-gray-200">
            <h3 className="text-xl font-semibold text-gold mb-4">Account Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-gray-400" />
                <p className="text-gray-700">
                  <span className="font-semibold">Joined: </span>
                  {new Date(user.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <LastLogin className="h-5 w-5 text-gray-400" />
                <p className="text-gray-700">
                  <span className="font-semibold">Last Login: </span>
                  {formatDate(user.lastLogin)}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 flex justify-center space-x-4">
  {/* Add Watch Button */}
  <Link
    to="/add-watch"
    className="bg-black hover:bg-gray-800 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50"
  >
    Add Watch
  </Link>

  {/* Track Watch Button */}
  <Link
    to="/track-watch"
    className="bg-white hover:bg-gray-200 text-black font-bold py-3 px-8 rounded-full border-2 border-black transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50"
  >
    Track Watch
  </Link>
</div>


        <div className="mt-12 flex justify-center">
          <button
            onClick={handleLogout}
            className="bg-gold hover:bg-gold/80 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-opacity-50"
          >
            Logout
          </button>
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

export default DashboardPage;
