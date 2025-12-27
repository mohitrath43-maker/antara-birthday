import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.15, rotate: 10 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className="fixed top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 p-2 sm:p-3 md:p-4 bg-white/30 dark:bg-gray-800/30 backdrop-blur-xl rounded-full shadow-lg z-[60] border border-white/50 dark:border-gray-700/50 transition-all duration-500"
      style={{
        boxShadow: isDark 
          ? '0 8px 30px rgba(59, 130, 246, 0.3), 0 0 60px rgba(147, 51, 234, 0.2)'
          : '0 8px 30px rgba(251, 191, 36, 0.3), 0 0 60px rgba(251, 113, 133, 0.2)',
      }}
    >
      <motion.div
        key={isDark ? 'moon' : 'sun'}
        initial={{ rotate: -180, opacity: 0, scale: 0 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        exit={{ rotate: 180, opacity: 0, scale: 0 }}
        transition={{ 
          duration: 0.5,
          type: 'spring',
          stiffness: 200,
        }}
        className="relative"
      >
        {isDark ? (
          <span className="text-2xl sm:text-3xl md:text-4xl block">🌙</span>
        ) : (
          <span className="text-2xl sm:text-3xl md:text-4xl block">🌞</span>
        )}
      </motion.div>
      
      {/* Subtle glow pulse effect */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={`absolute inset-0 rounded-full blur-xl ${
          isDark 
            ? 'bg-blue-400' 
            : 'bg-yellow-300'
        }`}
        style={{ zIndex: -1 }}
      />
    </motion.button>
  );
};

export default ThemeToggle;
