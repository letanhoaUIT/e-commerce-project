import React, { useState, useEffect } from 'react';
import Axios from '../../constants/Axios';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/AuthContext'; // Import the useAuth hook

const MyAddressBook = () => {
    const [address, setAddress] = useState("");
    const [editing, setEditing] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { user } = useAuth(); // Fetch the user from the Auth context

    // Lấy địa chỉ từ API khi component được load
    useEffect(() => {
        const fetchAddress = async () => {
            if (!user?.id) {
                setError('User ID not found');
                return;
            }

            try {
                const response = await Axios.get(`/users/${user.id}`);
                setAddress(response.data.address || "");
            } catch (error) {
                console.error("Error fetching address:", error);
                setError('Failed to fetch address.');
            }
        };

        fetchAddress();
    }, [user]);

    // Hàm để lưu địa chỉ sau khi sửa
    const handleUpdateAddress = async () => {
        if (!user?.id) {
            setError('User ID not found');
            return;
        }

        try {
            await Axios.put(`/users/${user.id}`, {
                address: address, // Truyền address vào payload của API
            });
            toast.success("Address updated successfully");
            setEditing(false); // Tắt chế độ sửa sau khi update thành công
            setSuccess('Address updated successfully!');
        } catch (error) {
            console.error("Error updating address:", error);
            toast.error("Failed to update address");
            setError('Failed to update address.');
        }
    };

    // Hàm để hiển thị ô nhập nếu người dùng nhấn vào "Edit"
    const handleEdit = () => {
        setEditing(true);
    };

    // Hàm để hủy bỏ việc chỉnh sửa
    const handleCancel = () => {
        setEditing(false);
    };

    return (
        <div>
            <h1 className="text-xl font-bold p-4">Default Address</h1>

            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}

            {editing ? (
                // Chế độ chỉnh sửa địa chỉ
                <div className="flex flex-col p-4">
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Enter your new address"
                        className="border p-2 w-full mb-4"
                    />
                    <div className="flex justify-center">
                        <button
                            onClick={handleUpdateAddress}
                            className="bg-black text-white py-2 px-4 font-bold mr-2"
                        >
                            Save
                        </button>
                        <button
                            onClick={handleCancel}
                            className="bg-gray-500 text-white py-2 px-4 font-bold"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                // Hiển thị địa chỉ hiện tại và nút chỉnh sửa, xóa
                <div className="p-4">
                    <p>{address ? address : "No address available"}</p>
                    <div className="flex text-center justify-center mt-4">
                        <button
                            className="ml-4 mr-4 font-bold hover:text-gray-500"
                            onClick={handleEdit}
                        >
                            Edit
                        </button>
                        <button
                            className="ml-4 font-bold hover:text-gray-500"
                            onClick={() => setAddress("")} // Chỉ xóa địa chỉ trong state, bạn có thể gọi API để xóa nếu cần
                        >
                            Delete
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyAddressBook;
