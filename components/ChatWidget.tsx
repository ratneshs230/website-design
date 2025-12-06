import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat, GenerateContentResponse } from '@google/genai';
import { MessageSquare, X, Send, ChevronDown } from 'lucide-react';

interface Message {
  role: 'user' | 'model';
  text: string;
}

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Welcome to Celestial Smile. How may I assist you with your transformation today?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const chatRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize Chat
  useEffect(() => {
    if (isOpen && !chatRef.current && process.env.API_KEY) {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      chatRef.current = ai.chats.create({
        model: 'gemini-3-pro-preview',
        config: {
          systemInstruction: "You are the digital concierge for Celestial Smile, a luxury futuristic dentistry. Your tone is elegant, sophisticated, and professional. Keep responses concise.",
        },
      });
    }
  }, [isOpen]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || !chatRef.current) return;

    const userMsg = inputValue;
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const resultStream = await chatRef.current.sendMessageStream({ message: userMsg });
      
      let fullText = "";
      setMessages(prev => [...prev, { role: 'model', text: "" }]); // Placeholder

      for await (const chunk of resultStream) {
        const c = chunk as GenerateContentResponse;
        if (c.text) {
            fullText += c.text;
            setMessages(prev => {
                const newArr = [...prev];
                newArr[newArr.length - 1].text = fullText;
                return newArr;
            });
        }
      }
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "I apologize, I am experiencing a temporary disconnection from the neural network." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-50 bg-neon-lime hover:bg-neon-lime-hover text-black p-4 rounded-full shadow-[0_0_20px_rgba(204,255,0,0.4)] transition-all hover:scale-110"
      >
        <MessageSquare className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-8 right-8 z-50 w-[350px] md:w-[400px] h-[500px] bg-[#0a0a0a] border border-zinc-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-slideUp">
      {/* Header */}
      <div className="bg-zinc-900/50 p-4 border-b border-zinc-800 flex justify-between items-center backdrop-blur-md">
        <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-neon-lime animate-pulse"></div>
            <h3 className="font-bold text-sm tracking-wide">AI CONCIERGE</h3>
        </div>
        <div className="flex gap-2">
            <button onClick={() => setIsOpen(false)} className="text-zinc-500 hover:text-white">
                <ChevronDown className="w-5 h-5" />
            </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div 
              className={`max-w-[80%] p-3 text-sm rounded-xl ${
                msg.role === 'user' 
                  ? 'bg-zinc-800 text-white rounded-br-none border border-zinc-700' 
                  : 'bg-neon-lime/10 text-gray-200 rounded-bl-none border border-neon-lime/20'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
            <div className="flex justify-start">
                <div className="bg-neon-lime/10 p-3 rounded-xl rounded-bl-none flex gap-1">
                    <div className="w-1.5 h-1.5 bg-neon-lime rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-neon-lime rounded-full animate-bounce delay-100"></div>
                    <div className="w-1.5 h-1.5 bg-neon-lime rounded-full animate-bounce delay-200"></div>
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-zinc-900 border-t border-zinc-800">
        <div className="relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your inquiry..."
            className="w-full bg-black border border-zinc-700 rounded-full py-3 pl-4 pr-12 text-sm text-white focus:outline-none focus:border-neon-lime transition-colors placeholder-zinc-600"
          />
          <button 
            onClick={handleSend}
            disabled={!inputValue.trim() || isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-zinc-800 rounded-full text-neon-lime hover:bg-zinc-700 disabled:opacity-50 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};