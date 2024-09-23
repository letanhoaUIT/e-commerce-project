import React, { useEffect, useState } from "react";
import Axios from "../../constants/Axios.js";
import { useParams } from "react-router-dom";

const MyOrder = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const [orders, setOrders] = useState([]);
  const [openOrderId, setOpenOrderId] = useState(null); // Quản lý đơn hàng đang mở

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await Axios.get(`/orders?user_id=${id}`);
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [id]);

  const toggleOrderItems = (orderId) => {
    setOpenOrderId(openOrderId === orderId ? null : orderId);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-center">My Orders</h1>
      <div className="space-y-6">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order.id} className="border rounded-lg bg-white shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold mb-2">Order ID: {order.id}</h2>
                  <p className="text-lg text-gray-700 mb-2">Status: {order.status}</p>
                  <p className="text-lg text-gray-700 mb-4">Total Price: ${order.total_price.toFixed(2)}</p>
                </div>
                <button
                  onClick={() => toggleOrderItems(order.id)}
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  {openOrderId === order.id ? 'Hide Items' : 'Show Items'}
                </button>
              </div>

              {openOrderId === order.id && (
                <div className="border-t pt-4 mt-4">
                  <h3 className="text-xl font-semibold mb-2">Order Items:</h3>
                  <ul className="space-y-4">
                    {order.items.map((item) => (
                      <li key={item.id} className="border rounded-lg p-4 bg-gray-50">
                        <p className="text-lg font-medium">Product ID: {item.product_variant_size_id}</p>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        <p className="text-sm text-gray-600">Price: ${item.price.toFixed(2)}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default MyOrder;
