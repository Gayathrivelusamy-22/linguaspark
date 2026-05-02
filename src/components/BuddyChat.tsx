import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Mic, MicOff, Sparkles, User } from 'lucide-react';
import { chatWithBuddy } from '../lib/gemini';
import { cn } from '../lib/utils';
import { getChatPrompts } from '../lib/questionService';

interface Message {
  role: 'user' | 'model';
  text: string;
}

export const BuddyChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  
  useEffect(() => {
    const prompts = getChatPrompts();
    setMessages([{ 
      role: 'model', 
      text: "Hello! I'm Sparky! ✨ " + prompts[0] 
    }]);
  }, []);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const response = await chatWithBuddy(history, input);
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setIsTyping(false);
  };

  const toggleListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('speechRecognition' in window)) {
      alert("Speech recognition isn't supported in your browser. Try Chrome!");
      return;
    }

    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).speechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    if (isListening) {
      setIsListening(false);
      recognition.stop();
    } else {
      setIsListening(true);
      recognition.start();
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
    }
  };

  return (
    <div className="flex flex-col h-[70vh] bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-2xl relative">
      {/* Header */}
      <div className="bg-brand-primary p-4 flex items-center gap-3 text-white">
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-xl animate-float">
          ✨
        </div>
        <div>
          <h3 className="font-black leading-none">Sparky</h3>
          <span className="text-[10px] font-bold opacity-70 uppercase tracking-widest">Online Buddy</span>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
        {messages.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className={cn(
              "flex items-end gap-2 max-w-[85%]",
              m.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
            )}
          >
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-xs shrink-0 shadow-sm",
              m.role === 'user' ? "bg-indigo-100 text-indigo-600" : "bg-orange-100 text-orange-600"
            )}>
              {m.role === 'user' ? <User size={14} /> : <Sparkles size={14} />}
            </div>
            <div className={cn(
              "p-4 rounded-2xl text-sm font-bold leading-relaxed",
              m.role === 'user' 
                ? "bg-indigo-600 text-white rounded-br-none" 
                : "bg-slate-100 text-slate-800 rounded-bl-none"
            )}>
              {m.text}
            </div>
          </motion.div>
        ))}
        {isTyping && (
          <div className="flex items-center gap-2 mr-auto animate-pulse">
            <div className="w-8 h-8 bg-orange-50 rounded-full flex items-center justify-center text-orange-600">
               <Sparkles size={14} />
            </div>
            <div className="bg-slate-50 p-3 rounded-2xl rounded-bl-none flex gap-1">
              <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" />
              <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/50">
        <div className="flex items-center gap-2 bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
          <button 
            onClick={toggleListening}
            className={cn(
              "p-2 rounded-xl transition-all",
              isListening ? "bg-red-100 text-red-500 animate-pulse" : "bg-slate-50 text-slate-400 hover:bg-slate-100"
            )}
          >
            {isListening ? <MicOff size={20} /> : <Mic size={20} />}
          </button>
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={isListening ? "Listening..." : "Say something..."}
            className="flex-1 bg-transparent border-none focus:ring-0 font-bold text-slate-700 placeholder:text-slate-300"
          />
          <button 
            disabled={!input.trim() || isTyping}
            onClick={handleSend}
            className="p-2 bg-brand-primary text-white rounded-xl shadow-md disabled:opacity-30 active:scale-95 transition-all"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
