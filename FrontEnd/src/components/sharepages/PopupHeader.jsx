import React from "react";
import PropTypes from "prop-types";

const PopupHeader = () => {
  return (
    <header id="main-header" className="relative">
      <nav className="flex justify-center space-x-8 py-4 border-b">
        <MenuItem title="New & Now">
          <div className="container right-0 mt-2 w-64 bg-white p-4">
            <div className="flex justify-between">
              <div>
                <h3 className="font-bold mb-2">NEW ARRIVALS</h3>
                <ul>
                  <li><a href="/abc" className="hover:underline">Shop All</a></li>
                  <li><a href="/abc" className="hover:underline">Women&apos;s Shoes</a></li>
                  <li><a href="/abc" className="hover:underline">Men&apos;s Shoes</a></li>
                  <li><a href="/abc" className="hover:underline">Bags & Accessories</a></li>
                  <li><a href="/abc" className="hover:underline">Women&apos;s Clothing</a></li>
                  <li><a href="/abc" className="hover:underline">Kids&apos; Shoes</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-2">BEST SELLERS</h3>
                <ul>
                  <li><a href="/abc" className="hover:underline">Shop All</a></li>
                  <li><a href="/abc" className="hover:underline">Women&apos;s Shoes</a></li>
                  <li><a href="/abc" className="hover:underline">Men&apos;s Shoes</a></li>
                  <li><a href="/abc" className="hover:underline">Bags & Accessories</a></li>
                  <li><a href="/abc" className="hover:underline">Women&apos;s Clothing</a></li>
                  <li><a href="/abc" className="hover:underline">Kids&apos; Shoes</a></li>
                </ul>
              </div>
            </div>
            <img
              src="https://via.placeholder.com/150"
              alt="New Arrivals"
              className="mt-4"
            />
          </div>
        </MenuItem>
        <MenuItem title="Women's Shoes">
          <div className="container mt-2 w-64 bg-white  p-4">
            <div>
              <h3 className="font-bold mb-2">Women&apos;s Shoes</h3>
              <ul>
                <li><a href="/abc" className="hover:underline">Shop All</a></li>
                <li><a href="/abc" className="hover:underline">Sneakers</a></li>
                <li><a href="/abc" className="hover:underline">Boots</a></li>
                <li><a href="/abc" className="hover:underline">Heels</a></li>
                <li><a href="/abc" className="hover:underline">Flats</a></li>
                <li><a href="/abc" className="hover:underline">Sandals</a></li>
              </ul>
            </div>
          </div>
        </MenuItem>
        <MenuItem title="Bags & Accessories">
          <div className="container left-0 mt-2 w-64 bg-white  p-4">
            <div>
              <h3 className="font-bold mb-2">Bags & Accessories</h3>
              <ul>
                <li><a href="/abc" className="hover:underline">Shop All</a></li>
                <li><a href="/abc" className="hover:underline">Handbags</a></li>
                <li><a href="/abc" className="hover:underline">Backpacks</a></li>
                <li><a href="/abc" className="hover:underline">Wallets</a></li>
                <li><a href="/abc" className="hover:underline">Sunglasses</a></li>
                <li><a href="/abc" className="hover:underline">Watches</a></li>
              </ul>
            </div>
          </div>
        </MenuItem>
        <MenuItem title="Women's Clothing">
          <div className="container left-0 mt-2 w-64 bg-white  p-4">
            <div>
              <h3 className="font-bold mb-2">Women&apos;s Clothing</h3>
              <ul>
                <li><a href="/abc" className="hover:underline">Shop All</a></li>
                <li><a href="/abc" className="hover:underline">Dresses</a></li>
                <li><a href="/abc" className="hover:underline">Tops</a></li>
                <li><a href="/abc" className="hover:underline">Bottoms</a></li>
                <li><a href="/abc" className="hover:underline">Jumpsuits</a></li>
                <li><a href="/abc" className="hover:underline">Outerwear</a></li>
              </ul>
            </div>
          </div>
        </MenuItem>
        <MenuItem title="Men's">
          <div className="container left-0 mt-2 w-64 bg-white  p-4">
            <div>
              <h3 className="font-bold mb-2">Men&apos;s</h3>
              <ul>
                <li><a href="/abc" className="hover:underline">Shop All</a></li>
                <li><a href="/abc" className="hover:underline">Men&apos;s Shoes</a></li>
                <li><a href="/abc" className="hover:underline">Men&apos;s Clothing</a></li>
              </ul>
            </div>
          </div>
        </MenuItem>
        <MenuItem title="Kids'">
          <div className="container left-0 mt-2 w-64 bg-white p-4">
            <div>
              <h3 className="font-bold mb-2">Kids&apos;</h3>
              <ul>
                <li><a href="/abc" className="hover:underline">Shop All</a></li>
                <li><a href="/abc" className="hover:underline">Kids&apos; Shoes</a></li>
                <li><a href="/abc" className="hover:underline">Kids&apos; Clothing</a></li>
              </ul>
            </div>
          </div>
        </MenuItem>
        <MenuItem title="Shops">
          <div className="container left-0 mt-2 w-64 bg-white p-4">
            <div>
              <h3 className="font-bold mb-2">Shops</h3>
              <ul>
                <li><a href="/abc" className="hover:underline">Trend Shops</a></li>
              </ul>
            </div>
          </div>
        </MenuItem>
        <MenuItem title="Goldie">
        </MenuItem>
        <MenuItem title="Resale">
        </MenuItem>
        <MenuItem title="Sale">
        </MenuItem>
      </nav>
    </header>
  );
};

const MenuItem = ({ title, children }) => {
  return (
    <div className="relative group">
      <button className="px-4 py-2">{title}</button>
      <div className="absolute w-screen bg-white p-4 hidden group-hover:block">
        {children}
      </div>
    </div>
  );
};

MenuItem.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default PopupHeader;
