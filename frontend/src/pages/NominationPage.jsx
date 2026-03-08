import React, { useState, useEffect } from 'react';
import { Heart, CheckCircle, AlertCircle } from 'lucide-react';
import { api } from '../utils/api';

function NominationPage() {
  const [countries, setCountries] = useState([]);
  const [fields, setFields] = useState([]);
  const [formData, setFormData] = useState({
    nomineeName: '',
    country: '',
    field: '',
    email: '',
    bio: '',
    why: '',
    photo: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [countriesList, fieldsList] = await Promise.all([
          api.getCountries(),
          api.getFields(),
        ]);
        setCountries(countriesList);
        setFields(fieldsList);
      } catch (err) {
        console.error('Error fetching options:', err);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          photo: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.nomineeName ||
      !formData.country ||
      !formData.field ||
      !formData.bio
    ) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      await api.submitNomination(formData);
      setSubmitted(true);
      setFormData({
        nomineeName: '',
        country: '',
        field: '',
        email: '',
        bio: '',
        why: '',
        photo: '',
      });

      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (err) {
      setError(err.message || 'Failed to submit nomination');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-slate-900 dark:to-slate-800 pt-10 pb-20 transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <Heart className="w-16 h-16 text-purple-600 mx-auto mb-4" fill="currentColor" />
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Nominate a <span className="gradient-text">Shero</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Know an incredible woman in STEM? Share her story with us. She could be
            our next featured shero!
          </p>
        </div>

        {/* Success Message */}
        {submitted && (
          <div className="mb-8 p-6 bg-green-100 dark:bg-green-900 border-2 border-green-500 rounded-2xl flex items-start space-x-4">
            <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-green-800 dark:text-green-300 text-lg">
                Nomination Submitted!
              </h3>
              <p className="text-green-700 dark:text-green-300">
                Thank you for nominating an amazing shero. We'll review her profile
                and add her to our platform soon!
              </p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-8 p-6 bg-red-100 dark:bg-red-900 border-2 border-red-500 rounded-2xl flex items-start space-x-4">
            <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-red-800 dark:text-red-300 text-lg">
                Oops! Something went wrong
              </h3>
              <p className="text-red-700 dark:text-red-300">{error}</p>
            </div>
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 space-y-6"
        >
          {/* Nominee Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Nominee's Full Name *
            </label>
            <input
              type="text"
              name="nomineeName"
              value={formData.nomineeName}
              onChange={handleChange}
              placeholder="e.g., Ada Lovelace"
              required
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:border-purple-600 transition-colors"
              aria-label="Nominee name"
            />
          </div>

          {/* Country */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Country *
            </label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:outline-none focus:border-purple-600 transition-colors"
              aria-label="Country"
            >
              <option value="">Select a country</option>
              {countries.map((c) => (
                <option key={c.country} value={c.country}>
                  {c.country}
                </option>
              ))}
            </select>
          </div>

          {/* Tech Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Tech Field *
            </label>
            <select
              name="field"
              value={formData.field}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:outline-none focus:border-purple-600 transition-colors"
              aria-label="Tech field"
            >
              <option value="">Select a field</option>
              {fields.map((f) => (
                <option key={f.field} value={f.field}>
                  {f.field}
                </option>
              ))}
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Your Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:border-purple-600 transition-colors"
              aria-label="Email"
            />
          </div>

          {/* Short Biography */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Short Biography *
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us about her background, achievements, and impact..."
              required
              rows="4"
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:border-purple-600 transition-colors resize-none"
              aria-label="Biography"
            />
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {formData.bio.length}/500 characters
            </p>
          </div>

          {/* Why She Inspires You */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Why She Inspires You
            </label>
            <textarea
              name="why"
              value={formData.why}
              onChange={handleChange}
              placeholder="Share what makes her special and inspiring..."
              rows="3"
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:border-purple-600 transition-colors resize-none"
              aria-label="Why she inspires you"
            />
          </div>

          {/* Photo Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Profile Photo
            </label>
            <div className="border-2 border-dashed border-purple-300 dark:border-purple-700 rounded-lg p-6 text-center hover:border-purple-600 dark:hover:border-purple-400 transition-colors cursor-pointer"
              onClick={() => document.getElementById('photoInput').click()}
            >
              {formData.photo ? (
                <div>
                  <img
                    src={formData.photo}
                    alt="Preview"
                    className="w-20 h-20 rounded-full mx-auto mb-2 object-cover"
                  />
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Photo selected. Click to change.
                  </p>
                </div>
              ) : (
                <div>
                  <Heart className="w-12 h-12 text-purple-300 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    Click to upload a photo
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    JPG, PNG or GIF (max. 5MB)
                  </p>
                </div>
              )}
              <input
                id="photoInput"
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
                aria-label="Upload photo"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100"
          >
            {loading ? 'Submitting...' : 'Submit Nomination'}
          </button>

          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            * Required fields
          </p>
        </form>

        {/* Info Box */}
        <div className="mt-12 p-6 bg-purple-100 dark:bg-purple-900 rounded-2xl">
          <h3 className="font-bold text-purple-900 dark:text-purple-100 mb-3">
            💝 Tips for a Great Nomination
          </h3>
          <ul className="space-y-2 text-purple-800 dark:text-purple-200 text-sm">
            <li>• Be specific about her achievements and impact</li>
            <li>• Share what makes her unique in her field</li>
            <li>• Include any awards, publications, or projects</li>
            <li>• Tell us how she inspires you or others</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default NominationPage;