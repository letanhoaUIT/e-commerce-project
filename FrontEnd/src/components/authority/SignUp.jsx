import { useState } from 'react';
import Axios from '../../constants/Axios';
import { Link } from 'react-router-dom';

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userData = {
      name,
      email,
      password,
      role: 0,
    };

    try {
      const response = await Axios.post('/users', userData);

      if (response.status === 201) {
        setMessage('Registration successful! Redirecting to login...');
        setMessageType('success');
        setTimeout(() => {
          window.location.href = '/login';
        }, 1000);
      } else {
        setMessage(`Error: ${response.data.message}`);
        setMessageType('error');
      }
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.error || error.message}`);
      setMessageType('error');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white mt-10 p-6">
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
          <span className="block text-gray-700 font-bold mb-4">Your name*</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
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

        <p className="text-sm text-gray-600 mb-6">
          By clicking “Continue”, you agree to our <a href="https://www.stevemadden.com/pages/terms-of-use" className="text-blue-500 hover:underline">Terms of Service</a> and <a href="https://www.stevemadden.com/pages/privacy-policy" className="text-blue-500 hover:underline">Privacy Policy</a>.
        </p>

        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Continue
        </button>

        <p className="text-center text-gray-600 mt-4">
          Already registered? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
        </p>

        {/* Display success or error message */}
        {message && (
          <p className={`text-center mt-4 ${messageType === 'error' ? 'text-red-500' : 'text-green-500'}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
}

export default SignUp;
