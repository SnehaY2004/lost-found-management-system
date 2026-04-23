import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [stats, setStats] = useState({ total: 0, lost: 0, found: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(
          "https://lost-found-management-system-0igl.onrender.com/api/items",
        );
        const items = await res.json();
        const total = items.length;
        const lost = items.filter((item) => item.type === "Lost").length;
        const found = items.filter((item) => item.type === "Found").length;
        setStats({ total, lost, found });
      } catch (err) {
        console.error("Failed to load dashboard stats", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-blue-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-2xl p-12 mb-8">
            <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
              Welcome to Lost & Found
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Help reunite lost items with their owners. Report found items or
              search for what you've lost.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <Link
                to="/add-item"
                className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-300 shadow-lg"
              >
                Report Found Item
              </Link>
              <Link
                to="/items"
                className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-lg text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 shadow-lg"
              >
                Search Lost Items
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
              <div className="bg-blue-900 text-white rounded-xl p-6 shadow-lg">
                <p className="text-sm uppercase tracking-wide text-blue-200">
                  Total Items
                </p>
                <p className="mt-3 text-4xl font-bold">{stats.total}</p>
              </div>
              <div className="bg-red-600 text-white rounded-xl p-6 shadow-lg">
                <p className="text-sm uppercase tracking-wide text-red-100">
                  Lost Items
                </p>
                <p className="mt-3 text-4xl font-bold">{stats.lost}</p>
              </div>
              <div className="bg-green-600 text-white rounded-xl p-6 shadow-lg">
                <p className="text-sm uppercase tracking-wide text-green-100">
                  Found Items
                </p>
                <p className="mt-3 text-4xl font-bold">{stats.found}</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Search Items
              </h3>
              <p className="text-gray-600">
                Browse through reported lost and found items in your area.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Report Found
              </h3>
              <p className="text-gray-600">
                Found something? Help someone get their item back by reporting
                it.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Get Rewarded
              </h3>
              <p className="text-gray-600">
                Make a difference in someone's day and feel good about it.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
