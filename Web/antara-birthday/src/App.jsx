import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { FavoritesProvider } from './context/FavoritesContext';
import GiftIntro from './components/GiftIntro';
import LoadingScreen from './components/LoadingScreen';
import HomePage from './components/HomePage';
import MusicPlayer from './components/MusicPlayer';
import EndingMessage from './components/EndingMessage';
import FloatingParticles from './components/FloatingParticles';
import ThemeToggle from './components/ThemeToggle';

function App() {
  const [giftUnlocked, setGiftUnlocked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showPlayer, setShowPlayer] = useState(false);
  const [playlistEnded, setPlaylistEnded] = useState(false);

  useEffect(() => {
    // Only start loading timer after gift is unlocked
    if (giftUnlocked) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [giftUnlocked]);

  const handleGiftUnlock = () => {
    setGiftUnlocked(true);
  };

  const handleEnterPlayer = () => {
    setShowPlayer(true);
  };

  const handlePlaylistEnd = () => {
    setPlaylistEnded(true);
  };

  return (
    <ThemeProvider>
      <FavoritesProvider>
        <div className="min-h-screen relative overflow-hidden transition-colors duration-700">
          <FloatingParticles />
          {giftUnlocked && <ThemeToggle />}
          
          <AnimatePresence mode="wait">
            {!giftUnlocked ? (
              <GiftIntro key="gift" onUnlock={handleGiftUnlock} />
            ) : isLoading ? (
              <LoadingScreen key="loading" />
            ) : playlistEnded ? (
              <EndingMessage key="ending" />
            ) : !showPlayer ? (
              <HomePage key="home" onEnter={handleEnterPlayer} />
            ) : (
              <MusicPlayer key="player" onPlaylistEnd={handlePlaylistEnd} />
            )}
          </AnimatePresence>
        </div>
      </FavoritesProvider>
    </ThemeProvider>
  );
}

export default App;
