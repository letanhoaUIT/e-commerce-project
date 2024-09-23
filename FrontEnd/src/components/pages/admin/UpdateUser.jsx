import React, { useState, useEffect } from "react";
import Axios from "../../../constants/Axios";
import { useParams, useNavigate } from "react-router-dom";

const EditUser = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phonenumber: "",
    address: "",
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const { userId } = useParams();

  useEffect(() => {
    // Fetch user data from API
    const fetchUserData = async () => {
      try {
        const response = await Axios.get(`/get-user/${userId}`);
        setUserData(response.data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };
    fetchUserData();
  }, [userId]);

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update user data API call
    Axios.put(`/update-user/${userId}`, userData)
      .then((response) => {
        setMessage("Thông tin người dùng đã được cập nhật");
        setError("");
      })
      .catch((error) => {
        setError("Không thể cập nhật thông tin người dùng");
        console.error("Failed to update user data:", error);
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit user information</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {message && <div className="text-green-500 mb-4">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleInputChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Phone Number</label>
          <input
            type="text"
            name="name"
            value={userData.phonenumber}
            onChange={handleInputChange}
            className="border p-2 w-full"
            maxLength={20}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Address</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleInputChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default EditUser;
