import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaTwitter, 
  FaFacebookF, 
  FaYoutube, 
  FaEnvelope, 
  FaShieldAlt, 
  FaLifeRing, 
  FaQuestionCircle, 
  FaTiktok
} from 'react-icons/fa';
import logo from '@/assets/logo.png';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 pt-8 pb-6">
      <div className="container mx-auto px-4">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Logo and Description */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1 order-1 lg:order-4">
            <div className="flex flex-col items-center lg:items-start">
              <img
                src={logo}
                alt="Logo"
                className="h-16 w-auto rounded mb-4"
              />
              <p className="text-gray-600 text-center lg:text-left text-sm">
                KiddoVase is a global platform that brings people together through play.
              </p>
            </div>
          </div>

          {/* About Section */}
          <div className="order-2">
            <h3 className="font-bold text-lg mb-3 text-center lg:text-left">About</h3>
            <ul className="space-y-2 flex flex-col items-center lg:items-start">
              <li>
                <Link to="/about" className="flex items-center space-x-2 text-gray-600 hover:text-roblox-blue transition-colors group">
                  <span className="inline-block group-hover:scale-125 group-hover:-rotate-12 transition-transform duration-300">🏢</span>
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link to="/parents" className="flex items-center space-x-2 text-gray-600 hover:text-pink-600 transition-colors group">
                  <span className="inline-block group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300">👨‍👩‍👧‍👦</span>
                  <span>Parents</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* 🆘 Support Section (Updated) */}
          <div className="order-3">
            <h3 className="font-bold text-lg mb-3 text-center lg:text-left">Support</h3>
            <ul className="space-y-2 flex flex-col items-center lg:items-start">
              
              <li>
                <Link to="/help" className="flex items-center space-x-2 text-gray-600 hover:text-[#8d0b41] transition-colors group">
                  <FaLifeRing className="text-lg group-hover:scale-125 group-hover:-rotate-12 transition-transform duration-300" />
                  <span>Help</span>
                </Link>
              </li>

              <li>
                <Link to="/help-center" className="flex items-center space-x-2 text-gray-600 hover:text-[#a60e4d] transition-colors group">
                  <FaQuestionCircle className="text-lg group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300" />
                  <span>Help Center</span>
                </Link>
              </li>

              <li>
                <Link to="/contact" className="flex items-center space-x-2 text-gray-600 hover:text-roblox-blue transition-colors group">
                  <FaEnvelope className="text-lg group-hover:scale-125 group-hover:-rotate-12 transition-transform duration-300" />
                  <span>Contact Us</span>
                </Link>
              </li>

              <li>
                <Link to="/safety" className="flex items-center space-x-2 text-gray-600 hover:text-yellow-600 transition-colors group">
                  <FaShieldAlt className="text-lg group-hover:scale-125 group-hover:-rotate-12 transition-transform duration-300" />
                  <span>Safety</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Section */}
          <div className="order-4 lg:order-3">
            <h3 className="font-bold text-lg mb-3 text-center lg:text-left">Social</h3>
            <ul className="space-y-2 flex flex-col items-center lg:items-start">
              <li>
                <a href="https://www.tiktok.com/@kiddovase" target="_blank" rel="noopener noreferrer"
                   className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors group">
                  <FaTiktok className="text-lg group-hover:scale-125 group-hover:-rotate-12 transition-transform duration-300" />
                  <span>TikTok</span>
                </a>
              </li>
              <li>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" 
                   className="flex items-center space-x-2 text-gray-600 hover:text-blue-400 transition-colors group">
                  <FaTwitter className="text-lg group-hover:scale-125 group-hover:-rotate-12 transition-transform duration-300" />
                  <span>Twitter</span>
                </a>
              </li>
              <li>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                   className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors group">
                  <FaFacebookF className="text-lg group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300" />
                  <span>Facebook</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-200 mt-8 pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-gray-500 text-xs">
              &copy; {new Date().getFullYear()} KiddoVase. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <Link to="/privacy" className="text-gray-500 text-xs hover:text-gray-900">Privacy</Link>
              <Link to="/terms" className="text-gray-500 text-xs hover:text-gray-900">Terms</Link>
              <Link to="/cookies" className="text-gray-500 text-xs hover:text-gray-900">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
