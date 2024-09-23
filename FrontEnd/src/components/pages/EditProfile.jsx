import React, { useState } from 'react';
import Axios from '../../constants/Axios';
import { useAuth } from '../../contexts/AuthContext';

const EditProfile = () => {
    const [currentEmail, setCurrentEmail] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { user } = useAuth();

    const validateAndSubmitEmail = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (newEmail !== confirmEmail) {
            setError('New email and confirmation email do not match');
            return;
        }

        try {
            const response = await Axios.put(`/users/${user.id}`, {
                email: newEmail,
            });

            setSuccess('Email updated successfully!');
        } catch (error) {
            setError('Failed to update email. Please try again.');
        }
    };

    const validateAndSubmitPassword = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (newPassword !== confirmPassword) {
            setError('New password and confirmation password do not match');
            return;
        }

        try {
            const response = await Axios.put(`/users/${user.id}`, {
                password: newPassword,
            });

            setSuccess('Password updated successfully!');
        } catch (error) {
            setError('Failed to update password. Please try again.');
        }
    };
 
    return (
        <div className='flex'>
            <div className='w-1/2'>
                <h2 className='font-bold text-xl mt-4 mb-4'>Email Address</h2>
                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">{success}</p>}
                <form onSubmit={validateAndSubmitEmail}>
                    <input
                        type='email'
                        placeholder='Current Email Address'
                        className="mb-4 w-80 h-10 p-3 border border-black focus:outline-none focus:ring-2 focus:ring-blue-300"
                        value={currentEmail}
                        onChange={(e) => setCurrentEmail(e.target.value)}
                        required
                    />
                    <input
                        type='email'
                        placeholder='New Email Address'
                        className="mb-4 w-80 h-10 p-3 border border-black focus:outline-none focus:ring-2 focus:ring-blue-300"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        required
                    />
                    <input
                        type='email'
                        placeholder='Re-enter New Email Address'
                        className="mb-4 w-80 h-10 p-3 border border-black focus:outline-none focus:ring-2 focus:ring-blue-300"
                        value={confirmEmail}
                        onChange={(e) => setConfirmEmail(e.target.value)}
                        required
                    />
                    <input
                        type='submit'
                        value='UPDATE MY EMAIL'
                        className="flex justify-center items-center mb-4 w-80 h-10 bg-black text-white font-bold rounded-md cursor-pointer hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                </form>
            </div>
            <div className='w-1/2'>
                <h2 className='font-bold text-xl mt-4 mb-4'>Reset Password</h2>
                <form onSubmit={validateAndSubmitPassword}>
                    <input
                        type='password'
                        placeholder='Current Password'
                        className="mb-4 w-80 h-10 p-3 border border-black focus:outline-none focus:ring-2 focus:ring-blue-300"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                    />
                    <input
                        type='password'
                        placeholder='New Password'
                        className="mb-4 w-80 h-10 p-3 border border-black focus:outline-none focus:ring-2 focus:ring-blue-300"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                    <input
                        type='password'
                        placeholder='Re-enter New Password'
                        className="mb-4 w-80 h-10 p-3 border border-black focus:outline-none focus:ring-2 focus:ring-blue-300"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <input
                        type='submit'
                        value='UPDATE PASSWORD'
                        className="flex justify-center items-center mb-4 w-80 h-10 bg-black text-white font-bold rounded-md cursor-pointer hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                </form>
            </div>
        </div>
    );
};

export default EditProfile;
