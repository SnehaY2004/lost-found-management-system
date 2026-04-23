import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditItem = () => {
  const [formData, setFormData] = useState({
    itemName: "",
    description: "",
    type: "Lost",
    location: "",
    date: "",
    contactInfo: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(
          `https://lost-found-management-system-0igl.onrender.com/api/items/${id}`,
        );
        setFormData({
          itemName: res.data.itemName,
          description: res.data.description,
          type: res.data.type,
          location: res.data.location,
          date: res.data.date.split("T")[0], // Format for date input
          contactInfo: res.data.contactInfo,
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchItem();
  }, [id]);

  const { itemName, description, type, location, date, contactInfo } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `https://lost-found-management-system-0igl.onrender.com/api/items/${id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      navigate("/items");
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this item?")) {
      return;
    }
    const token = localStorage.getItem("token");
    try {
      await axios.delete(
        `https://lost-found-management-system-0igl.onrender.com/api/items/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      navigate("/items");
    } catch (err) {
      console.error(err.response.data);
      alert(
        "Failed to delete item: " +
          (err.response?.data?.message || "Unknown error"),
      );
    }
  };

  return (
    <div className="min-h-screen bg-blue-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
              Edit Item
            </h2>
            <p className="text-gray-600">
              Update the item details or remove it from the system
            </p>
          </div>
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label
                  htmlFor="itemName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Item Name
                </label>
                <input
                  id="itemName"
                  type="text"
                  name="itemName"
                  value={itemName}
                  onChange={onChange}
                  placeholder="e.g., iPhone 12 Pro, Wallet, Keys"
                  required
                  className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm transition duration-300"
                />
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={description}
                  onChange={onChange}
                  placeholder="Provide detailed description including color, brand, distinctive features..."
                  required
                  rows={4}
                  className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm transition duration-300 resize-none"
                />
              </div>

              <div>
                <label
                  htmlFor="type"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Type
                </label>
                <select
                  id="type"
                  name="type"
                  value={type}
                  onChange={onChange}
                  className="appearance-none relative block w-full px-3 py-3 border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm transition duration-300"
                >
                  <option value="Lost">Lost</option>
                  <option value="Found">Found</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Location
                </label>
                <input
                  id="location"
                  type="text"
                  name="location"
                  value={location}
                  onChange={onChange}
                  placeholder="Where was it lost/found?"
                  required
                  className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm transition duration-300"
                />
              </div>

              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Date
                </label>
                <input
                  id="date"
                  type="date"
                  name="date"
                  value={date}
                  onChange={onChange}
                  required
                  className="appearance-none relative block w-full px-3 py-3 border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm transition duration-300"
                />
              </div>

              <div>
                <label
                  htmlFor="contactInfo"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Contact Information
                </label>
                <input
                  id="contactInfo"
                  type="text"
                  name="contactInfo"
                  value={contactInfo}
                  onChange={onChange}
                  placeholder="Phone number or email"
                  required
                  className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm transition duration-300"
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 shadow-lg"
              >
                Update Item
              </button>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <div className="flex items-start">
                <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <svg
                    className="w-4 h-4 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-red-800 mb-1">
                    Danger Zone
                  </h4>
                  <p className="text-sm text-red-700">
                    Deleting this item will permanently remove it from the
                    system. This action cannot be undone.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={handleDelete}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-300 shadow-lg"
            >
              Delete Item
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditItem;
