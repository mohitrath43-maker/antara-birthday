import { motion } from 'framer-motion';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useFavorites } from '../context/FavoritesContext';

const LikeButton = ({ songId, size = 'md', showLabel = false }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isLiked = isFavorite(songId);

  const sizeClasses = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  const handleClick = (e) => {
    e.stopPropagation(); // Prevent triggering parent click events
    toggleFavorite(songId);
  };

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.85 }}
      className="relative focus:outline-none group"
      aria-label={isLiked ? 'Unlike song' : 'Like song'}
    >
      <motion.div
        animate={isLiked ? {
          scale: [1, 1.3, 1],
        } : {}}
        transition={{
          duration: 0.4,
          ease: "easeOut",
        }}
      >
        {isLiked ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          >
            <FaHeart 
              className={`${sizeClasses[size]} text-rose-500 dark:text-rose-400 transition-colors duration-300 drop-shadow-lg`}
            />
          </motion.div>
        ) : (
          <FaRegHeart 
            className={`${sizeClasses[size]} text-gray-400 dark:text-gray-500 group-hover:text-rose-400 dark:group-hover:text-rose-300 transition-colors duration-300`}
          />
        )}
      </motion.div>

      {/* Pulse effect when liked */}
      {isLiked && (
        <motion.div
          initial={{ scale: 1, opacity: 0.6 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <FaHeart className={`${sizeClasses[size]} text-rose-400`} />
        </motion.div>
      )}

      {/* Optional label */}
      {showLabel && (
        <span className="ml-2 text-sm font-poppins text-gray-600 dark:text-gray-400 group-hover:text-rose-500 transition-colors">
          {isLiked ? 'Loved' : 'Love it'}
        </span>
      )}
    </motion.button>
  );
};

export default LikeButton;
