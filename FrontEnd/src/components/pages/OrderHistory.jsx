import React, { useEffect, useState } from "react";
import Axios from "../../constants/Axios.js";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OrderHistory = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await Axios.get(`/orders/user/${user.id}`);
                setOrders(response.data);
            } catch (error) {
                console.error("Error fetching order history:", error);
                toast.error("Failed to fetch order history");
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchOrders();
        }
    }, [user]);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="max-w-5xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">Order History</h1>
            <div className="border rounded-lg p-6 bg-white shadow-md mb-6">
                {orders.length === 0 ? (
                    <p className="text-center">No orders found.</p>
                ) : (
                    orders.map((order) => (
                        <div key={order.id} className="border-b py-4">
                            <h2 className="text-lg font-bold">Order ID: {order.id}</h2>
                            <p>Status: {order.status}</p>
                            <p>Total Price: ${order.total_price.toFixed(2)}</p>
                        </div>
                    ))
                )}
            </div>
            <ToastContainer />
        </div>
    );
};

export default OrderHistory;
