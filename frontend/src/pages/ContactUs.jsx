import { useState, useEffect } from 'react';
import Header from '../components/Header.jsx';

const ContactUs = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollPosition(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <Header />
      <main className="flex-grow pt-20">
        <section className="container mx-auto px-4 py-20 flex flex-col items-center md:items-start">
          <div className="md:w-2/3 space-y-6">
            <h1 className="text-5xl font-bold text-black text-center md:text-left">Contact Us</h1>
            <p className="text-xl text-gray-600 text-center md:text-left">
              Reach out to us for any inquiries, watch services, or support. We are here to assist you with your luxury
              timepiece needs.
            </p>
            <div className="text-lg text-gray-600 space-y-4 mt-8">
              <p><strong>Address:</strong> Vadodara Complex, Near Head Post Office</p>
              <p><strong>Email:</strong> <a href="mailto:contact@londontimes.com" className="text-blue-500">mayurgreatbrands@gmail.com</a></p>
              <p><strong>Phone:</strong> <a href="tel:+9108202531170" className="text-blue-500">+91 08202531170</a></p>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} LondonTimes. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default ContactUs;
