// Footer.jsx
import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa'; // Updated imports
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white text-black py-12 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gold">About CHRONO</h3>
            <p className="text-sm text-gray-600">
              Crafting timeless elegance since 1950. Our watches are a testament to precision, luxury, and unparalleled style.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gold">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/terms" className="text-sm text-gray-600 hover:text-gold transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-sm text-gray-600 hover:text-gold transition-colors">Privacy Policy</Link></li>
              <li><Link to="/faq" className="text-sm text-gray-600 hover:text-gold transition-colors">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gold">Contact Us</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>123 Luxury Lane, Timeville</li>
              <li>contact@chrono.com</li>
              <li>+1 (555) 123-4567</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gold">Follow Us</h3>
            <div className="flex space-x-4">
              <Link to="#" className="text-gray-600 hover:text-gold transition-colors">
                <FaInstagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link to="#" className="text-gray-600 hover:text-gold transition-colors">
                <FaFacebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link to="#" className="text-gray-600 hover:text-gold transition-colors">
                <FaTwitter className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} CHRONO. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
