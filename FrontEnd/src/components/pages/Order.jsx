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
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [shippingAddress, setShippingAddress] = useState("Your default address here"); // Placeholder for the address

  useEffect(() => {
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
        0 - discount // Apply discount here
      ),
      shipping_address: shippingAddress,
      payment_method: paymentMethod,
    };

    try {
      setLoading(true);
      const response = await Axios.post("/orders", orderData);
      const newOrderId = response.data.id;

      toast.success("Order placed successfully!");

      const orderItemsData = selectedItems.map((item) => ({
        order_id: newOrderId,
        product_variant_size_id: item.product_variant_size.id,
        quantity: item.quantity,
        price: item.product.price,
      }));

      Promise.all(orderItemsData.map(orderItem =>
        Axios.post("/order-items", orderItem).catch(error => {
          console.error("Error placing order item:", error);
          toast.error("Error placing order item");
        })
      ));

      Axios.post('/send-order-confirmation', { order_id: newOrderId, email: user.email });

      setSelectedItems([]);
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Error placing order");
    } finally {
      setLoading(false);
    }
  };

  const handleApplyCoupon = () => {
    if (coupon.trim() === "") {
      toast.error("Please enter a coupon code.");
      return;
    }

    // Simulating coupon application logic
    if (coupon === "SAVE10") {
      setDiscount(10);
      toast.success("Coupon applied successfully!");
    } else {
      toast.error("Invalid coupon code.");
    }
  };

  const handleViewOrders = () => {
    setSelectedItems([]);
    if (user) {
      navigate(`/myorder/${user.id}`);
    }
  };

  const total = selectedItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0 - discount // Subtract discount from total
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

      {/* Coupon/Voucher Section */}
      <div className="border rounded-lg p-6 bg-gray-50 mb-6">
        <h2 className="text-xl font-semibold mb-2">Apply Coupon/Voucher</h2>
        <div className="flex">
          <input
            type="text"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            placeholder="Enter coupon code"
            className="border p-2 flex-grow mr-2"
          />
          <button
            onClick={handleApplyCoupon}
            className="bg-blue-500 text-white px-4 py-2"
          >
            Apply
          </button>
        </div>
        {discount > 0 && <p className="mt-2 text-green-600">Discount applied: ${discount.toFixed(2)}</p>}
      </div>

      {/* Payment Method Selection */}
      <div className="border rounded-lg p-6 bg-gray-50 mb-6">
        <h2 className="text-xl font-semibold mb-2">Payment Method</h2>
        <div className="flex flex-col">
          <label className="flex items-center mb-2">
            <input
              type="radio"
              value="cash"
              checked={paymentMethod === "cash"}
              onChange={() => setPaymentMethod("cash")}
              className="mr-2"
            />
            Thanh toán tiền mặt
          </label>
          <label className="flex items-center mb-2">
            <input
              type="radio"
              value="bank"
              checked={paymentMethod === "bank"}
              onChange={() => setPaymentMethod("bank")}
              className="mr-2"
            />
            Quét mã ngân hàng
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="momo"
              checked={paymentMethod === "momo"}
              onChange={() => setPaymentMethod("momo")}
              className="mr-2"
            />
            Quét mã Momo
          </label>
        </div>
      </div>

      {/* Shipping Address Display */}
      <div className="border rounded-lg p-6 bg-gray-50 mb-6">
        <h2 className="text-xl font-semibold mb-2">Shipping Address</h2>
        <p>{shippingAddress}</p>
        <p className="text-sm text-gray-500">If you want to change the address, please go to <a href="http://localhost:5173/profile/my-address-book" className="text-blue-500 underline">My Address Book</a></p>
      </div>

      {/* Total Summary */}
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
