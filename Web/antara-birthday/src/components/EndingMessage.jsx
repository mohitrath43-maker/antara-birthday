import { motion } from 'framer-motion';

const EndingMessage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 flex items-center justify-center px-4 bg-gradient-to-br from-lavender-50 via-rose-50 to-gold-50 dark:from-indigo-950 dark:via-purple-950 dark:to-violet-950 transition-colors duration-700"
    >
      <div className="text-center max-w-2xl mx-auto">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
          className="text-8xl mb-8"
        >
          💝
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-4xl md:text-5xl font-satisfy mb-6 bg-gradient-to-r from-lavender-500 via-rose-500 to-gold-400 bg-clip-text text-transparent"
        >
          You're not just a song...
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="text-2xl md:text-3xl font-quicksand text-lavender-600 dark:text-lavender-300 mb-8 transition-colors duration-700"
        >
          You're the whole playlist. 🎵
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-lg md:text-xl font-poppins text-gray-600 dark:text-gray-300 italic space-y-4 transition-colors duration-700"
        >
          <p>"Happy Birthday Antara..."</p>
          <p className="text-rose-500 dark:text-rose-400 transition-colors duration-700">
            from the boy who found peace in your voice.
          </p>
        </motion.div>

        <motion.div
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="mt-12 text-5xl"
        >
          💕✨💖✨💕
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="mt-8 text-sm font-poppins text-lavender-400 dark:text-lavender-300 transition-colors duration-700"
        >
          Made with love, just for you 💝
        </motion.p>
      </div>
    </motion.div>
  );
};

export default EndingMessage;
