import { useState, useEffect } from 'react';
import Header from '../components/Header.jsx';

const AboutUs = () => {
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
            <h1 className="text-5xl font-bold text-black text-center md:text-left">About Us</h1>
            <p className="text-xl text-gray-600 text-center md:text-left">
              At LondonTimes, we specialize in providing premium luxury timepieces and exceptional watch services. Our
              passion for craftsmanship is reflected in every watch we offer, and we are committed to delivering both
              exquisite products and outstanding service to our valued customers.
            </p>
            <p className="text-xl text-gray-600 text-center md:text-left">
              Whether you’re purchasing your first luxury watch or seeking expert repairs and services for your existing
              collection, LondonTimes is here to fulfill your needs with precision and care.
            </p>
          </div>
        </section>
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 text-gold">Our Expertise</h2>
            <p className="text-center text-gray-600 max-w-2xl mx-auto">
              LondonTimes is not just about selling luxury watches; we are a trusted provider of watch services including
              repairs, maintenance, and customizations. Our team of master watchmakers uses the finest tools and techniques
              to keep your timepiece in perfect working condition.
            </p>
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

export default AboutUs;
