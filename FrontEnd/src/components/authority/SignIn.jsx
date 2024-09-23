import React, { useState } from 'react';
import Axios from '../../constants/Axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx'; // Import useAuth
import { GoogleButton } from 'react-google-button';
import { auth } from '../../firebase'; // Import Firebase auth
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'; // Import Google provider

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // Access login from AuthContext

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post('/authenticate', { email, password });
      login(response.data); // Update user in AuthContext
      navigate('/products');
    } catch (error) {
      console.error('Lỗi đăng nhập:', error);
      alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
    }
  };

  const handleGoogleLogin = async () => {
    try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);

        const googleUser = {
            email: result.user.email,
            displayName: result.user.displayName,
        };

        console.log('Google user:', googleUser); // Kiểm tra dữ liệu

        const response = await Axios.post('/google-login', googleUser);
        login(response.data); // Cập nhật người dùng trong AuthContext
        navigate('/products');
    } catch (error) {
        console.error('Google Login Error:', error);
        alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-6">
      <form className="bg-white w-full max-w-md" onSubmit={handleSubmit}>
        <img src="//www.stevemadden.com/cdn/shop/files/SM_PASS_Horizontal_Black.png?v=4558769538502108335" alt="Sm pass" />
        <p className="text-left text-gray-500 mb-6 mt-6">Join SM PASS for exclusive offers, rewards, and even early access to new products.</p>

        <label className="block mb-4">
          <span className="block text-gray-700 font-bold mb-4">Email Address*</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </label>

        <label className="block mb-4">
          <span className="block text-gray-700 font-bold mb-4">Enter a Password*</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </label>

        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Log In
        </button>

        <div className='max-w-[240px] m-auto py-4'>
          <GoogleButton onClick={handleGoogleLogin} />
        </div>
      </form>
    </div>
  );
}

export default SignIn;
