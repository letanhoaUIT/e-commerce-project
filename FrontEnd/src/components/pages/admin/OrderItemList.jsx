import React, { useState, useEffect } from 'react';
import Axios from "../../../constants/Axios";
import { useParams } from 'react-router-dom';

function OrderItemList() {
  const { orderID } = useParams(); // `orderID` phải khớp với tên route parameter
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderItems = async () => {
      try {
        const response = await Axios.get(`/orders/${orderID}/items`);
        setOrderItems(response.data);
      } catch (error) {
        console.error('Failed to fetch order items:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrderItems();
  }, [orderID]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Order Items</h1>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
          <p className="ml-4 text-gray-600">Loading order items...</p>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-3 px-6 text-left">Item ID</th>
                <th className="py-3 px-6 text-left">Product Variant Size ID</th>
                <th className="py-3 px-6 text-left">Quantity</th>
                <th className="py-3 px-6 text-left">Price</th>
                <th className="py-3 px-6 text-left">Total</th> {/* Thêm cột tổng giá */}
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {orderItems.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="py-3 px-6">{item.id}</td>
                  <td className="py-3 px-6">{item.product_variant_size_id}</td>
                  <td className="py-3 px-6">{item.quantity}</td>
                  <td className="py-3 px-6">${item.price.toFixed(2)}</td>
                  <td className="py-3 px-6">${(item.price * item.quantity).toFixed(2)}</td> {/* Hiển thị tổng giá */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default OrderItemList;
