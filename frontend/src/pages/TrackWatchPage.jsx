import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../components/Header';

const TrackWatchPage = () => {
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [watchServices, setWatchServices] = useState([]);
  const [searchBillNo, setSearchBillNo] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  const statusColors = {
    Pending: 'bg-yellow-200',
    'In Progress': 'bg-blue-200',
    Completed: 'bg-green-200',
    Delivered: 'bg-gray-300',
  };

  useEffect(() => {
    if (!searchBillNo) {
      const fetchWatchServices = async () => {
        try {
          const urlMap = {
            Pending: 'pendingWatchServices',
            'In Progress': 'inProgressWatchServices',
            Completed: 'completedWatchServices',
            Delivered: 'deliveredWatchServices',
            All: 'allWatchServices',
          };
          const response = await axios.get(`http://localhost:5000/api/watch/${urlMap[selectedStatus]}`);
          setWatchServices(response.data.services);
          toast.success(`${selectedStatus} watch services loaded successfully`);
        } catch (error) {
          toast.error('Error fetching watch services');
        }
      };

      fetchWatchServices();
    }
  }, [selectedStatus, searchBillNo]);

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    setSearchResult(null); // Reset search result when changing the status filter
    setSearchBillNo(''); // Clear search Bill No
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/watch/watchService/${searchBillNo}`);
      setSearchResult(response.data.watchService);
      toast.success('Watch service fetched successfully!');
    } catch (error) {
      setSearchResult(null);
      toast.error('No watch service found for this Bill No.');
    }
  };

  const updateStatus = async (billNo, newStatus) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/watch/updateStatus/${billNo}`, { status: newStatus });
      toast.success(response.data.message);
      setWatchServices(watchServices.map(service =>
        service.billNo === billNo ? { ...service, serviceStatus: newStatus } : service
      ));
    } catch (error) {
      toast.error('Failed to update watch service status');
    }
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <Header />
      <ToastContainer />

      <div className="container mx-auto px-4 py-16 flex">
        <aside className="w-1/4 p-4 border-r border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Filter Watch Services</h3>
          <ul className="space-y-2">
            {['All', 'Pending', 'In Progress', 'Completed', 'Delivered'].map((status) => (
              <li key={status}>
                <button
                  className={`w-full py-2 text-left px-4 rounded ${selectedStatus === status ? 'bg-gold text-white' : 'bg-gray-100'}`}
                  onClick={() => handleStatusChange(status)}
                >
                  {status} Watches
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <main className="flex-1 p-4">
          <h2 className="text-2xl font-bold mb-6">{selectedStatus} Watch Services</h2>

          {/* Search Section */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Search by Bill No</h3>
            <div className="flex space-x-4 items-center">
              <input
                type="text"
                value={searchBillNo}
                onChange={(e) => setSearchBillNo(e.target.value)}
                placeholder="Enter Bill No"
                className="p-2 border border-gray-300 rounded"
              />
              <button
                onClick={handleSearch}
                className="py-2 px-4 bg-blue-500 text-white rounded"
              >
                Search
              </button>
            </div>
          </div>

          {/* Display watch services or search results */}
          {searchResult ? (
            <div>
              <h3 className="text-lg font-semibold">Search Result</h3>
              <table className="w-full border-collapse border">
                <thead>
                  <tr>
                    <th className="border p-3 bg-gray-100">Bill No</th>
                    <th className="border p-3 bg-gray-100">Customer Details</th>
                    <th className="border p-3 bg-gray-100">Estimated Completion Date</th>
                    <th className="border p-3 bg-gray-100">Description</th>
                    <th className="border p-3 bg-gray-100">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr key={searchResult.billNo}>
                    <td className="border p-3">{searchResult.billNo}</td>
                    <td className="border p-3">
                      <p><strong>Name:</strong> {searchResult.customerName}</p>
                      <p><strong>Email:</strong> {searchResult.customerEmail}</p>
                      <p><strong>Phone:</strong> {searchResult.customerPhoneNumber}</p>
                      <p><strong>Model:</strong> {searchResult.model}</p>
                    </td>
                    <td className="border p-3">{searchResult.estimatedCompletionDate}</td>
                    <td className="border p-3">{searchResult.description}</td>
                    <td className={`border p-3 ${statusColors[searchResult.serviceStatus]}`}>
                      <select
                        value={searchResult.serviceStatus}
                        onChange={(e) => updateStatus(searchResult.billNo, e.target.value)}
                        className="p-2 border rounded"
                      >
                        {['Pending', 'In Progress', 'Completed', 'Delivered'].map((status) => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <div>
              {/* Display filtered watch services based on selected status */}
              {watchServices.length > 0 ? (
                <table className="w-full border-collapse border">
                  <thead>
                    <tr>
                      <th className="border p-3 bg-gray-100">Bill No</th>
                      <th className="border p-3 bg-gray-100">Customer Details</th>
                      <th className="border p-3 bg-gray-100">Estimated Completion Date</th>
                      <th className="border p-3 bg-gray-100">Description</th>
                      <th className="border p-3 bg-gray-100">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {watchServices.map((service) => (
                      <tr key={service.billNo}>
                        <td className="border p-3">{service.billNo}</td>
                        <td className="border p-3">
                          <p><strong>Name:</strong> {service.customerName}</p>
                          <p><strong>Email:</strong> {service.customerEmail}</p>
                          <p><strong>Phone:</strong> {service.customerPhoneNumber}</p>
                          <p><strong>Model:</strong> {service.model}</p>
                        </td>
                        <td className="border p-3">{new Date(service.estimatedCompletionDate).toISOString().split('T')[0]}</td>

                        <td className="border p-3">{service.description}</td>
                        <td className={`border p-3 ${statusColors[service.serviceStatus]}`}>
                          <select
                            value={service.serviceStatus}
                            onChange={(e) => updateStatus(service.billNo, e.target.value)}
                            className="p-2 border rounded"
                          >
                            {['Pending', 'In Progress', 'Completed', 'Delivered'].map((status) => (
                              <option key={status} value={status}>{status}</option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-gray-500">No watch services found for the selected status.</p>
              )}
            </div>
          )}
        </main>
      </div>

      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} CHRONO Luxury Timepieces. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default TrackWatchPage;


