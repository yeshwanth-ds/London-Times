import { useState, useEffect } from "react";
import { FaUserCircle } from 'react-icons/fa';
import { Link } from "react-router-dom"; // React Router for routing

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollPosition(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrollPosition > 50 ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo Section */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 bg-black text-white flex justify-center items-center rounded-full">
            {/* Placeholder for clock icon */}
            <span className="text-xl font-bold">L</span>
          </div>
          <span className="text-2xl font-bold text-black">LondonTimes</span>
        </Link>

        {/* Navigation Menu */}
        <nav
          className={`fixed top-0 right-0 bottom-0 flex flex-col justify-center items-start bg-white w-64 transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          } md:static md:flex-row md:w-auto md:translate-x-0 -ml-20`} // Added negative margin to move left more
        >
          <Link
            to="/"
            className="py-2 px-4 text-black hover:text-gold transition-colors"
          >
            Home
          </Link>

          <Link
            to="/about"
            className="py-2 px-4 text-black hover:text-gold transition-colors"
          >
            About
          </Link>

          <Link
            to="/contact"
            className="py-2 px-4 text-black hover:text-gold transition-colors"
          >
            Contact
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center space-x-4">
          <div className="flex justify-center">
            <Link to="/dashboard" className="text-black hover:text-black">
              <FaUserCircle className="w-8 h-8" /> {/* Profile Icon */}
            </Link>
          </div>
          <button
            className="md:hidden text-black hover:text-gold"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {/* Menu button for mobile */}
            <span className="text-xl">{isMenuOpen ? "Close" : "Menu"}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
