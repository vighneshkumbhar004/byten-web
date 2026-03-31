import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Minimize2, Maximize2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: 'Hello! 👋 I\'m the Byten Geomapping assistant. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Quick reply options
  const quickReplies = [
    'What services do you offer?',
    'Pricing information',
    'Request a demo',
    'Contact sales team'
  ];

  // Basic response system (you can replace this with AI API later)
  const getBotResponse = async (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Predefined responses
    if (lowerMessage.includes('service') || lowerMessage.includes('offer')) {
      return 'We offer comprehensive geospatial intelligence solutions including:\n\n🗺️ Drone Mapping & Surveying\n🏗️ Infrastructure Monitoring\n⚡ AI-Powered Predictive Analytics\n🏙️ Digital Twin Platforms\n\nWould you like to know more about any specific service?';
    }
    
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('pricing')) {
      return 'Our pricing is customized based on your project scope and requirements. Factors include:\n\n• Project area coverage\n• Data precision requirements\n• AI analysis features\n• Update frequency\n\nWould you like to schedule a consultation to discuss your specific needs?';
    }
    
    if (lowerMessage.includes('demo') || lowerMessage.includes('try')) {
      return 'Great! I\'d be happy to arrange a demo for you. Click the "Request a Demo" button in the navbar, or I can connect you with our sales team directly.\n\nWhat industry are you in?';
    }
    
    if (lowerMessage.includes('contact') || lowerMessage.includes('talk') || lowerMessage.includes('speak')) {
      return '📧 Email: intelligence@bytengeomapping.com\n📱 WhatsApp: Click the WhatsApp button to message us directly\n🏢 HQ: Pune, Maharashtra, India\n\nOur team typically responds within 2-4 hours during business hours. Would you like to leave a message?';
    }
    
    if (lowerMessage.includes('lidar') || lowerMessage.includes('drone') || lowerMessage.includes('survey')) {
      return 'Our survey-grade precision achieves 0.3cm accuracy using:\n\n• LiDAR point cloud acquisition\n• High-resolution RGB imaging\n• Thermal & Multispectral sensors\n• DGCA licensed operations\n\nWe\'re ISO 9001:2015 and SOC 2 Type II certified. What type of project are you planning?';
    }
    
    if (lowerMessage.includes('ai') || lowerMessage.includes('intelligence') || lowerMessage.includes('predict')) {
      return 'Our AI platform delivers 98.7% detection accuracy with:\n\n🧠 Predictive maintenance alerts\n🔍 Automated anomaly detection\n📊 Real-time analytics dashboard\n⚡ Infrastructure failure prediction\n\nWould you like to see a case study?';
    }
    
    if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
      return 'You\'re welcome! Is there anything else I can help you with? 😊';
    }
    
    // Default response
    return 'Thanks for your question! For detailed information about that, I recommend:\n\n1. Scheduling a demo with our team\n2. Emailing us at intelligence@bytengeomapping.com\n3. Messaging us on WhatsApp\n\nIs there something specific about our geospatial services I can help clarify?';
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Save to backend (optional - for analytics)
    try {
      await axios.post(`${API}/chat/message`, {
        message: inputValue,
        type: 'user'
      });
    } catch (error) {
      console.error('Failed to save message:', error);
    }

    // Simulate typing delay
    setTimeout(async () => {
      const botResponse = await getBotResponse(inputValue);
      
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        text: botResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);

      // Save bot response
      try {
        await axios.post(`${API}/chat/message`, {
          message: botResponse,
          type: 'bot'
        });
      } catch (error) {
        console.error('Failed to save bot response:', error);
      }
    }, 1000 + Math.random() * 1000);
  };

  const handleQuickReply = (reply) => {
    setInputValue(reply);
    setTimeout(() => handleSendMessage(), 100);
  };

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 bg-[#FFCC00] text-[#0A111A] p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300"
          >
            <MessageCircle size={28} />
            <motion.div
              className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            className={`fixed ${
              isMinimized ? 'bottom-6 right-6 w-80 h-16' : 'bottom-6 right-6 w-96 h-[600px]'
            } z-50 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300`}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#0A111A] to-[#1A2130] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#FFCC00] rounded-full flex items-center justify-center">
                  <MessageCircle size={20} className="text-[#0A111A]" />
                </div>
                <div>
                  <h3 className="font-semibold">Byten Assistant</h3>
                  <p className="text-xs text-gray-300">Online • Typically replies instantly</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="hover:bg-white/10 p-1 rounded transition-colors"
                >
                  {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="hover:bg-white/10 p-1 rounded transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages Area */}
                <ScrollArea className="flex-1 p-4 bg-gray-50">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-2xl ${
                            message.type === 'user'
                              ? 'bg-[#FFCC00] text-[#0A111A]'
                              : 'bg-white text-gray-800 shadow-sm border border-gray-200'
                          }`}
                        >
                          <p className="text-sm whitespace-pre-line">{message.text}</p>
                          <p className="text-xs opacity-60 mt-1">
                            {message.timestamp.toLocaleTimeString('en-US', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      </motion.div>
                    ))}

                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-start"
                      >
                        <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-200">
                          <div className="flex gap-1">
                            <motion.div
                              className="w-2 h-2 bg-gray-400 rounded-full"
                              animate={{ y: [0, -5, 0] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                            />
                            <motion.div
                              className="w-2 h-2 bg-gray-400 rounded-full"
                              animate={{ y: [0, -5, 0] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                            />
                            <motion.div
                              className="w-2 h-2 bg-gray-400 rounded-full"
                              animate={{ y: [0, -5, 0] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                {/* Quick Replies */}
                {messages.length <= 2 && (
                  <div className="px-4 py-2 bg-white border-t">
                    <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
                    <div className="flex flex-wrap gap-2">
                      {quickReplies.map((reply, index) => (
                        <button
                          key={index}
                          onClick={() => handleQuickReply(reply)}
                          className="text-xs px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                        >
                          {reply}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input Area */}
                <div className="p-4 bg-white border-t">
                  <div className="flex gap-2">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Type your message..."
                      className="flex-1"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim() || isTyping}
                      className="bg-[#FFCC00] hover:bg-[#FFD633] text-[#0A111A]"
                    >
                      <Send size={18} />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    Powered by Byten AI • We respond within minutes
                  </p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingChatbot;