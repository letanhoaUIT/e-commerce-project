import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar = () => {
  const { isAdmin } = useAuth();

  if (!isAdmin()) {
    return null;
  }

  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <nav className="flex flex-col space-y-2">
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            isActive ? 'bg-gray-900 p-2 rounded' : 'p-2 rounded hover:bg-gray-700'
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/admin/show-list-product"
          className={({ isActive }) =>
            isActive ? 'bg-gray-900 p-2 rounded' : 'p-2 rounded hover:bg-gray-700'
          }
        >
          Product management
        </NavLink>
        <NavLink
          to="/admin/create-new-product"
          className={({ isActive }) =>
            isActive ? 'bg-gray-900 p-2 rounded' : 'p-2 rounded hover:bg-gray-700'
          }
        >
          Create new product
        </NavLink>
        <NavLink
          to="/admin/show-list-user"
          className={({ isActive }) =>
            isActive ? 'bg-gray-900 p-2 rounded' : 'p-2 rounded hover:bg-gray-700'
          }
        >
          User management
        </NavLink>
        <NavLink
          to="/admin/manage-categories"
          className={({ isActive }) =>
            isActive ? 'bg-gray-900 p-2 rounded' : 'p-2 rounded hover:bg-gray-700'
          }
        >
          Category management
        </NavLink>
        <NavLink
          to="/admin/manage-orders"
          className={({ isActive }) =>
            isActive ? 'bg-gray-900 p-2 rounded' : 'p-2 rounded hover:bg-gray-700'
          }
        >
          Manage orders
        </NavLink>
        <NavLink
          to="/admin/statistics"
          className={({ isActive }) =>
            isActive ? 'bg-gray-900 p-2 rounded' : 'p-2 rounded hover:bg-gray-700'
          }
        >
          Statistics
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
