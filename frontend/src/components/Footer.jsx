import React, { useState } from 'react';
import { Heart, Mail, Linkedin, Twitter, Instagram } from 'lucide-react';
import { api } from '../utils/api';

function Footer() {
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      await api.subscribe(email);
      setSubscribeStatus('success');
      setEmail('');
      setTimeout(() => setSubscribeStatus(''), 3000);
    } catch (error) {
      setSubscribeStatus('error');
      setTimeout(() => setSubscribeStatus(''), 3000);
    }
  };

  return (
    <footer className="bg-gray-900 dark:bg-slate-950 text-white py-16 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Heart className="w-8 h-8 text-purple-400" fill="currentColor" />
              <span className="text-2xl font-bold">
                Tech Sheroes <span className="text-purple-400">Africa</span>
              </span>
            </div>
            <p className="text-gray-400">
              Celebrating and empowering African women in STEM, inspiring the next generation of innovators.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/" className="hover:text-purple-400 transition">
                  Home
                </a>
              </li>
              <li>
                <a href="/explore" className="hover:text-purple-400 transition">
                  Explore Sheroes
                </a>
              </li>
              <li>
                <a href="/nominate" className="hover:text-purple-400 transition">
                  Nominate
                </a>
              </li>
              <li>
                <a href="/career-guide" className="hover:text-purple-400 transition">
                  Career Guide
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-lg mb-4">Stay Updated</h4>
            <p className="text-gray-400 mb-4">
              Get inspired by stories of African women in tech.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                aria-label="Email for newsletter"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2"
              >
                <Mail className="w-4 h-4" />
                <span>Subscribe</span>
              </button>
              {subscribeStatus === 'success' && (
                <p className="text-green-400 text-sm">
                  ✓ Subscribed successfully!
                </p>
              )}
              {subscribeStatus === 'error' && (
                <p className="text-red-400 text-sm">
                  Failed to subscribe. Try again.
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2024 Tech Sheroes Africa. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a
              href="#"
              aria-label="LinkedIn"
              className="text-gray-400 hover:text-purple-400 transition"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="text-gray-400 hover:text-purple-400 transition"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="text-gray-400 hover:text-purple-400 transition"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;