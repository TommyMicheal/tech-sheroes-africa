import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Share2,
  Linkedin,
  Twitter,
  Globe,
  MapPin,
  Zap,
  Award,
  BookOpen,
} from 'lucide-react';
import { api } from '../utils/api';

function ProfileDetailPage() {
  const { id } = useParams();
  const [shero, setShero] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareStatus, setShareStatus] = useState('');

  useEffect(() => {
    const fetchShero = async () => {
      try {
        const data = await api.getSheroById(id);
        setShero(data);
      } catch (error) {
        console.error('Error fetching shero:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchShero();
  }, [id]);

  const handleShare = () => {
    const url = window.location.href;
    const text = `Check out ${shero?.name} on Tech Sheroes Africa!`;

    if (navigator.share) {
      navigator.share({
        title: shero?.name,
        text,
        url,
      });
    } else {
      navigator.clipboard.writeText(url);
      setShareStatus('Copied to clipboard!');
      setTimeout(() => setShareStatus(''), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900">
        <div className="text-center">
          <div className="inline-block p-4 bg-purple-100 dark:bg-purple-900 rounded-full mb-4">
            <div className="w-8 h-8 border-4 border-purple-300 border-t-purple-600 rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-600 dark:text-gray-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!shero) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900">
        <div className="text-center">
          <p className="text-2xl text-gray-600 dark:text-gray-400 mb-4">
            Profile not found
          </p>
          <Link
            to="/explore"
            className="text-purple-600 dark:text-purple-400 hover:underline"
          >
            Back to Explore
          </Link>
        </div>
      </div>
    );
  }

  const socialLinks = shero.socialLinks ? JSON.parse(shero.socialLinks) : {};

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
      {/* Back button */}
      <div className="sticky top-20 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            to="/explore"
            className="inline-flex items-center space-x-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Explore</span>
          </Link>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative h-96 overflow-hidden bg-gradient-to-br from-purple-200 to-pink-200 dark:from-purple-900 dark:to-pink-900">
        <img
          src={shero.image}
          alt={shero.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
      </div>

      {/* Profile Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Profile Header */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start mb-6">
            <div>
              <div className="inline-block bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                {shero.field}
              </div>
              <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
                {shero.name}
              </h1>
              <div className="flex items-center text-lg text-gray-600 dark:text-gray-400">
                <MapPin className="w-5 h-5 mr-2 text-purple-600" />
                {shero.country}
              </div>
            </div>

            {/* Share Button */}
            <button
              onClick={handleShare}
              className="mt-4 md:mt-0 flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all duration-300"
              aria-label="Share profile"
            >
              <Share2 className="w-5 h-5" />
              <span>Share</span>
            </button>
          </div>

          {shareStatus && (
            <div className="text-sm text-green-600 dark:text-green-400">
              ✓ {shareStatus}
            </div>
          )}
        </div>

        {/* Biography Section */}
        {shero.fullBio && (
          <section className="mb-12 pb-12 border-b border-gray-200 dark:border-slate-700">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <BookOpen className="w-8 h-8 mr-3 text-purple-600" />
              Biography
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {shero.fullBio}
            </p>
          </section>
        )}

        {/* Career Journey */}
        {shero.journey && (
          <section className="mb-12 pb-12 border-b border-gray-200 dark:border-slate-700">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <Zap className="w-8 h-8 mr-3 text-purple-600" />
              Career Journey
            </h2>
            <div className="space-y-4">
              {shero.journey.split(',').map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start space-x-4 p-4 bg-purple-50 dark:bg-slate-800 rounded-lg"
                >
                  <div className="flex-shrink-0 w-2 h-2 mt-2 bg-purple-600 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300">
                    {item.trim()}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Achievements */}
        {shero.achievements && (
          <section className="mb-12 pb-12 border-b border-gray-200 dark:border-slate-700">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <Award className="w-8 h-8 mr-3 text-purple-600" />
              Key Achievements
            </h2>
            <ul className="space-y-3">
              {shero.achievements.split(',').map((achievement, idx) => (
                <li
                  key={idx}
                  className="flex items-start space-x-3 p-3 bg-pink-50 dark:bg-slate-800 rounded-lg"
                >
                  <span className="text-pink-600 dark:text-pink-400 font-bold text-lg">
                    ★
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">
                    {achievement.trim()}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Advice for Young Girls */}
        {shero.advice && (
          <section className="mb-12 pb-12 border-b border-gray-200 dark:border-slate-700">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              💡 Advice for Young Girls in STEM
            </h2>
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 p-8 rounded-2xl">
              <p className="text-lg text-gray-800 dark:text-gray-200 italic">
                "{shero.advice}"
              </p>
            </div>
          </section>
        )}

        {/* Social Links */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <Globe className="w-8 h-8 mr-3 text-purple-600" />
            Connect
          </h2>
          <div className="flex flex-wrap gap-4">
            {socialLinks.linkedin && socialLinks.linkedin !== '#' && (
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
                <span>LinkedIn</span>
              </a>
            )}
            {socialLinks.twitter && socialLinks.twitter !== '#' && (
              <a
                href={socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-6 py-3 bg-blue-400 hover:bg-blue-500 text-white rounded-lg transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
                <span>Twitter</span>
              </a>
            )}
            {socialLinks.website && socialLinks.website !== '#' && (
              <a
                href={socialLinks.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                aria-label="Website"
              >
                <Globe className="w-5 h-5" />
                <span>Website</span>
              </a>
            )}
          </div>
        </section>

        {/* CTA */}
        <div className="mt-16 p-8 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-2xl text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Know another inspiring shero?
          </h3>
          <Link
            to="/nominate"
            className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-lg transition-all duration-300"
          >
            Nominate Someone
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProfileDetailPage;