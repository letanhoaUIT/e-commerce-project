import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx';
import PopupHeader from './PopupHeader';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleSearch = (event) => {
    event.preventDefault();
    navigate(`/products?search=${searchQuery}`);
  };


  return (
    <header id="main-header">
      <div className="headerbar bg-white shadow">
        <div className="container mx-auto flex justify-between items-center py-4">
          <div className="leftMenu flex flex-col items-left w-[30%] ml-5">
            <div className="flex flex-row items-center space-x-2">
              <Link to="/" className="logoSmall">
                <img
                  src="//www.stevemadden.com/cdn/shop/files/LOGO_ON_WHITE_fca4eb23-117e-48ff-9180-16c8855258ef_100x.png?v=1647854305"
                  alt="Go to SM PASS"
                  width="100"
                  height="100"
                  loading="lazy"
                  className="opacity-100"
                />
              </Link>

              <div className="flex items-center space-x-2">
                {user ? (
                  <>
                  <Link to ="/profile/account-dashboard" className='text-sm'>
                      Hello, {user.name}
                  </Link>
                    <button onClick={logout} className="text-sm">Sign Out</button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="text-sm">Sign In</Link>
                    <span className="text-sm">or</span>
                    <Link to="/register" className="text-sm">Join Now</Link>
                  </>
                )}
              </div>
            </div>

            <div className="site-page-menu flex items-center space-x-2">
              <ul className="flex items-center space-x-2">
                <li><Link to="/" className="text-sm">Women</Link></li>
                <li className="text-sm">|</li>
                <li><Link to="/pages/mens" className="text-sm">Men</Link></li>
              </ul>
            </div>
          </div>

          <div className="logo text-center">
            <Link to="/" className="site-logo-new">
              <div className="normal-logo">
                <img
                  className="max-h-11"
                  src="//www.stevemadden.com/cdn/shop/files/SM_logo_SansSerif-01.png?v=6595209249868950888"
                  alt="Steve Madden Logo"
                />
              </div>
            </Link>
          </div>

          <div className="rightMenu flex justify-end text-right mr-5 space-x-4 w-[30%]">
            <div className="wishlist_main_header">
              <Link to="/pages/wishlist" className="swym-wishlist">
                <svg
                  alt="Wishlist"
                  aria-labelledby="wishlist-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-heart"
                >
                  <title id="wishlist-icon">Wishlist</title>
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </Link>
            </div>

            <div className="SearchForm">
              <form
                onSubmit={handleSearch}
                className="items-center border-b border-black rounded-none overflow-hidden"
              >
                <input
                  type="text"
                  id="search_input"
                  name="q"
                  placeholder="Search"
                  aria-label="Search and use arrows or TAB to navigate results"
                  className="fast-autocomplete-input px-2 py-1 w-full"
                  autoComplete="off"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
            </div>

            <div className="cartTop cartOuter relative">
              <Link to="/cart" className="relative">
                <span className="cartCount absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">0</span>
                <svg
                  alt="Cart"
                  aria-label="cart"
                  width="24"
                  height="24"
                  viewBox="0 0 80 76"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M24.5 24H0V76H80V24H56C55.3333 16 51.2707 0 41 0C29 0 25.5 16.5 24.5 24ZM4 28V72H76V28H4ZM52 24H29C30.1667 16.5 34.5 4 41 4C46.5 4 51 16 52 24Z"
                    fill="black"
                  ></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
        <PopupHeader />
      </div>
    </header>
  );
};

export default Header;
