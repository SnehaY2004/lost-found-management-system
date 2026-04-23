import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              to="/dashboard"
              className="text-white font-bold text-xl hover:text-gray-200 transition duration-300"
            >
              Lost & Found
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/dashboard"
              className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
            >
              Dashboard
            </Link>
            <Link
              to="/items"
              className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
            >
              View Items
            </Link>
            <Link
              to="/add-item"
              className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
            >
              Add Item
            </Link>
            {token ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-300 shadow-md"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-white text-blue-600 hover:bg-gray-100 px-4 py-2 rounded-md text-sm font-medium transition duration-300 shadow-md"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
