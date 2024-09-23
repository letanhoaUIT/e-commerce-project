import React from 'react';

function Footer () {
  return (
    <footer className="bg-white text-black py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          <div>
            <h3 className="font-bold mb-2">CUSTOMER SERVICE</h3>
            <ul>
              <li><a href="#" className="text-sm hover:underline">Need Help?</a></li>
              <li><a href="#" className="text-sm hover:underline">My Account</a></li>
              <li><a href="#" className="text-sm hover:underline">Return Policy</a></li>
              <li><a href="#" className="text-sm hover:underline">Get Return Label</a></li>
              <li><a href="#" className="text-sm hover:underline">Shipping Policy</a></li>
              <li><a href="#" className="text-sm hover:underline">Shoe Size Chart</a></li>
              <li><a href="#" className="text-sm hover:underline">Cleaning & Care</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">SALES & PROMOTIONS</h3>
            <ul>
              <li><a href="#" className="text-sm hover:underline">Gift Cards</a></li>
              <li><a href="#" className="text-sm hover:underline">Teacher Discount</a></li>
              <li><a href="#" className="text-sm hover:underline">Military Discount</a></li>
              <li><a href="#" className="text-sm hover:underline">Student Discount</a></li>
              <li><a href="#" className="text-sm hover:underline">Medical Discount</a></li>
              <li><a href="#" className="text-sm hover:underline">SM Squad</a></li>
              <li><a href="#" className="text-sm hover:underline">College Ambassadors</a></li>
              <li><a href="#" className="text-sm hover:underline">Promotion Terms & Conditions</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">ABOUT THE COMPANY</h3>
            <ul>
              <li><a href="#" className="text-sm hover:underline">About Steve Madden</a></li>
              <li><a href="#" className="text-sm hover:underline">Careers</a></li>
              <li><a href="#" className="text-sm hover:underline">Investor Relations</a></li>
              <li><a href="#" className="text-sm hover:underline">Sustainability</a></li>
              <li><a href="#" className="text-sm hover:underline">CA Transparency Act</a></li>
              <li><a href="#" className="text-sm hover:underline">Transparency in Healthcare Coverage</a></li>
              <li><a href="#" className="text-sm hover:underline">Accessibility</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">SITE TERMS</h3>
            <ul>
              <li><a href="#" className="text-sm hover:underline">Site Map</a></li>
              <li><a href="#" className="text-sm hover:underline">Terms Of Use</a></li>
              <li><a href="#" className="text-sm hover:underline">Gift Card Terms Of Use</a></li>
              <li><a href="#" className="text-sm hover:underline">Terms Of Sale</a></li>
              <li><a href="#" className="text-sm hover:underline">Privacy Policy</a></li>
              <li><a href="#" className="text-sm hover:underline">Shoe Glossary</a></li>
              <li><a href="#" className="text-sm hover:underline">Consent & Release Agreement</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">SM PASS</h3>
            <ul>
              <li><a href="#" className="text-sm hover:underline">About SM PASS</a></li>
              <li><a href="#" className="text-sm hover:underline">SM PASS FAQ</a></li>
              <li><a href="#" className="text-sm hover:underline">Terms & Conditions</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">STORE LOCATOR</h3>
            <div className="mt-4">
              <h4 className="font-bold mb-2">JOIN SM PASS FOR 20% OFF YOUR FIRST ORDER & EXCLUSIVE PERKS.</h4>
              <input type="email" placeholder="Email address" className="border border-gray-300 px-2 py-1 w-full mb-2" />
              <button className="bg-black text-white px-4 py-2 w-full">GO</button>
            </div>
            <div className="flex space-x-2 mt-4">
              <a href="#" className="text-sm"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="text-sm"><i className="fab fa-twitter"></i></a>
              <a href="#" className="text-sm"><i className="fab fa-pinterest"></i></a>
              <a href="#" className="text-sm"><i className="fab fa-instagram"></i></a>
              <a href="#" className="text-sm"><i className="fab fa-youtube"></i></a>
              <a href="#" className="text-sm"><i className="fab fa-tiktok"></i></a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-300 mt-8 pt-4 flex flex-col lg:flex-row items-center justify-between text-sm">
          <span>1-888-SMADDEN</span>
          <span>info@stevemaddendirect.com</span>
          <span className="flex items-center space-x-1">
            <input type="checkbox" className="border border-gray-300" />
            <span>Your Privacy Choices</span>
          </span>
          <span>Data Privacy Portal</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
