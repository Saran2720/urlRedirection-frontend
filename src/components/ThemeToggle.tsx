
import React from 'react';
import { motion } from 'framer-motion';
import { BsSun, BsMoon } from 'react-icons/bs';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="fixed top-6 right-6 z-50 p-3 glass-card rounded-full hover:scale-105 transition-all duration-300 group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 180 : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="relative w-6 h-6"
      >
        {theme === 'light' ? (
          <BsSun className="w-6 h-6 text-yellow-500 group-hover:text-yellow-400 transition-colors" />
        ) : (
          <BsMoon className="w-6 h-6 text-blue-400 group-hover:text-blue-300 transition-colors" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
