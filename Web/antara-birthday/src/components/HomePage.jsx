import { motion } from 'framer-motion';
import { FaHeadphones } from 'react-icons/fa';

const HomePage = ({ onEnter }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 flex items-center justify-center px-4"
    >
      <div className="text-center max-w-3xl mx-auto">
        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-5xl md:text-7xl font-satisfy mb-6"
        >
          <span className="bg-gradient-to-r from-lavender-500 via-rose-500 to-gold-400 bg-clip-text text-transparent">
            Happy Birthday, Antara
          </span>{' '}
          <span className="inline-block">💖</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-xl md:text-2xl font-quicksand text-lavender-600 dark:text-lavender-300 mb-4 transition-colors duration-700"
        >
          The voice that colors my silence.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-base md:text-lg font-poppins text-gray-600 dark:text-gray-300 mb-12 italic transition-colors duration-700"
        >
          "Some voices don't just echo...they stay."
        </motion.p>

        {/* Glowing Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onEnter}
          className="group relative px-8 py-4 md:px-12 md:py-5 bg-gradient-to-r from-lavender-400 via-rose-400 to-gold-400 text-white font-quicksand font-semibold text-lg md:text-xl rounded-full shadow-2xl overflow-hidden transition-all duration-300"
          style={{
            boxShadow: '0 0 30px rgba(168, 85, 247, 0.5), 0 0 60px rgba(244, 63, 94, 0.3)',
          }}
        >
          <span className="relative z-10 flex items-center gap-3">
            <FaHeadphones className="text-2xl" />
            Her Melodies
          </span>
          
          {/* Animated glow effect */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 bg-gradient-to-r from-lavender-300 via-rose-300 to-gold-300 blur-xl"
          />
        </motion.button>

        {/* Decorative hearts */}
        <motion.div
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="mt-12 text-4xl"
        >
          💕✨💕
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HomePage;
