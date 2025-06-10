import React from 'react';
import { Link } from 'react-router-dom';
import { FaTwitter, FaFacebookF, FaYoutube, FaDiscord, FaEnvelope, FaLifeRing, FaShieldAlt, FaFileContract, FaHandsHelping, FaCode, FaGraduationCap, FaUsers } from 'react-icons/fa';
import logo from '@/assets/logo.png';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">About</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="flex items-center space-x-2 text-gray-600 hover:text-roblox-blue transition-colors group">
                  <span className="inline-block group-hover:scale-125 group-hover:-rotate-12 transition-transform duration-300">🏢</span>
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link to="/careers" className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors group">
                  <span className="inline-block group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300">💼</span>
                  <span>Careers</span>
                </Link>
              </li>
              <li>
                <Link to="/blog" className="flex items-center space-x-2 text-gray-600 hover:text-yellow-600 transition-colors group">
                  <span className="inline-block group-hover:scale-125 group-hover:-rotate-12 transition-transform duration-300">📝</span>
                  <span>Blog</span>
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
          
          <div>
            <h3 className="font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/help"
                  className="flex items-center space-x-2 text-gray-600 hover:text-roblox-blue transition-colors group"
                >
                  <FaHandsHelping className="text-xl group-hover:scale-125 group-hover:-rotate-12 transition-transform duration-300" />
                  <span>Help</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/developer-hub"
                  className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors group"
                >
                  <FaCode className="text-xl group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300" />
                  <span>Developer Hub</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/education"
                  className="flex items-center space-x-2 text-gray-600 hover:text-yellow-600 transition-colors group"
                >
                  <FaGraduationCap className="text-xl group-hover:scale-125 group-hover:-rotate-12 transition-transform duration-300" />
                  <span>Education</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/community"
                  className="flex items-center space-x-2 text-gray-600 hover:text-pink-600 transition-colors group"
                >
                  <FaUsers className="text-xl group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300" />
                  <span>Community</span>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/contact"
                  className="flex items-center space-x-2 text-gray-600 hover:text-roblox-blue transition-colors group"
                >
                  <FaEnvelope className="text-xl group-hover:scale-125 group-hover:-rotate-12 transition-transform duration-300" />
                  <span>Contact Us</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/help-center"
                  className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors group"
                >
                  <FaLifeRing className="text-xl group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300" />
                  <span>Help Center</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/safety"
                  className="flex items-center space-x-2 text-gray-600 hover:text-yellow-600 transition-colors group"
                >
                  <FaShieldAlt className="text-xl group-hover:scale-125 group-hover:-rotate-12 transition-transform duration-300" />
                  <span>Safety</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="flex items-center space-x-2 text-gray-600 hover:text-pink-600 transition-colors group"
                >
                  <FaFileContract className="text-xl group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300" />
                  <span>Terms</span>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Social</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-400 transition-colors group"
                >
                  <FaTwitter className="text-xl group-hover:scale-125 group-hover:-rotate-12 transition-transform duration-300" />
                  <span>Twitter</span>
                </a>
              </li>
              <li>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors group"
                >
                  <FaFacebookF className="text-xl group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300" />
                  <span>Facebook</span>
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors group"
                >
                  <FaYoutube className="text-xl group-hover:scale-125 group-hover:-rotate-12 transition-transform duration-300" />
                  <span>YouTube</span>
                </a>
              </li>
              <li>
                <a
                  href="https://discord.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-600 hover:text-indigo-500 transition-colors group"
                >
                  <FaDiscord className="text-xl group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300" />
                  <span>Discord</span>
                </a>
              </li>
            </ul>
          </div>
          
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <div className="inline-block mb-4">
              <img
                src={logo}
                alt="Logo"
                className="h-20 w-auto rounded"
              />
            </div>
            <p className="text-gray-600 mb-4">Kiddoverse is a global platform that brings people together through play.</p>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">&copy; {new Date().getFullYear()} Kiddoverse. All rights reserved.</p>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-gray-500 text-sm hover:text-gray-900">Privacy</Link>
              <Link to="/terms" className="text-gray-500 text-sm hover:text-gray-900">Terms</Link>
              <Link to="/cookies" className="text-gray-500 text-sm hover:text-gray-900">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
