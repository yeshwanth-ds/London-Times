import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header";

const API_URL = import.meta.env.MODE === "development" ? "http://localhost:5000/api/watch" : "/api/watch";

const AddWatchPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    billNo: "",
    customerName: "",
    customerEmail: "",
    customerPhoneNumber: "",
    watchType: "Analog",
    brand: "",
    model: "",
    serviceType: "Cell Replacement",
    estimatedCompletionDate: "",
    cost: "",
    description: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const filteredFormData = Object.keys(formData).reduce((acc, key) => {
      if (
        formData[key] ||
        ["billNo", "customerName", "watchType", "serviceType", "estimatedCompletionDate", "cost"].includes(key)
      ) {
        acc[key] = formData[key];
      }
      return acc;
    }, {});

    try {
      const response = await axios.post(`${API_URL}/newWatchService`, filteredFormData);
      if (response.data.success) {
        toast.success("Watch service added successfully!");
        setTimeout(() => navigate("/dashboard"), 2000);
      }
    } catch (error) {
      setError("Failed to add watch service. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-8 text-gold">Add New Watch Service</h2>
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* Bill No */}
  <div className="form-group">
    <label className="block text-sm font-medium text-gray-700 mb-1">Bill No *</label>
    <input
      type="text"
      name="billNo"
      value={formData.billNo}
      onChange={handleChange}
      required
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
    />
  </div>

  {/* Customer Phone Number */}
  <div className="form-group">
    <label className="block text-sm font-medium text-gray-700 mb-1">Customer Phone Number *</label>
    <input
      type="tel"
      name="customerPhoneNumber"
      value={formData.customerPhoneNumber}
      onChange={handleChange}
      required
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
    />
  </div>

  {/* Customer Name */}
  <div className="form-group">
    <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
    <input
      type="text"
      name="customerName"
      value={formData.customerName}
      onChange={handleChange}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
    />
  </div>

  {/* Customer Email */}
  <div className="form-group">
    <label className="block text-sm font-medium text-gray-700 mb-1">Customer Email</label>
    <input
      type="email"
      name="customerEmail"
      value={formData.customerEmail}
      onChange={handleChange}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
    />
  </div>

  {/* Brand */}
  <div className="form-group">
    <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
    <input
      type="text"
      name="brand"
      value={formData.brand}
      onChange={handleChange}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
    />
  </div>

  {/* Model */}
  <div className="form-group">
    <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
    <input
      type="text"
      name="model"
      value={formData.model}
      onChange={handleChange}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
    />
  </div>

  {/* Watch Type */}
  <div className="form-group">
    <label className="block text-sm font-medium text-gray-700 mb-1">Watch Type *</label>
    <select
      name="watchType"
      value={formData.watchType}
      onChange={handleChange}
      required
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
    >
      <option value="Analog">Analog</option>
      <option value="Digital">Digital</option>
      <option value="Smartwatch">Smartwatch</option>
      <option value="Other">Other</option>
    </select>
  </div>

  {/* Service Type */}
  <div className="form-group">
    <label className="block text-sm font-medium text-gray-700 mb-1">Service Type *</label>
    <select
      name="serviceType"
      value={formData.serviceType}
      onChange={handleChange}
      required
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
    >
      <option value="Battery Replacement">Cell Replacement</option>
      <option value="Other">Other</option>
    </select>
  </div>

  {/* Estimated Completion Date */}
  <div className="form-group">
    <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Completion Date *</label>
    <input
      type="date"
      name="estimatedCompletionDate"
      value={formData.estimatedCompletionDate}
      onChange={handleChange}
      required
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
    />
  </div>

  {/* Cost */}
  <div className="form-group">
    <label className="block text-sm font-medium text-gray-700 mb-1">Cost</label>
    <input
      type="number"
      name="cost"
      value={formData.cost}
      onChange={handleChange}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
    />
  </div>
</div>

{/* Description */}
<div className="form-group mt-4">
  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
  <textarea
    name="description"
    value={formData.description}
    onChange={handleChange}
    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
  ></textarea>
</div>


          

          {error && (
            <div className="text-red-500 text-sm mt-4">
              {error}
            </div>
          )}

          <div className="flex space-x-4 mt-6">
            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full bg-gold hover:bg-gold/80 text-black font-bold py-2 px-4 rounded-full border-2 border-black transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50"
            >
              {loading ? "Submitting..." : "Add Watch Service"}
            </button>
          </div>
        </form>
      </main>

      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} LondonTimes. All rights reserved.
        </div>
      </footer>
      <ToastContainer position="top-center" autoClose={2000} hideProgressBar={false} closeOnClick pauseOnHover />
    </div>
  );
};

export default AddWatchPage;
