import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaMusic, FaPlay, FaHeart } from 'react-icons/fa';
import { playlist } from '../data/playlist';
import LikeButton from './LikeButton';
import { useFavorites } from '../context/FavoritesContext';
import { useState } from 'react';

const PlaylistModal = ({ isOpen, onClose, currentTrackIndex, onSelectTrack }) => {
  const { favorites } = useFavorites();
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  const filteredPlaylist = showOnlyFavorites 
    ? playlist.filter(track => favorites.includes(track.id))
    : playlist;
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-10 lg:inset-20 bg-gradient-to-br from-lavender-50 via-rose-50 to-gold-50 dark:from-gray-900 dark:via-indigo-950 dark:to-purple-950 rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden border-2 border-white/50 dark:border-gray-700/50 transition-colors duration-700"
            style={{
              boxShadow: '0 25px 50px rgba(168, 85, 247, 0.3), 0 0 100px rgba(244, 63, 94, 0.2)',
            }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-lavender-400 via-rose-400 to-gold-400 p-4 md:p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <FaMusic className="text-white text-2xl md:text-3xl" />
                  <div>
                    <h2 className="text-xl md:text-2xl font-quicksand font-bold text-white">
                      Her Complete Melodies
                    </h2>
                    <p className="text-white/80 text-sm font-poppins">
                      {filteredPlaylist.length} songs {showOnlyFavorites && '• Favorites'} • Antara's Voice
                    </p>
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 md:p-3 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
                >
                  <FaTimes className="text-xl md:text-2xl" />
                </motion.button>
              </div>

              {/* Filter Toggle */}
              {favorites.length > 0 && (
                <motion.button
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-full text-sm font-poppins font-medium transition-all
                    ${showOnlyFavorites 
                      ? 'bg-white text-rose-500' 
                      : 'bg-white/20 text-white hover:bg-white/30'
                    }
                  `}
                >
                  <FaHeart className={showOnlyFavorites ? 'text-rose-500' : 'text-white'} />
                  <span>
                    {showOnlyFavorites ? 'Show All' : `Favorites (${favorites.length})`}
                  </span>
                </motion.button>
              )}
            </div>

            {/* Playlist */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6">
              {filteredPlaylist.length === 0 ? (
                <div className="text-center py-12">
                  <FaHeart className="text-6xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400 font-poppins">
                    No favorites yet! ❤️ Click the hearts to mark songs you love.
                  </p>
                </div>
              ) : (
                <div className="grid gap-2 md:gap-3">
                  {filteredPlaylist.map((track, index) => {
                    const originalIndex = playlist.findIndex(t => t.id === track.id);
                    return (
                      <motion.div
                        key={track.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.02 }}
                        whileHover={{ scale: 1.02, x: 5 }}
                        onClick={() => {
                          onSelectTrack(originalIndex);
                          onClose();
                        }}
                        className={`
                          p-3 md:p-4 rounded-xl cursor-pointer transition-all duration-300
                          ${originalIndex === currentTrackIndex 
                            ? 'bg-gradient-to-r from-lavender-300 via-rose-300 to-gold-300 dark:from-lavender-600 dark:via-rose-600 dark:to-gold-600 shadow-lg' 
                            : 'bg-white/60 dark:bg-gray-800/60 hover:bg-white/80 dark:hover:bg-gray-800/80'
                          }
                          backdrop-blur-sm border border-white/50 dark:border-gray-700/50
                        `}
                        style={originalIndex === currentTrackIndex ? {
                          boxShadow: '0 4px 20px rgba(168, 85, 247, 0.3)',
                        } : {}}
                      >
                    <div className="flex items-center gap-3 md:gap-4">
                      {/* Track Number or Playing Icon */}
                      <div className={`
                        flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full font-bold transition-colors duration-300
                        ${originalIndex === currentTrackIndex 
                          ? 'bg-white text-lavender-500 dark:bg-gray-900 dark:text-lavender-300' 
                          : 'bg-lavender-100 text-lavender-600 dark:bg-gray-700 dark:text-lavender-400'
                        }
                      `}>
                        {originalIndex === currentTrackIndex ? (
                          <FaPlay className="text-xs md:text-sm ml-0.5" />
                        ) : (
                          <span className="text-xs md:text-sm">{originalIndex + 1}</span>
                        )}
                      </div>

                      {/* Track Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className={`
                          text-sm md:text-base font-quicksand font-semibold truncate transition-colors duration-300
                          ${originalIndex === currentTrackIndex ? 'text-lavender-700 dark:text-white' : 'text-gray-700 dark:text-gray-200'}
                        `}>
                          {track.title}
                        </h3>
                        <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-poppins transition-colors duration-300">
                          {track.artist}
                        </p>
                      </div>

                      {/* Like Button */}
                      <div onClick={(e) => e.stopPropagation()}>
                        <LikeButton songId={track.id} size="md" />
                      </div>
                    </div>
                  </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="bg-gradient-to-r from-lavender-100 via-rose-100 to-gold-100 dark:from-gray-800 dark:via-indigo-900 dark:to-purple-900 p-4 text-center border-t border-white/30 dark:border-gray-700/30 transition-colors duration-700">
              <p className="text-sm font-poppins text-lavender-600 dark:text-lavender-300 transition-colors duration-700">
                💖 Made with love for Antara 💖
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PlaylistModal;
