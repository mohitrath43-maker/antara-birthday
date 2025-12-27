import { motion } from 'framer-motion';
import { useState } from 'react';

const WaveformVisualizer = ({ isPlaying }) => {
  const [bars] = useState(Array.from({ length: 60 }, (_, i) => i));

  return (
    <div className="flex items-center justify-center gap-1 h-32 bg-gradient-to-r from-lavender-100 via-rose-100 to-gold-100 rounded-2xl p-4">
      {bars.map((bar) => (
        <motion.div
          key={bar}
          className="w-1 bg-gradient-to-t from-lavender-400 via-rose-400 to-gold-400 rounded-full"
          animate={isPlaying ? {
            height: [
              Math.random() * 40 + 20,
              Math.random() * 60 + 30,
              Math.random() * 40 + 20,
            ],
          } : {
            height: 20,
          }}
          transition={{
            duration: 0.5 + Math.random() * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: bar * 0.02,
          }}
        />
      ))}
    </div>
  );
};

export default WaveformVisualizer;
