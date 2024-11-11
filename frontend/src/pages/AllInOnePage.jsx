import { useState, useEffect } from 'react';
import Header from '../components/Header.jsx';


const AllInOnePage = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [activeFAQ, setActiveFAQ] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrollPosition(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <Header />
      <main className="flex-grow pt-20">
        <section className="container mx-auto px-4 py-20">
          <h1 className="text-5xl font-bold text-black text-center">Terms, Privacy & FAQ</h1>

          {/* Terms and Conditions Section */}
          <section className="mt-12">
            <h2 className="text-4xl font-bold text-black mb-4">Terms and Conditions</h2>
            <p className="text-gray-600">
              Welcome to LondonTimes. By accessing or using our services, you agree to comply with our terms and conditions. 
              We provide premium watch sales and services, and any transactions or interactions are governed by the terms outlined here.
              Please read carefully to ensure a smooth experience with our brand.
            </p>
          </section>

          {/* Privacy Policy Section */}
          <section className="mt-12">
            <h2 className="text-4xl font-bold text-black mb-4">Privacy Policy</h2>
            <p className="text-gray-600">
              LondonTimes respects your privacy and is committed to protecting your personal information. 
              We collect and use your data solely to improve your experience and provide our services.
              Any information you provide is stored securely and will not be shared with third parties without your consent.
            </p>
          </section>

          {/* FAQ Section */}
          <section className="mt-12">
            <h2 className="text-4xl font-bold text-black mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {/* FAQ 1 */}
              <div className="border-b border-gray-300 py-4">
                <button
                  onClick={() => toggleFAQ(1)}
                  className="text-left w-full text-xl font-semibold text-gray-700 focus:outline-none"
                >
                  What services does LondonTimes offer?
                </button>
                {activeFAQ === 1 && (
                  <p className="text-gray-600 mt-2">
                    LondonTimes specializes in luxury watch sales and offers a variety of services including repairs, 
                    maintenance, and customizations to ensure your timepiece stays in top condition.
                  </p>
                )}
              </div>

              {/* FAQ 2 */}
              <div className="border-b border-gray-300 py-4">
                <button
                  onClick={() => toggleFAQ(2)}
                  className="text-left w-full text-xl font-semibold text-gray-700 focus:outline-none"
                >
                  How does LondonTimes protect my personal information?
                </button>
                {activeFAQ === 2 && (
                  <p className="text-gray-600 mt-2">
                    We take your privacy seriously and implement advanced security measures to safeguard your data.
                    Your information is used only for enhancing your experience and fulfilling your requests.
                  </p>
                )}
              </div>

            

              {/* FAQ 3 */}
              <div className="border-b border-gray-300 py-4">
                <button
                  onClick={() => toggleFAQ(4)}
                  className="text-left w-full text-xl font-semibold text-gray-700 focus:outline-none"
                >
                  How can I contact customer support?
                </button>
                {activeFAQ === 4 && (
                  <p className="text-gray-600 mt-2">
                    You can reach us via email at mayurgreatbrands@gmail.com or by phone at +91 08202531170.
                    Our support team is here to assist you with any inquiries or issues.
                  </p>
                )}
              </div>
            </div>
          </section>
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

export default AllInOnePage;
