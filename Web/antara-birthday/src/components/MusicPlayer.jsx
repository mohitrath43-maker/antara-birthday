import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaPause, FaStepForward, FaStepBackward, FaVolumeUp, FaList } from 'react-icons/fa';
import { playlist, quotes, backgroundGradients } from '../data/playlist';
import WaveformVisualizer from './WaveformVisualizer';
import PlaylistModal from './PlaylistModal';
import LikeButton from './LikeButton';
//import NinniChat from './NinniChat';

const MusicPlayer = ({ onPlaylistEnd }) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);
  const [showQuote, setShowQuote] = useState(true);
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);
  
  const audioRef = useRef(null);
  
  const currentTrack = playlist[currentTrackIndex];
  const currentGradient = backgroundGradients[currentTrackIndex % backgroundGradients.length];

  // Auto-play when component mounts
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.play().catch(err => console.log('Autoplay prevented:', err));
      setIsPlaying(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update quote when track changes
  useEffect(() => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setCurrentQuote(randomQuote);
    setShowQuote(true);
    
    const timer = setTimeout(() => {
      setShowQuote(false);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [currentTrackIndex]);

  // Handle time update
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => handleNext();

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrackIndex]);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    if (currentTrackIndex < playlist.length - 1) {
      setCurrentTrackIndex(prev => prev + 1);
      setIsPlaying(true);
    } else {
      // Playlist ended
      onPlaylistEnd();
    }
  };

  const handlePrevious = () => {
    if (currentTime > 3) {
      // If more than 3 seconds in, restart current track
      audioRef.current.currentTime = 0;
    } else if (currentTrackIndex > 0) {
      setCurrentTrackIndex(prev => prev - 1);
      setIsPlaying(true);
    }
  };

  const handleSeek = (e) => {
    const seekTime = (e.target.value / 100) * duration;
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value / 100;
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSelectTrack = (index) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true);
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className={`fixed inset-0 bg-gradient-to-br ${currentGradient} dark:from-indigo-900 dark:via-purple-900 dark:to-violet-900 transition-all duration-1000 flex items-center justify-center px-4`}
    >
      <audio
        ref={audioRef}
        src={`/Audio/${currentTrack.file}`}
        onLoadedData={() => {
          if (isPlaying) {
            audioRef.current?.play();
          }
        }}
      />

      <div className="max-w-md w-full">
        {/* Quote Display */}
        <AnimatePresence>
          {showQuote && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8 text-center"
            >
              <p className="text-sm md:text-base font-quicksand text-lavender-600 dark:text-lavender-300 italic px-4 transition-colors duration-700">
                "{currentQuote}"
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Player Card */}
        <motion.div
          layout
          className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50 dark:border-gray-700/50 transition-colors duration-700"
          style={{
            boxShadow: '0 8px 32px rgba(168, 85, 247, 0.2), 0 0 60px rgba(244, 63, 94, 0.1)',
          }}
        >
          {/* Waveform Visualizer */}
          <div className="mb-6">
            <WaveformVisualizer isPlaying={isPlaying} color={currentGradient} />
          </div>

          {/* Song Info */}
          <div className="text-center mb-6">
            <motion.h2
              key={currentTrack.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl md:text-3xl font-quicksand font-bold text-lavender-600 dark:text-lavender-300 mb-2 transition-colors duration-700"
            >
              {currentTrack.title}
            </motion.h2>
            <p className="text-base md:text-lg font-poppins text-rose-500 dark:text-rose-400 transition-colors duration-700">
              {currentTrack.artist}
            </p>
            <div className="flex items-center justify-center gap-2 mt-2">
              <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-700">
                Track {currentTrackIndex + 1} of {playlist.length}
              </p>
              <LikeButton songId={currentTrack.id} size="sm" />
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleSeek}
              className="w-full h-2 bg-lavender-200 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #c084fc ${progress}%, #e9d5ff ${progress}%)`,
              }}
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2 font-poppins transition-colors duration-700">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mb-6">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handlePrevious}
              className="p-3 rounded-full bg-lavender-300 text-white hover:bg-lavender-400 transition-colors"
              disabled={currentTrackIndex === 0 && currentTime < 3}
            >
              <FaStepBackward size={20} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={togglePlayPause}
              className="p-6 rounded-full bg-gradient-to-r from-lavender-400 via-rose-400 to-gold-400 text-white shadow-lg"
              style={{
                boxShadow: '0 4px 20px rgba(168, 85, 247, 0.4)',
              }}
            >
              {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} className="ml-1" />}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleNext}
              className="p-3 rounded-full bg-rose-300 text-white hover:bg-rose-400 transition-colors"
              disabled={currentTrackIndex === playlist.length - 1}
            >
              <FaStepForward size={20} />
            </motion.button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-3">
            <FaVolumeUp className="text-lavender-500" />
            <input
              type="range"
              min="0"
              max="100"
              value={volume * 100}
              onChange={handleVolumeChange}
              className="flex-1 h-2 bg-lavender-200 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #c084fc ${volume * 100}%, #e9d5ff ${volume * 100}%)`,
              }}
            />
          </div>
        </motion.div>

        {/* Bottom Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-6 text-sm font-poppins text-lavender-600 dark:text-lavender-300 transition-colors duration-700"
        >
          Made with 💖 for Antara
        </motion.p>
      </div>

      {/* Floating Playlist Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsPlaylistOpen(true)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 p-3 sm:p-4 md:p-5 bg-gradient-to-r from-lavender-400 via-rose-400 to-gold-400 text-white rounded-full shadow-2xl z-30 relative"
        style={{
          boxShadow: '0 8px 30px rgba(168, 85, 247, 0.5), 0 0 60px rgba(244, 63, 94, 0.3)',
        }}
      >
        <FaList className="text-lg sm:text-xl md:text-2xl" />
        
        {/* Song count badge */}
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8, type: 'spring' }}
          className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-white text-lavender-600 text-xs font-bold rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center shadow-lg"
        >
          {playlist.length}
        </motion.span>
      </motion.button>

      {/* Playlist Modal */}
      <PlaylistModal
        isOpen={isPlaylistOpen}
        onClose={() => setIsPlaylistOpen(false)}
        currentTrackIndex={currentTrackIndex}
        onSelectTrack={handleSelectTrack}
      />

      {/* Ninni Chat */}
     {/* <NinniChat /> */}
    </motion.div>
  );
};

export default MusicPlayer;
