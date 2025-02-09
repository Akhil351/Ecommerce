import { useState } from 'react';
import { FaShoppingCart, FaStore, FaUserCircle, FaClipboardList, FaBars, FaTimes } from 'react-icons/fa';
import { MdLogin, MdAppRegistration } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import UserProfileContext from "../context/UserContext";

function Navbar() {
  const { token, setToken } = UserProfileContext();
  const navigator = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
      navigator("/login");
    }
  }, [token]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-800 text-white p-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FaStore className="text-2xl" />
          <Link to="/products" className="text-xl font-bold">Ecommerce</Link>
        </div>

        {/* Hamburger Menu Icon */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isMenuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/products" className="flex items-center space-x-1 hover:text-gray-300">
            <FaStore className="text-xl" />
            <span>Products</span>
          </Link>
          
          {token && (
            <>
              <Link to="/cart" className="flex items-center space-x-1 hover:text-gray-300">
                <FaShoppingCart className="text-xl" />
                <span>Cart</span>
              </Link>
              
              <Link to="/orders" className="flex items-center space-x-1 hover:text-gray-300">
                <FaClipboardList className="text-xl" />
                <span>Orders</span>
              </Link>
              
              <button 
                onClick={() => setToken("")} 
                className="flex items-center space-x-1 hover:text-gray-300"
              >
                <FaUserCircle className="text-xl" />
                <span>Logout</span>
              </button>
            </>
          )}
          
          {!token && (
            <div className="flex items-center space-x-4 ml-4">
              <Link to="/login" className="flex items-center space-x-1 hover:text-gray-300">
                <MdLogin className="text-xl" />
                <span>Login</span>
              </Link>
              
              <Link to="/register" className="flex items-center space-x-1 hover:text-gray-300">
                <MdAppRegistration className="text-xl" />
                <span>Register</span>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-gray-800 p-4">
            <Link to="/products" className="block py-2 hover:text-gray-300">
              <div className="flex items-center space-x-1">
                <FaStore className="text-xl" />
                <span>Products</span>
              </div>
            </Link>
            
            {token && (
              <>
                <Link to="/cart" className="block py-2 hover:text-gray-300">
                  <div className="flex items-center space-x-1">
                    <FaShoppingCart className="text-xl" />
                    <span>Cart</span>
                  </div>
                </Link>
                
                <Link to="/orders" className="block py-2 hover:text-gray-300">
                  <div className="flex items-center space-x-1">
                    <FaClipboardList className="text-xl" />
                    <span>Orders</span>
                  </div>
                </Link>
                
                <button 
                  onClick={() => setToken("")} 
                  className="block py-2 hover:text-gray-300 w-full text-left"
                >
                  <div className="flex items-center space-x-1">
                    <FaUserCircle className="text-xl" />
                    <span>Logout</span>
                  </div>
                </button>
              </>
            )}
            
            {!token && (
              <div className="space-y-2">
                <Link to="/login" className="block py-2 hover:text-gray-300">
                  <div className="flex items-center space-x-1">
                    <MdLogin className="text-xl" />
                    <span>Login</span>
                  </div>
                </Link>
                
                <Link to="/register" className="block py-2 hover:text-gray-300">
                  <div className="flex items-center space-x-1">
                    <MdAppRegistration className="text-xl" />
                    <span>Register</span>
                  </div>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;