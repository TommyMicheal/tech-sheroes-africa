import React, { useState, useEffect } from 'react';
import { Search, Filter, X } from 'lucide-react';
import ProfileCard from '../components/ProfileCard';
import { api } from '../utils/api';

function ExplorePage() {
  const [sheroes, setSheroes] = useState([]);
  const [countries, setCountries] = useState([]);
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedField, setSelectedField] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sheroesList, countriesList, fieldsList] = await Promise.all([
          api.getSheroes(),
          api.getCountries(),
          api.getFields(),
        ]);
        setSheroes(sheroesList);
        setCountries(countriesList);
        setFields(fieldsList);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleFilter = async () => {
    setLoading(true);
    try {
      const params = {};
      if (selectedCountry !== 'all') params.country = selectedCountry;
      if (selectedField !== 'all') params.field = selectedField;
      if (searchTerm) params.search = searchTerm;

      const results = await api.getSheroes(params);
      setSheroes(results);
    } catch (error) {
      console.error('Error filtering:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      handleFilter();
    }, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchTerm, selectedCountry, selectedField]);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 pt-10 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Explore <span className="gradient-text">Sheroes</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Discover inspiring stories of African women in STEM
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name or field..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:border-purple-600 transition-colors"
              aria-label="Search sheroes"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors mb-4"
          >
            <Filter className="w-5 h-5" />
            <span>{showFilters ? 'Hide' : 'Show'} Filters</span>
          </button>

          <div
            className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${
              showFilters ? '' : 'hidden'
            } md:grid`}
          >
            {/* Country Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Country
              </label>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:border-purple-600 transition-colors"
                aria-label="Filter by country"
              >
                <option value="all">All Countries</option>
                {countries.map((c) => (
                  <option key={c.country} value={c.country}>
                    {c.country}
                  </option>
                ))}
              </select>
            </div>

            {/* Field Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Tech Field
              </label>
              <select
                value={selectedField}
                onChange={(e) => setSelectedField(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:border-purple-600 transition-colors"
                aria-label="Filter by field"
              >
                <option value="all">All Fields</option>
                {fields.map((f) => (
                  <option key={f.field} value={f.field}>
                    {f.field}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Filters */}
          {(selectedCountry !== 'all' || selectedField !== 'all') && (
            <div className="flex flex-wrap gap-2 mt-4">
              {selectedCountry !== 'all' && (
                <button
                  onClick={() => setSelectedCountry('all')}
                  className="flex items-center space-x-2 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full text-sm hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
                >
                  <span>{selectedCountry}</span>
                  <X className="w-4 h-4" />
                </button>
              )}
              {selectedField !== 'all' && (
                <button
                  onClick={() => setSelectedField('all')}
                  className="flex items-center space-x-2 bg-pink-100 dark:bg-pink-900 text-pink-700 dark:text-pink-300 px-3 py-1 rounded-full text-sm hover:bg-pink-200 dark:hover:bg-pink-800 transition-colors"
                >
                  <span>{selectedField}</span>
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Results */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="inline-block p-4 bg-purple-100 dark:bg-purple-900 rounded-full mb-4">
                <div className="w-8 h-8 border-4 border-purple-300 border-t-purple-600 rounded-full animate-spin"></div>
              </div>
              <p className="text-gray-600 dark:text-gray-400">Loading sheroes...</p>
            </div>
          </div>
        ) : sheroes.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-600 dark:text-gray-400 mb-4">
              No sheroes found matching your criteria.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCountry('all');
                setSelectedField('all');
              }}
              className="text-purple-600 dark:text-purple-400 hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sheroes.map((shero) => (
              <ProfileCard key={shero.id} shero={shero} />
            ))}
          </div>
        )}

        {/* Result count */}
        {!loading && sheroes.length > 0 && (
          <div className="text-center mt-8 text-gray-600 dark:text-gray-400">
            Showing {sheroes.length} shero{sheroes.length !== 1 ? 'es' : ''}
          </div>
        )}
      </div>
    </div>
  );
}

export default ExplorePage;