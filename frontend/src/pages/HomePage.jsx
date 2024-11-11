// Homepage.jsx
import { useState, useEffect } from 'react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import image from '../assets/watch2.png';

const Homepage = () => {
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
        <section className="container mx-auto px-4 py-20 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <img
              src={image}
              alt="Elegant Luxury Watch"
              width={600}
              height={600}
              className="rounded-lg shadow-2xl"
            />
          </div>
          <div className="md:w-1/2 md:pl-12 space-y-6">
            <h1 className="text-5xl font-bold text-black">Timeless Elegance</h1>
            <p className="text-xl text-gray-600">
              Discover our exquisite collection of luxury timepieces, where precision meets artistry.
            </p>
           
          </div>
        </section>
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 text-gold">Our Craftsmanship</h2>
            <p className="text-center text-gray-600 max-w-2xl mx-auto">
              Each CHRONO timepiece is a masterpiece of precision engineering and artisanal skill.
              Our master watchmakers combine centuries-old techniques with cutting-edge technology
              to create watches of unparalleled beauty and accuracy.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Homepage;
