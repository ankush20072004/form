import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    collegeName: '',
    batch: '',
    branch: '',
    position: '',
    checkbox1: false,
    checkbox2: false,
  });
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    // Fetch existing registrations from the backend
    axios.get('http://localhost:5000/alumni')
      .then(response => setRegistrations(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/alumni', formData)
      .then(response => {
        setRegistrations([...registrations, response.data]);
        setFormData({
          name: '',
          collegeName: '',
          batch: '',
          branch: '',
          position: '',
          checkbox1: false,
          checkbox2: false,
        });
      })
      .catch(error => console.error('Error adding data:', error));
  };

  const handleExport = () => {
    axios.get('http://localhost:5000/alumni')
      .then(response => {
        const worksheet = XLSX.utils.json_to_sheet(response.data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Alumni');
        XLSX.writeFile(workbook, 'AlumniRegistrations.xlsx');
      })
      .catch(error => console.error('Error exporting data:', error));
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6"
      style={{
        backgroundImage: `url('/images/background.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <h1 className="text-3xl font-bold text-blue-800 absolute top-4 left-4">Alumni Registration</h1>
      <div
        className="relative bg-white bg-opacity-30 backdrop-blur-md p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-300 mt-16"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-2">Name <span className="text-red-500">*</span>:</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-2">College Name <span className="text-red-500">*</span>:</label>
            <input
              type="text"
              name="collegeName"
              placeholder="Enter your college name"
              value={formData.collegeName}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-2">Batch <span className="text-red-500">*</span>:</label>
            <input
              type="text"
              name="batch"
              placeholder="Enter your batch"
              value={formData.batch}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-2">Branch <span className="text-red-500">*</span>:</label>
            <input
              type="text"
              name="branch"
              placeholder="Enter your branch"
              value={formData.branch}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-2">Position <span className="text-red-500">*</span>:</label>
            <input
              type="text"
              name="position"
              placeholder="Enter your position"
              value={formData.position}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              name="checkbox1"
              checked={formData.checkbox1}
              onChange={handleChange}
              className="mr-2"
              required
            />
            <label className="text-gray-700">Checkbox 1 <span className="text-red-500">*</span></label>
          </div>
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              name="checkbox2"
              checked={formData.checkbox2}
              onChange={handleChange}
              className="mr-2"
              required
            />
            <label className="text-gray-700">Checkbox 2 <span className="text-red-500">*</span></label>
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>
        <div className="mt-8 flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Total Registered Alumni: {registrations.length}</h2>
          <button
            onClick={handleExport}
            className="py-3 px-4 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition"
          >
            Export to Excel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
