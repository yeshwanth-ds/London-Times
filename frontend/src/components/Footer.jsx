// Footer.jsx
import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa'; // Updated imports
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white text-black py-12 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gold">About LondonTimes</h3>
            <p className="text-sm text-gray-600">
  At London Times, we blend tradition and innovation to offer you watches that embody sophistication, craftsmanship, and timeless style.
</p>

          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gold">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/termsPrivacyFAQ" className="text-sm text-gray-600 hover:text-gold transition-colors">Terms of Service</Link></li>
              <li><Link to="/termsPrivacyFAQ" className="text-sm text-gray-600 hover:text-gold transition-colors">Privacy Policy</Link></li>
              <li><Link to="/termsPrivacyFAQ" className="text-sm text-gray-600 hover:text-gold transition-colors">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gold">Contact Us</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Vadodara Complex, Near Head Post Office</li>
              <li>contact@londontimes.com</li>
              <li>+91 08202531170</li>
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
          © {new Date().getFullYear()} LondonTimes. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
