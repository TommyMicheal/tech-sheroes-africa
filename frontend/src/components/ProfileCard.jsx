import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Sparkles } from 'lucide-react';

function ProfileCard({ shero }) {
  return (
    <Link to={`/shero/${shero.id}`}>
      <div className="card-hover rounded-2xl overflow-hidden bg-white dark:bg-slate-800 shadow-lg h-full flex flex-col">
        {/* Image */}
        <div className="relative h-64 overflow-hidden bg-gradient-to-br from-purple-200 to-pink-200 dark:from-purple-900 dark:to-pink-900">
          <img
            src={shero.image}
            alt={shero.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          />
          <div className="absolute top-3 right-3 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
            {shero.field}
          </div>
        </div>

        {/* Content */}
        <div className="flex-grow p-6 flex flex-col">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {shero.name}
          </h3>

          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-4">
            <MapPin className="w-4 h-4 mr-1 text-purple-600" />
            {shero.country}
          </div>

          <p className="text-gray-700 dark:text-gray-300 text-sm mb-6 flex-grow">
            {shero.shortBio}
          </p>

          <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 group">
            <span>View Profile</span>
            <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
          </button>
        </div>
      </div>
    </Link>
  );
}

export default ProfileCard;