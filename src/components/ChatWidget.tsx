import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { API_BASE_URL } from '../lib/api';

interface ChatMessage {
  id: string;
  message: string;
  isUser: boolean;
  timestamp: Date;
}

const TEMPLATE_QUESTIONS = [
  "Apa skill utama Naufal?",
  "Bisa lihat pengalaman project?", 
  "Bagikan link GitHub!",
  "Tunjukkan CV saya"
];

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-open chat and send welcome message on component mount
  useEffect(() => {
    if (!hasInitialized) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sendWelcomeMessage();
        setHasInitialized(true);
      }, 2000); // Delay 2 seconds after page load

      return () => clearTimeout(timer);
    }
  }, [hasInitialized]);

  const sendWelcomeMessage = async () => {
    setIsLoading(true);
    
    try {
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: 'tolong sambut tamu portfolio saya dengan beberapa kata' })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      const welcomeMessage: ChatMessage = {
        id: Date.now().toString(),
        message: data.reply || 'Halo! Selamat datang di portfolio Naufal Ananta. Saya di sini untuk membantu Anda mengenal lebih jauh tentang skill, pengalaman, dan project-project yang telah dikerjakan. Ada yang ingin Anda tanyakan?',
        isUser: false,
        timestamp: new Date()
      };

      setMessages([welcomeMessage]);
    } catch (error) {
      console.error('Error sending welcome message:', error);
      const fallbackMessage: ChatMessage = {
        id: Date.now().toString(),
        message: 'Halo! Selamat datang di portfolio Naufal Ananta. Saya di sini untuk membantu Anda mengenal lebih jauh tentang skill, pengalaman, dan project-project yang telah dikerjakan. Ada yang ingin Anda tanyakan?',
        isUser: false,
        timestamp: new Date()
      };
      setMessages([fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async (message: string) => {
    if (!message.trim() || isLoading) {
      return;
    }

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      message: message.trim(),
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: message.trim() })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        message: data.reply || 'Maaf, saya tidak bisa merespons saat ini.',
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        message: 'Maaf, terjadi kesalahan. Silakan coba lagi nanti.',
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputMessage);
  };

  const handleTemplateClick = (question: string) => {
    sendMessage(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputMessage);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Button */}
      <motion.button
        onClick={toggleChat}
        className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-white text-xl transition-colors duration-300 ${
          isOpen 
            ? 'bg-red-500 hover:bg-red-600' 
            : 'bg-purple-600 hover:bg-purple-700'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        {isOpen ? '✕' : '💬'}
      </motion.button>

      {/* Chat Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute bottom-16 right-0 w-80 sm:w-96 h-96 sm:h-128 bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden
                       max-sm:fixed max-sm:inset-4 max-sm:w-auto max-sm:h-auto max-sm:bottom-20 max-sm:right-4 max-sm:left-4 max-sm:top-4"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white p-3 sm:p-4 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl">🤖</span>
                <h3 className="font-semibold text-sm sm:text-base">Naufal AI Assistant</h3>
              </div>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-gray-50 min-h-0">
              {messages.length === 0 && !isLoading && (
                <div className="text-center py-4 sm:py-8">
                  <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">👋</div>
                  <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base px-2">
                    Halo! Saya AI Assistant Naufal. Ada yang bisa saya bantu?
                  </p>
                  
                  {/* Template Questions */}
                  <div className="space-y-2">
                    <p className="text-xs sm:text-sm text-gray-500 mb-3">Pertanyaan cepat:</p>
                    {TEMPLATE_QUESTIONS.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => handleTemplateClick(question)}
                        className="block w-full text-left p-2 sm:p-3 bg-white rounded-lg border border-gray-200 text-gray-600 hover:border-purple-300 hover:bg-purple-50 transition-colors duration-200 text-xs sm:text-sm"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] sm:max-w-xs lg:max-w-md px-3 sm:px-4 py-2 rounded-lg ${
                      msg.isUser
                        ? 'bg-purple-600 text-white rounded-br-none'
                        : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                    }`}
                  >
                    <p className="text-xs sm:text-sm whitespace-pre-wrap break-words">{msg.message}</p>
                    <p
                      className={`text-xs mt-1 ${
                        msg.isUser ? 'text-purple-200' : 'text-gray-500'
                      }`}
                    >
                      {msg.timestamp.toLocaleTimeString('id-ID', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white text-gray-800 border border-gray-200 rounded-lg rounded-bl-none px-3 sm:px-4 py-2">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="p-3 sm:p-4 bg-white border-t border-gray-200 flex-shrink-0">
              <div className="flex gap-2">
                <textarea
                  ref={textareaRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ketik pertanyaan Anda..."
                  className="flex-1 resize-none border border-gray-300 rounded-lg text-gray-800 px-2 sm:px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent min-h-[2.5rem]"
                  rows={1}
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim() || isLoading}
                  className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-colors duration-200 flex-shrink-0"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    '📤'
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatWidget;
