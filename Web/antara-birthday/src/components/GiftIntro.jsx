import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GiftIntro = ({ onUnlock }) => {
  const [animationPhase, setAnimationPhase] = useState('flying'); // 'flying', 'landed', 'pin-modal'
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  
  const CORRECT_PIN = '1228'; // Change this to your desired PIN

  useEffect(() => {
    // Bird flies in and lands after 3 seconds
    const flyTimer = setTimeout(() => {
      setAnimationPhase('landed');
    }, 3000);
    
    return () => clearTimeout(flyTimer);
  }, []);

  const handleGiftClick = () => {
    if (animationPhase === 'landed') {
      setAnimationPhase('pin-modal');
    }
  };

  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (pin === CORRECT_PIN) {
      onUnlock();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => {
        setShake(false);
        setPin('');
      }, 500);
    }
  };

  const handlePinChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
    setPin(value);
    setError(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.5 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-sky-200 via-pink-100 to-amber-100 dark:from-indigo-950 dark:via-purple-950 dark:to-slate-900 z-50 overflow-hidden"
    >
      {/* Stars/sparkles background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-yellow-300 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Bird and Gift Container */}
      <motion.div
        initial={{ scale: 0.1, x: '-100vw', y: '-50vh' }}
        animate={
          animationPhase === 'flying'
            ? { scale: 1, x: 0, y: 0 }
            : { scale: 1, x: 0, y: 0 }
        }
        transition={{
          duration: 3,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        className="relative flex flex-col items-center"
      >
        {/* Bird */}
        <motion.div
          animate={
            animationPhase === 'landed'
              ? { x: 80, y: 20 }
              : { x: 0, y: 0 }
          }
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative z-10"
        >
          {/* Bird Name Bubble */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={
              animationPhase === 'landed'
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0 }
            }
            transition={{ delay: 0.5, duration: 0.3, type: 'spring' }}
            className="absolute -top-8 left-1/2 -translate-x-1/2 z-20"
          >
            <div className="relative bg-white dark:bg-slate-700 px-3 py-1 rounded-full shadow-lg border-2 border-pink-300 dark:border-pink-500">
              <span className="text-sm font-quicksand font-bold text-pink-500 dark:text-pink-300">
                Tiku
              </span>
              {/* Speech bubble tail */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 
                border-l-[6px] border-l-transparent 
                border-r-[6px] border-r-transparent 
                border-t-[8px] border-t-white dark:border-t-slate-700">
              </div>
              <div className="absolute -bottom-[10px] left-1/2 -translate-x-1/2 w-0 h-0 
                border-l-[7px] border-l-transparent 
                border-r-[7px] border-r-transparent 
                border-t-[9px] border-t-pink-300 dark:border-t-pink-500 -z-10">
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={
              animationPhase === 'flying'
                ? { y: [0, -10, 0], rotate: [0, 5, -5, 0] }
                : { y: [0, -3, 0] }
            }
            transition={{
              duration: animationPhase === 'flying' ? 0.5 : 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="text-6xl md:text-8xl cursor-default select-none"
          >
            🐦
          </motion.div>
          
          {/* Wing flapping effect */}
          {animationPhase === 'flying' && (
            <>
              <motion.div
                className="absolute -left-4 top-4 text-3xl"
                animate={{ rotate: [-30, 30, -30], x: [-5, 0, -5] }}
                transition={{ duration: 0.2, repeat: Infinity }}
              >
                ✨
              </motion.div>
              <motion.div
                className="absolute -right-4 top-4 text-3xl"
                animate={{ rotate: [30, -30, 30], x: [5, 0, 5] }}
                transition={{ duration: 0.2, repeat: Infinity }}
              >
                ✨
              </motion.div>
            </>
          )}
        </motion.div>

        {/* Gift Box */}
        <motion.div
          initial={{ y: -20 }}
          animate={
            animationPhase === 'landed'
              ? { y: 0, scale: [1, 1.05, 1] }
              : { y: animationPhase === 'flying' ? -20 : 0 }
          }
          transition={{
            y: { duration: 0.5 },
            scale: { duration: 0.3, delay: 0.5 },
          }}
          whileHover={animationPhase === 'landed' ? { scale: 1.1 } : {}}
          whileTap={animationPhase === 'landed' ? { scale: 0.95 } : {}}
          onClick={handleGiftClick}
          className={`relative mt-4 ${animationPhase === 'landed' ? 'cursor-pointer' : ''}`}
        >
          {/* Gift box with ribbon */}
          <div className="relative">
            <motion.div
              className="text-7xl md:text-9xl select-none"
              animate={
                animationPhase === 'landed'
                  ? {
                      filter: [
                        'drop-shadow(0 0 10px rgba(255,215,0,0.5))',
                        'drop-shadow(0 0 20px rgba(255,215,0,0.8))',
                        'drop-shadow(0 0 10px rgba(255,215,0,0.5))',
                      ],
                    }
                  : {}
              }
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              🎁
            </motion.div>
            
            {/* Click hint */}
            {animationPhase === 'landed' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap"
              >
                <motion.p
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-sm md:text-base font-quicksand font-medium text-purple-600 dark:text-purple-300"
                >
                  ✨ Tap to open ✨
                </motion.p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>

      {/* PIN Modal */}
      <AnimatePresence>
        {animationPhase === 'pin-modal' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-20"
            onClick={() => setAnimationPhase('landed')}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={shake ? { x: [-10, 10, -10, 10, 0], scale: 1, opacity: 1 } : { scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: shake ? 0.4 : 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-slate-800 rounded-3xl p-8 mx-4 shadow-2xl max-w-sm w-full"
            >
              <div className="text-center">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                  className="text-5xl mb-4"
                >
                  🔐
                </motion.div>
                
                <h2 className="text-xl md:text-2xl font-quicksand font-bold text-purple-600 dark:text-purple-300 mb-2">
                  Secret Gift!
                </h2>
                
                <p className="text-gray-600 dark:text-gray-300 font-poppins text-sm mb-6">
                  Enter the magic PIN to unwrap your surprise
                </p>

                <p className="text-xs text-gray-400 dark:text-gray-500 font-poppins mb-4 italic">
                  💡 Hint: Her Date of Birth
                </p>
                
                <form onSubmit={handlePinSubmit}>
                  <div className="relative mb-4">
                    <input
                      type="password"
                      value={pin}
                      onChange={handlePinChange}
                      placeholder="• • • •"
                      maxLength={4}
                      autoFocus
                      className={`w-full text-center text-3xl tracking-[0.5em] py-4 px-6 rounded-xl border-2 
                        ${error 
                          ? 'border-red-400 bg-red-50 dark:bg-red-900/20' 
                          : 'border-purple-200 dark:border-purple-700 bg-purple-50 dark:bg-slate-700'
                        } 
                        focus:outline-none focus:border-purple-500 dark:focus:border-purple-400
                        text-purple-600 dark:text-purple-200 placeholder-purple-300 dark:placeholder-purple-500
                        transition-all duration-300`}
                    />
                  </div>
                  
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mb-4 font-poppins"
                    >
                      Oops! Wrong PIN. Try again! 💫
                    </motion.p>
                  )}
                  
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-3 px-6 bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 
                      text-white font-quicksand font-semibold rounded-xl shadow-lg
                      hover:shadow-xl transition-shadow duration-300"
                  >
                    Unwrap the Magic ✨
                  </motion.button>
                </form>
                
                <button
                  onClick={() => setAnimationPhase('landed')}
                  className="mt-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-sm font-poppins transition-colors"
                >
                  Go back
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default GiftIntro;
