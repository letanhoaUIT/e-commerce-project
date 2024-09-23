import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Import từ cùng thư mục

const AdminRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    // Nếu người dùng chưa đăng nhập, chuyển hướng đến trang đăng nhập
    return <Navigate to="/login" />;
  }

  if (user.role !== 1) {
    // Nếu người dùng không phải là admin (role !== 1), chuyển hướng đến trang chủ hoặc trang không có quyền truy cập
    return <Navigate to="/" />;
  }

  // Nếu người dùng là admin, cho phép truy cập vào trang
  return children;
};

export default AdminRoute;
