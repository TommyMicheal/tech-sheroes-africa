import React, { useState } from 'react';
import { BookOpen, Code, Lightbulb, Zap, ExternalLink } from 'lucide-react';

function CareerGuidePage() {
  const [selectedCareer, setSelectedCareer] = useState('AI');

  const careers = {
    'Artificial Intelligence': {
      description:
        'AI engineers develop machine learning models and AI systems that solve complex problems. They work on applications ranging from healthcare diagnostics to autonomous vehicles.',
      skills: [
        'Python, R, TensorFlow',
        'Machine Learning & Deep Learning',
        'Data Analysis & Statistics',
        'Mathematics & Linear Algebra',
        'Problem Solving',
      ],
      resources: [
        {
          name: 'Fast.ai',
          url: 'https://fast.ai',
          type: 'Course',
        },
        {
          name: 'Google AI Essentials',
          url: 'https://www.coursera.org/learn/google-ai-essentials',
          type: 'Course',
        },
        {
          name: 'Kaggle Learn',
          url: 'https://kaggle.com/learn',
          type: 'Interactive Learning',
        },
        {
          name: 'Stanford CS221',
          url: 'https://stanford.edu',
          type: 'University Course',
        },
      ],
      roadmap: [
        'Learn Python programming basics',
        'Master mathematics: calculus, linear algebra, statistics',
        'Study machine learning fundamentals',
        'Work on real datasets (Kaggle competitions)',
        'Build your own ML projects',
        'Contribute to open-source ML projects',
      ],
    },
    'Cybersecurity': {
      description:
        'Cybersecurity professionals protect organizations from digital attacks. They identify vulnerabilities, implement security measures, and respond to incidents.',
      skills: [
        'Networking & Systems Administration',
        'Programming (C, Python, Java)',
        'Ethical Hacking',
        'Risk Management',
        'Security Protocols',
      ],
      resources: [
        {
          name: 'CompTIA Security+',
          url: 'https://comptia.org',
          type: 'Certification',
        },
        {
          name: 'HackerRank Cybersecurity',
          url: 'https://hackerrank.com',
          type: 'Practice Platform',
        },
        {
          name: 'Cybrary',
          url: 'https://cybrary.it',
          type: 'Learning Platform',
        },
        {
          name: 'TryHackMe',
          url: 'https://tryhackme.com',
          type: 'Interactive Labs',
        },
      ],
      roadmap: [
        'Learn computer networking fundamentals',
        'Study operating systems (Windows, Linux)',
        'Learn programming languages',
        'Understand cybersecurity concepts',
        'Get certified (Security+, CEH)',
        'Practice in labs and capture-the-flag competitions',
      ],
    },
    'Web Development': {
      description:
        'Web developers build and maintain websites and web applications. They work with frontend, backend, or both (full-stack) technologies.',
      skills: [
        'HTML, CSS, JavaScript',
        'React, Vue, or Angular',
        'Node.js or Python (Backend)',
        'Databases & APIs',
        'Version Control (Git)',
      ],
      resources: [
        {
          name: 'freeCodeCamp',
          url: 'https://freecodecamp.org',
          type: 'Comprehensive Course',
        },
        {
          name: 'The Odin Project',
          url: 'https://theodinproject.com',
          type: 'Full-Stack Curriculum',
        },
        {
          name: 'MDN Web Docs',
          url: 'https://developer.mozilla.org',
          type: 'Documentation',
        },
        {
          name: 'Codecademy',
          url: 'https://codecademy.com',
          type: 'Interactive Lessons',
        },
      ],
      roadmap: [
        'Master HTML & CSS fundamentals',
        'Learn JavaScript in depth',
        'Build projects with HTML, CSS, JS',
        'Learn a frontend framework (React recommended)',
        'Learn backend development',
        'Build full-stack projects',
      ],
    },
    'Data Science': {
      description:
        'Data scientists analyze complex datasets to help organizations make informed decisions. They combine statistics, programming, and domain expertise.',
      skills: [
        'Python & R',
        'Statistics & Probability',
        'Data Visualization',
        'SQL & Databases',
        'Business Acumen',
      ],
      resources: [
        {
          name: 'Google Data Analytics',
          url: 'https://www.coursera.org/professional-certificates/google-data-analytics',
          type: 'Certification',
        },
        {
          name: 'DataCamp',
          url: 'https://datacamp.com',
          type: 'Learning Platform',
        },
        {
          name: 'Kaggle Datasets',
          url: 'https://kaggle.com/datasets',
          type: 'Practice Datasets',
        },
        {
          name: '365 Data Science',
          url: 'https://365datascience.com',
          type: 'Comprehensive Course',
        },
      ],
      roadmap: [
        'Learn Python for data science',
        'Master statistics and probability',
        'Learn data visualization tools (Matplotlib, Seaborn)',
        'Study SQL and databases',
        'Work with real datasets on Kaggle',
        'Build portfolio projects',
      ],
    },
    'Cloud Engineering': {
      description:
        'Cloud engineers design, build, and manage cloud infrastructure. They ensure scalability, security, and reliability of cloud-based systems.',
      skills: [
        'AWS, Azure, or Google Cloud',
        'Linux/Windows Administration',
        'Networking & Security',
        'Container Technologies (Docker, Kubernetes)',
        'Infrastructure as Code',
      ],
      resources: [
        {
          name: 'AWS Free Tier',
          url: 'https://aws.amazon.com/free',
          type: 'Practice Environment',
        },
        {
          name: 'Linux Academy',
          url: 'https://linuxacademy.com',
          type: 'Cloud & Linux Courses',
        },
        {
          name: 'Pluralsight Cloud Path',
          url: 'https://pluralsight.com',
          type: 'Structured Learning',
        },
        {
          name: 'A Cloud Guru',
          url: 'https://acloudguru.com',
          type: 'Hands-On Labs',
        },
      ],
      roadmap: [
        'Learn Linux fundamentals',
        'Understand cloud computing concepts',
        'Get familiar with one cloud provider (AWS recommended)',
        'Learn containerization (Docker)',
        'Study infrastructure automation',
        'Get cloud certifications',
      ],
    },
    'Mobile App Development': {
      description:
        'Mobile developers create applications for smartphones and tablets. They work with iOS, Android, or cross-platform technologies.',
      skills: [
        'Swift or Kotlin',
        'React Native or Flutter',
        'APIs & Web Services',
        'Mobile UX/UI Principles',
        'Git & Version Control',
      ],
      resources: [
        {
          name: 'Google Android Course',
          url: 'https://developer.android.com/courses',
          type: 'Official Course',
        },
        {
          name: 'App Institute',
          url: 'https://appinstitute.com',
          type: 'App Development Course',
        },
        {
          name: 'Flutter Official Guide',
          url: 'https://flutter.dev',
          type: 'Documentation & Guide',
        },
        {
          name: 'Swift Playgrounds',
          url: 'https://developer.apple.com/swift-playgrounds',
          type: 'Interactive Learning',
        },
      ],
      roadmap: [
        'Learn programming fundamentals',
        'Choose platform: iOS, Android, or Cross-platform',
        'Learn platform-specific language',
        'Understand mobile design principles',
        'Build simple apps',
        'Publish to App Store/Play Store',
      ],
    },
  };

  const currentCareer = careers[selectedCareer];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300 pt-10 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Tech Career <span className="gradient-text">Guide</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Explore different tech careers, required skills, and free learning resources to start your journey
          </p>
        </div>

        {/* Career Selection */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Choose a Career Path
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.keys(careers).map((career) => (
              <button
                key={career}
                onClick={() => setSelectedCareer(career)}
                className={`p-4 rounded-xl font-semibold transition-all duration-300 text-left ${
                  selectedCareer === career
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105'
                    : 'bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-slate-700'
                }`}
                aria-pressed={selectedCareer === career}
              >
                {career}
              </button>
            ))}
          </div>
        </div>

        {/* Career Details */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <section className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-slate-800 dark:to-slate-800 p-8 rounded-2xl">
              <div className="flex items-center mb-4">
                <Lightbulb className="w-8 h-8 text-purple-600 mr-3" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  About {selectedCareer}
                </h3>
              </div>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {currentCareer.description}
              </p>
            </section>

            {/* Skills Section */}
            <section>
              <div className="flex items-center mb-4">
                <Zap className="w-8 h-8 text-purple-600 mr-3" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Essential Skills
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentCareer.skills.map((skill, idx) => (
                  <div
                    key={idx}
                    className="flex items-start space-x-3 p-4 bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-slate-700 rounded-lg hover:border-purple-300 dark:hover:border-purple-600 transition-colors"
                  >
                    <span className="text-purple-600 font-bold text-lg mt-1">
                      ✓
                    </span>
                    <span className="text-gray-700 dark:text-gray-300">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Roadmap Section */}
            <section>
              <div className="flex items-center mb-4">
                <BookOpen className="w-8 h-8 text-purple-600 mr-3" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Learning Roadmap
                </h3>
              </div>
              <div className="space-y-3">
                {currentCareer.roadmap.map((step, idx) => (
                  <div
                    key={idx}
                    className="flex items-start space-x-4 p-4 bg-white dark:bg-slate-800 rounded-lg border-l-4 border-purple-600"
                  >
                    <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 bg-purple-600 text-white rounded-full font-bold">
                      {idx + 1}
                    </div>
                    <div className="flex-grow pt-1">
                      <p className="text-gray-700 dark:text-gray-300 font-medium">
                        {step}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar - Resources */}
          <div className="lg:col-span-1">
            <section className="sticky top-24 bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6">
              <div className="flex items-center mb-6">
                <Code className="w-8 h-8 text-purple-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Free Resources
                </h3>
              </div>
              <div className="space-y-3">
                {currentCareer.resources.map((resource, idx) => (
                  <a
                    key={idx}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block p-4 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {resource.name}
                      </h4>
                      <ExternalLink className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors flex-shrink-0" />
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {resource.type}
                    </p>
                  </a>
                ))}
              </div>

              {/* Stats */}
              <div className="mt-8 p-4 bg-purple-50 dark:bg-slate-700 rounded-lg border-l-4 border-purple-600">
                <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  💡 Pro Tip
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Start with one language and build projects. The best way to learn is by doing!
                </p>
              </div>
            </section>
          </div>
        </div>

        {/* Action Section */}
        <section className="mt-20 p-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Begin with the free resources above, build projects, and connect with our sheroes for mentorship!
          </p>
          <a
            href="/explore"
            className="inline-block px-8 py-3 bg-white text-purple-600 font-bold rounded-lg hover:bg-gray-100 transition-all duration-300"
          >
            Connect with Sheroes
          </a>
        </section>

        {/* Additional Info */}
        <section className="mt-12 grid md:grid-cols-3 gap-6">
          {[
            {
              title: 'Start With Basics',
              description:
                'You don\'t need prior experience. Most resources assume zero knowledge and build from there.',
            },
            {
              title: 'Learn by Doing',
              description:
                'Build projects, solve challenges, and contribute to open source. Theory + practice = mastery.',
            },
            {
              title: 'Find Mentors',
              description:
                'Connect with women in tech from our platform. Mentorship accelerates your learning journey.',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-md text-center"
            >
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                {item.title}
              </h4>
              <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

export default CareerGuidePage;