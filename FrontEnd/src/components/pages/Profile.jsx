import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import AccountDashboard from './AccountDashboard';
import MyOrders from './MyOrders';
import MyAddressBook from './MyAddressBook';
import EditProfile from './EditProfile';
import { useAuth } from '../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const Profile = () => {
    const { user } = useAuth();
    
    if (!user) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="flex">
            <div className="w-1/4 mt-4 ml-8 p-4 bg-white">
                <h2 className="text-xl font-bold mb-4">My Account</h2>
                <ul>
                    <li className="mb-2">
                        <Link to="account-dashboard" className="">Account Dashboard</Link>
                    </li>
                    <li className="mb-2">
                        <Link to="my-address-book" className="">My Address Book</Link>
                    </li>
                    <li className="mb-2">
                        <Link to="my-orders" className="">My Orders</Link>
                    </li>
                    <li className="mb-2">
                        <Link to="/logout" className="text-red-400">Logout</Link>
                    </li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="w-3/4 p-4">
                <Routes>
                    <Route path="account-dashboard" element={<AccountDashboard />} /> {/*subpaths*/}
                    <Route path="my-address-book" element={<MyAddressBook />} />
                    <Route path="my-orders" element={<MyOrders />} />
                    <Route path="*" element={<div>Welcome to Your Profile</div>} />
                    <Route path="edit-profile" element={<EditProfile />} />
                </Routes>
            </div>
        </div>
    );
};

export default Profile;
