
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ThemeToggle from '../components/ThemeToggle';
import UrlShortener from '../components/UrlShortener';
import AnalyticsChart from '../components/AnalyticsChart';

const Index = () => {
  const [hasShortened, setHasShortened] = useState(false);

  const handleUrlShortened = (shortUrl: string) => {
    // console.log('URL shortened:', shortUrl);
    setHasShortened(true);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-gradient-to-tr from-purple-400/10 to-blue-600/10 rounded-full blur-3xl"
        />
      </div>

      <ThemeToggle />

      <div className="relative z-10 container mx-auto px-3 sm:px-4 py-6 sm:py-8 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-4 sm:mb-6"
          >
            <span className="inline-block p-2 sm:p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl sm:rounded-2xl text-white text-2xl sm:text-3xl mb-3 sm:mb-4">
              🔗
            </span>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 items-start max-w-4xl mx-auto">
          {/* URL Shortener Section */}
          <div className="space-y-4 sm:space-y-6 order-1">
            <UrlShortener onUrlShortened={handleUrlShortened} />
          </div>

          {/* Analytics Section */}
          <div className="space-y-4 sm:space-y-6 order-2">
            <AnalyticsChart />
          </div>
        </div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 sm:mt-16 lg:mt-20 grid md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto"
        >
          {[
            {
              icon: '⚡',
              title: 'Lightning Fast',
              description: 'Generate short URLs in seconds with our optimized infrastructure'
            },
            {
              icon: '📊',
              title: 'Detailed Analytics',
              description: 'Track clicks, platforms, and user engagement with beautiful charts'
            },
            {
              icon: '🛡️',
              title: 'Secure & Reliable',
              description: 'Your URLs are protected with enterprise-grade security'
            }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="text-center p-4 sm:p-6 glass-card rounded-xl group cursor-pointer"
            >
              <div className="text-2xl sm:text-4xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 sm:mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-12 sm:mt-16 lg:mt-20 text-center text-gray-500 dark:text-gray-400"
        >
        </motion.footer>
      </div>
    </div>
  );
};

export default Index;
