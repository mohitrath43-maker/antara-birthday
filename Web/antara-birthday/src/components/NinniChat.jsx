/*
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMoon, FaTimes, FaPaperPlane } from 'react-icons/fa';

const NinniChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello there! I'm Ninni, your sleep companion 🌙 How can I help you get better rest tonight? ✨",
      isNinni: true,
      timestamp: new Date().toISOString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      isNinni: false,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentMessage = inputMessage;
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: currentMessage,
          sessionId: 'antara-birthday-session'
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const ninniMessage = {
          id: Date.now() + 1,
          text: data.message,
          isNinni: true,
          timestamp: data.timestamp
        };
        setMessages(prev => [...prev, ninniMessage]);
      } else {
        throw new Error(data.error || 'Failed to get response');
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: "I'm having trouble connecting right now 😴 Please try again in a moment!",
        isNinni: true,
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 
          text-white rounded-full shadow-xl flex items-center justify-center z-40 
          hover:shadow-2xl transition-all duration-300 ${isOpen ? 'scale-0' : 'scale-100'}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0 }}
        animate={{ scale: isOpen ? 0 : 1 }}
        transition={{ type: 'spring', stiffness: 200 }}
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <FaMoon className="text-xl" />
        </motion.div>
        
        {/* Pulse effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 rounded-full -z-10"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.button>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-slate-800 rounded-t-3xl sm:rounded-3xl w-full max-w-md h-[70vh] sm:h-[600px] flex flex-col shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-slate-700 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 rounded-t-3xl">
                <div className="flex items-center space-x-3">
                  <motion.div
                    className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <FaMoon className="text-lg" />
                  </motion.div>
                  <div>
                    <h3 className="font-quicksand font-bold text-lg text-gray-800 dark:text-white">
                      Ninni
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-poppins">
                      Your Sleep Assistant 😴
                    </p>
                  </div>
                </div>
                
                <motion.button
                  onClick={() => setIsOpen(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                >
                  <FaTimes />
                </motion.button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.isNinni ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-[80%] px-4 py-3 rounded-2xl font-poppins text-sm
                        ${message.isNinni
                          ? 'bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 text-gray-800 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 dark:text-white'
                          : 'bg-gradient-to-br from-purple-500 via-pink-500 to-amber-500 text-white'
                        }`}
                    >
                      {message.text}
                    </div>
                  </motion.div>
                ))}
                
                {/* Loading indicator */}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 px-4 py-3 rounded-2xl">
                      <motion.div
                        className="flex space-x-1"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <div className="w-2 h-2 bg-purple-400 rounded-full" />
                        <div className="w-2 h-2 bg-pink-400 rounded-full" />
                        <div className="w-2 h-2 bg-indigo-400 rounded-full" />
                      </motion.div>
                    </div>
                  </motion.div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <form
                onSubmit={handleSubmit}
                className="p-4 border-t border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800"
              >
                <div className="flex space-x-3">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Ask Ninni about sleep... 💤"
                    disabled={isLoading}
                    className="flex-1 px-4 py-3 bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-white 
                      placeholder-gray-500 dark:placeholder-gray-400 rounded-2xl border-none focus:outline-none 
                      focus:ring-2 focus:ring-purple-300 dark:focus:ring-purple-600 font-poppins text-sm
                      disabled:opacity-50 transition-all"
                  />
                  <motion.button
                    type="submit"
                    disabled={!inputMessage.trim() || isLoading}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-amber-500 
                      text-white rounded-full flex items-center justify-center shadow-lg
                      disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    <FaPaperPlane className="text-sm" />
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NinniChat;
*/