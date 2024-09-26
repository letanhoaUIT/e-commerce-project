import React, { useEffect, useState } from "react";
import Axios from "../../constants/Axios.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../sharepages/Loading";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { useLocation, useNavigate } from "react-router-dom"; // Thêm useNavigate

const OrderItem = ({ item }) => {
  const variant = item.variant;
  const size = item.size;

  return (
    <div className="flex items-center justify-between border-b py-4">
      <div className="flex items-center space-x-4">
        <img
          src="https://www.stevemadden.com/cdn/shop/files/SM_logo_SansSerif-01.png"
          alt={variant.name}
          className="w-20 h-20 rounded-lg object-cover shadow-sm"
        />
        <div className="flex-1">
          <h2 className="text-lg font-semibold">{item.product.name}</h2>
          <p className="text-sm text-gray-500">Size: {size.name}</p>
          <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-lg font-semibold text-black">
          ${item.product.price.toFixed(2)} x {item.quantity}
        </p>
        <p className="text-xl font-bold text-green-600">
          = ${(item.product.price * item.quantity).toFixed(2)}
        </p>
      </div>
    </div>
  );
};

const Order = () => {
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState([]); // Initialize as empty

  useEffect(() => {
    // Reset selected items from location state when the component mounts
    const items = location.state?.selectedItems || [];
    setSelectedItems(items);

    if (items.length === 0) {
      toast.error("No items selected for checkout.");
    }
  }, [location.state]);

  const handlePlaceOrder = async () => {
    if (!user) {
      toast.error("User not logged in");
      return;
    }

    const orderData = {
      user_id: user.id,
      status: "pending",
      total_price: selectedItems.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
      ),
    };

    try {
      setLoading(true);
      // Tạo đơn hàng trước
      const response = await Axios.post("/orders", orderData);
      const newOrderId = response.data.id;

      // Hiển thị thông báo thành công ngay sau khi tạo đơn hàng
      toast.success("Order placed successfully!");

      const orderItemsData = selectedItems.map((item) => ({
        order_id: newOrderId,
        product_variant_size_id: item.product_variant_size.id,
        quantity: item.quantity,
        price: item.product.price,
      }));

      // Gửi tất cả các yêu cầu đồng thời nhưng không chờ phản hồi
      Promise.all(orderItemsData.map(orderItem =>
        Axios.post("/order-items", orderItem).catch(error => {
          console.error("Error placing order item:", error);
          toast.error("Error placing order item");
        })
      ));

      // Gửi email xác nhận nhưng không chờ
      Axios.post('/send-order-confirmation', { order_id: newOrderId, email: user.email });

      setSelectedItems([]); // Xóa các mục đã chọn sau khi đặt hàng thành công
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Error placing order");
    } finally {
      setLoading(false);
    }
  };


  const handleViewOrders = () => {
    setSelectedItems([]); // Clear selected items before navigating
    if (user) {
      navigate(`/myorder/${user.id}`); // Navigate to MyOrders
    }
  };

  const total = selectedItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Review Your Order</h1>
      <div className="border rounded-lg p-6 bg-white shadow-md mb-6">
        {selectedItems.length === 0 ? (
          <p className="text-center text-red-500">No items to display. Your order has been placed.</p>
        ) : (
          selectedItems.map((item) => (
            <OrderItem key={item.id} item={item} />
          ))
        )}
      </div>
      <div className="flex justify-end">
        <div className="w-full lg:w-1/3 border rounded-lg p-6 bg-gray-50 shadow-md">
          <p className="text-2xl font-bold text-center">
            Total: ${total.toFixed(2)}
          </p>
          <button
            onClick={handlePlaceOrder}
            className="w-full bg-black text-white py-3 mt-6 font-bold hover:bg-gray-800 transition-colors duration-200"
            disabled={selectedItems.length === 0} // Disable if no items
          >
            PLACE ORDER
          </button>
          <button
            onClick={handleViewOrders}
            className="w-full bg-blue-500 text-white py-3 mt-6 font-bold hover:bg-blue-400 transition-colors duration-200"
          >
            VIEW MY ORDERS
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Order;
