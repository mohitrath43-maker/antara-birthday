import { motion } from 'framer-motion';

const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-lavender-100 via-rose-100 to-gold-100 dark:from-indigo-950 dark:via-purple-950 dark:to-violet-950 z-50 transition-colors duration-700"
    >
      <div className="text-center">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-20 h-20 mx-auto mb-8 rounded-full bg-gradient-to-r from-lavender-400 via-rose-400 to-gold-400"
          style={{
            boxShadow: '0 0 40px rgba(168, 85, 247, 0.6), 0 0 80px rgba(244, 63, 94, 0.4)',
          }}
        />
        
        <motion.h2
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-2xl md:text-3xl font-quicksand font-semibold bg-gradient-to-r from-lavender-500 via-rose-500 to-gold-500 bg-clip-text text-transparent"
        >
          Warming up her universe...
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-lavender-400 font-poppins text-sm"
        >
          ✨ Preparing something special ✨
        </motion.p>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
