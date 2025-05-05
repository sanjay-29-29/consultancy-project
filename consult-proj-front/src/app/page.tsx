"use client";
import { useState, useEffect } from "react";
import Head from "next/head";
import Chatbot from './Chatbot';

const ShriRamTraders = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Check for dark mode preference
    if (typeof window !== "undefined") {
      const isDark = localStorage.getItem("darkMode") === "true";
      setDarkMode(isDark);

      // Watch for system preference changes
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = (e) => setDarkMode(e.matches);
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, []);

  useEffect(() => {
    // Apply dark mode class to body
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className='relative bg-gray-50 dark:bg-gray-900 transition-colors duration-300 min-h-screen'>
      <div className=''>
        <Chatbot/>
      </div>
      <Head>
        <title>Shri Ram Traders | Recycled Cotton Waste Exporters</title>
        <meta
          name="description" />
      </Head>

      {/* Navigation */}
      <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-xl font-bold text-green-600 dark:text-green-400">
                  Shri Ram Traders
                </span>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#home"
                className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 px-3 py-2 font-medium"
              >
                Home
              </a>
              <a
                href="#about"
                className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 px-3 py-2 font-medium"
              >
                About
              </a>
              <a
                href="#products"
                className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 px-3 py-2 font-medium"
              >
                Products
              </a>
              <a
                href="#process"
                className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 px-3 py-2 font-medium"
              >
                Process
              </a>
              <a
                href="#contact"
                className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 px-3 py-2 font-medium"
              >
                Contact
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {darkMode ? (
                  <i className="fas fa-sun text-yellow-400"></i>
                ) : (
                  <i className="fas fa-moon text-gray-700 dark:text-gray-300"></i>
                )}
              </button>
              <button
                onClick={toggleMobileMenu}
                className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <i className="fas fa-bars text-gray-700 dark:text-gray-300"></i>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-75"
            onClick={closeMobileMenu}
          ></div>
          <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-white dark:bg-gray-800 shadow-lg">
            <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200 dark:border-gray-700">
              <span className="text-xl font-bold text-green-600 dark:text-green-400">
                Shri Ram Traders
              </span>
              <button
                onClick={closeMobileMenu}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <i className="fas fa-times text-gray-700 dark:text-gray-300"></i>
              </button>
            </div>
            <div className="px-4 py-4 space-y-4">
              <a
                href="#home"
                onClick={closeMobileMenu}
                className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 font-medium"
              >
                Home
              </a>
              <a
                href="#about"
                onClick={closeMobileMenu}
                className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 font-medium"
              >
                About
              </a>
              <a
                href="#products"
                onClick={closeMobileMenu}
                className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 font-medium"
              >
                Products
              </a>
              <a
                href="#process"
                onClick={closeMobileMenu}
                className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 font-medium"
              >
                Process
              </a>
              <a
                href="#contact"
                onClick={closeMobileMenu}
                className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 font-medium"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section
        id="home"
        className={`hero-bg text-white py-20 md:py-32`}
        style={{
          background: `linear-gradient(rgba(0, 0, 0, ${darkMode ? 0.7 : 0.5}), rgba(0, 0, 0, ${darkMode ? 0.7 : 0.5})), url('https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Sustainable Cotton Waste Solutions
            </h1>
            <p className="text-xl mb-8">
              Exporting high-quality recycled cotton waste sourced from garment
              manufacturing processes worldwide
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300 text-center"
              >
                Get a Quote
              </a>
              <a
                href="#about"
                className="border border-white hover:bg-white hover:text-gray-900 font-medium py-3 px-6 rounded-lg transition duration-300 text-center"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              About Shri Ram Traders
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We specialize in exporting premium recycled cotton waste sourced
              from ethical garment manufacturing processes across India.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-sm">
              <div className="text-green-600 dark:text-green-400 text-4xl mb-4">
                <i className="fas fa-recycle"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Sustainable Sourcing
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                We collect cotton waste directly from ethical garment
                manufacturers producing t-shirts, pants, and other clothing
                items.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-sm">
              <div className="text-green-600 dark:text-green-400 text-4xl mb-4">
                <i className="fas fa-globe"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Global Export
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our recycled cotton waste is exported to clients worldwide who
                value sustainable textile materials.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-sm">
              <div className="text-green-600 dark:text-green-400 text-4xl mb-4">
                <i className="fas fa-certificate"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Quality Assurance
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Every batch undergoes strict quality checks to ensure consistent
                fiber content and purity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Products
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              High-quality recycled cotton waste from various garment
              manufacturing processes
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md">
              <img
                src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
                alt="T-shirt waste"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  T-Shirt Production Waste
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  High-quality cotton waste from t-shirt manufacturing processes
                  including cutting scraps and stitching waste.
                </p>
                <div className="flex items-center text-yellow-400">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star-half-alt"></i>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md">
              <img
                src="https://images.unsplash.com/photo-1604176354204-9268737828e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                alt="Pants waste"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Pants Manufacturing Waste
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Premium cotton waste from pants production including denim and
                  other fabric scraps.
                </p>
                <div className="flex items-center text-yellow-400">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md">
              <img
                src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                alt="Mixed cotton waste"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Mixed Cotton Waste
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Assorted cotton waste from various garment manufacturing
                  processes, carefully sorted and graded.
                </p>
                <div className="flex items-center text-yellow-400">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="far fa-star"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Process
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              From garment waste to recycled material - our efficient process
              ensures quality and sustainability
            </p>
          </div>
          <div className="relative">
            <div className="hidden md:block absolute left-1/2 top-0 h-full w-1 bg-gray-200 dark:bg-gray-600 transform -translate-x-1/2"></div>
            <div className="space-y-8">
              {/* Step 1 */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-green-600 text-white flex items-center justify-center text-xl font-bold mb-4 md:mb-0">
                  1
                </div>
                <div className="md:ml-8 flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Waste Collection
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    We collect cotton waste from garment manufacturers
                    specializing in t-shirts, pants, and other clothing items.
                    This includes cutting scraps, stitching waste, and other
                    byproducts.
                  </p>
                </div>
              </div>
              {/* Step 2 */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-green-600 text-white flex items-center justify-center text-xl font-bold mb-4 md:mb-0">
                  2
                </div>
                <div className="md:ml-8 flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Sorting & Grading
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Our team carefully sorts the collected waste by fabric type,
                    color, and quality to ensure we can provide precisely the
                    recycled cotton our clients need.
                  </p>
                </div>
              </div>
              {/* Step 3 */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-green-600 text-white flex items-center justify-center text-xl font-bold mb-4 md:mb-0">
                  3
                </div>
                <div className="md:ml-8 flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Cleaning & Processing
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    The sorted cotton waste undergoes thorough cleaning to
                    remove any impurities. We may further process the material
                    through shredding or other treatments as required.
                  </p>
                </div>
              </div>
              {/* Step 4 */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-green-600 text-white flex items-center justify-center text-xl font-bold mb-4 md:mb-0">
                  4
                </div>
                <div className="md:ml-8 flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Quality Control
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Each batch undergoes rigorous quality checks to ensure it
                    meets our standards and client specifications before
                    packaging.
                  </p>
                </div>
              </div>
              {/* Step 5 */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-green-600 text-white flex items-center justify-center text-xl font-bold mb-4 md:mb-0">
                  5
                </div>
                <div className="md:ml-8 flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Packaging & Export
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    The processed cotton waste is carefully packaged for export,
                    with all necessary documentation prepared to meet
                    international trade requirements.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Contact Us
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Get in touch with us to discuss your recycled cotton waste
              requirements
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 text-green-600 dark:text-green-400 text-xl">
                      <i className="fas fa-map-marker-alt"></i>
                    </div>
                    <div className="ml-4">
                      <p className="text-gray-600 dark:text-gray-300">
                        123 Industrial Area, Mumbai, Maharashtra, India
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 text-green-600 dark:text-green-400 text-xl">
                      <i className="fas fa-phone-alt"></i>
                    </div>
                    <div className="ml-4">
                      <p className="text-gray-600 dark:text-gray-300">
                        +91 98765 43210
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 text-green-600 dark:text-green-400 text-xl">
                      <i className="fas fa-envelope"></i>
                    </div>
                    <div className="ml-4">
                      <p className="text-gray-600 dark:text-gray-300">
                        info@shriramtraders.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Send Us a Message
                </h3>
                <form>
                  <div className="mb-4">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition duration-300"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold text-green-400 mb-4">
                Shri Ram Traders
              </h3>
              <p className="text-gray-300">
                Leading exporters of recycled cotton waste from garment
                manufacturing processes.
              </p>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="text-gray-300 hover:text-green-400">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="text-gray-300 hover:text-green-400">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-gray-300 hover:text-green-400">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="#" className="text-gray-300 hover:text-green-400">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-green-400 mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#home"
                    className="text-gray-300 hover:text-green-400"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="text-gray-300 hover:text-green-400"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#products"
                    className="text-gray-300 hover:text-green-400"
                  >
                    Products
                  </a>
                </li>
                <li>
                  <a
                    href="#process"
                    className="text-gray-300 hover:text-green-400"
                  >
                    Our Process
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="text-gray-300 hover:text-green-400"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-green-400 mb-4">
                Business Hours
              </h3>
              <ul className="text-gray-300 space-y-2">
                <li className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Saturday</span>
                  <span>10:00 AM - 4:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} Shri Ram Traders. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ShriRamTraders;
