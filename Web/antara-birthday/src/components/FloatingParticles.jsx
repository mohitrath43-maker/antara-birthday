import { motion } from 'framer-motion';

const FloatingParticles = () => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 8 + 4,
    left: Math.random() * 100,
    delay: Math.random() * 10,
    duration: Math.random() * 10 + 15,
  }));

  const emojis = ['✨', '💖', '💕', '⭐', '🌸', '💫', '🎵', '🎶', '💗', '🌟'];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{ y: '100vh', opacity: 0 }}
          animate={{
            y: '-100vh',
            opacity: [0, 1, 1, 0],
            rotate: 360,
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            position: 'absolute',
            left: `${particle.left}%`,
            fontSize: `${particle.size}px`,
          }}
          className="select-none"
        >
          {emojis[particle.id % emojis.length]}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingParticles;
