import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Users, Globe, Zap } from 'lucide-react';
import ProfileCard from '../components/ProfileCard';
import { api } from '../utils/api';

function HomePage() {
  const [featured, setFeatured] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [featuredData, statsData] = await Promise.all([
          api.getFeaturedShero(),
          api.getStats(),
        ]);
        setFeatured(featuredData);
        setStats(statsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-white dark:bg-slate-900 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-10">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 -z-10"></div>

        {/* Animated background elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-purple-200 dark:bg-purple-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-8 left-10 w-72 h-72 bg-pink-200 dark:bg-pink-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
              <span className="gradient-text">Celebrating African Women</span>
              <br />
              <span className="text-gray-900 dark:text-white">in Tech</span>
            </h1>

            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
              Inspiring the next generation of innovators. Explore stories of visionary women breaking barriers in STEM.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                to="/explore"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 group"
              >
                <span>Explore Sheroes</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/nominate"
                className="inline-flex items-center justify-center px-8 py-4 bg-white dark:bg-slate-800 text-purple-600 dark:text-purple-400 font-bold border-2 border-purple-600 dark:border-purple-400 rounded-lg hover:bg-purple-50 dark:hover:bg-slate-700 transition-all duration-300"
              >
                <span>Nominate a Shero</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Woman of the Week */}
      {featured && (
        <section className="py-20 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-slate-800 dark:to-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
              <Star className="w-8 h-8 inline-block text-yellow-500 mr-2" />
              Woman of the Week
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-12">
              Meet an inspiring shero making waves in her field
            </p>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={featured.image}
                  alt={featured.name}
                  className="w-full h-96 object-cover"
                />
              </div>
              <div>
                <div className="inline-block bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  {featured.field}
                </div>
                <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {featured.name}
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                  {featured.country}
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-lg mb-8 leading-relaxed">
                  {featured.fullBio}
                </p>
                <Link
                  to={`/shero/${featured.id}`}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-lg transition-all duration-300"
                >
                  Read Full Story
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Stats Section */}
      {stats && (
        <section className="py-20 bg-gray-900 dark:bg-slate-950 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-16">
              Our Impact by the Numbers
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  icon: Users,
                  label: 'Women Featured',
                  value: stats.totalSheroes,
                },
                {
                  icon: Globe,
                  label: 'Countries Represented',
                  value: stats.countriesRepresented,
                },
                {
                  icon: Zap,
                  label: 'Tech Fields',
                  value: stats.techFields,
                },
                {
                  icon: Star,
                  label: 'Nominations',
                  value: stats.nominations,
                },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-900 to-pink-900 hover:from-purple-800 hover:to-pink-800 transition-all duration-300"
                >
                  <stat.icon className="w-12 h-12 mx-auto mb-4 text-purple-300" />
                  <div className="text-4xl font-bold mb-2">{stat.value}+</div>
                  <div className="text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">
            Voices of Change
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: 'This platform gave me the confidence to pursue my dreams in tech.',
                author: 'Kemi, 16',
                role: 'Aspiring Software Engineer',
              },
              {
                quote: 'Seeing successful women in STEM from my continent changed everything.',
                author: 'Amina, 14',
                role: 'Student',
              },
              {
                quote: 'Tech Sheroes Africa is more than a website—it\'s a movement.',
                author: 'Zara, 19',
                role: 'Computer Science Student',
              },
            ].map((testimonial, idx) => (
              <div
                key={idx}
                className="card-hover bg-gradient-to-br from-purple-50 to-pink-50 dark:from-slate-800 dark:to-slate-700 p-8 rounded-2xl"
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                    />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-6 italic">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Be Inspired?</h2>
          <p className="text-xl mb-8">
            Discover incredible stories of women breaking barriers in STEM
          </p>
          <Link
            to="/explore"
            className="inline-flex items-center px-8 py-4 bg-white text-purple-600 font-bold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
          >
            <span>Start Exploring</span>
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default HomePage;