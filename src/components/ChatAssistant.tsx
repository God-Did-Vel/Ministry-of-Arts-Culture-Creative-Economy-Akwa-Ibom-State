'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, User, Bot, HelpCircle } from 'lucide-react';

interface Message {
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'bot',
      text: 'Welcome! I am the Digital Assistant for the Ministry of Arts, Culture & Creative Economy Akwa Ibom State. How can I help you explore Akwa Ibom heritage or access digital services today?',
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    "How do I register in the Akwa Ibom Artist Directory?",
    "Tell me about Ekpe Heritage & Oron Museum",
    "What creative grants are active in Akwa Ibom?",
    "Are there open procurement tenders?"
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const getBotResponse = (query: string): string => {
    const q = query.toLowerCase();
    
    if (q.includes('artist') || q.includes('register') || q.includes('id card')) {
      return 'To register as an Akwa Ibom artist and obtain your verified Digital ID Card and QR code, navigate to the "Citizen Portal" tab. Fill out the "Artist Directory Registration" form with your biography, creative medium (e.g. music, crafts, film), and qualifications. Once submitted, your registration goes into the ministry review queue!';
    }
    
    if (q.includes('grant') || q.includes('fund') || q.includes('budget') || q.includes('money') || q.includes('seed')) {
      return 'The Ministry currently administers the Akwa Ibom Creative Economy Expansion Fund (Grants up to ₦5,000,000 per creative project). Registered artists, craftspeople from Raffia City Ikot Ekpene, and Ibomwood filmmakers can apply via the "Citizen Portal" -> "Apply for Grant" section.';
    }

    if (q.includes('ekpe') || q.includes('oron') || q.includes('raffia') || q.includes('ibeno') || q.includes('heritage') || q.includes('landmark')) {
      return 'Akwa Ibom State is rich in iconic cultural assets: Ekpe Sacred Heritage (ancient governance & Nsibidi symbolism), Ikot Ekpene Raffia City (craft weaving capital), Oron Maritime Museum (housing ancient Ekpu ancestral carvings), and Ibeno Beach. Check out our home page features to learn more!';
    }

    if (q.includes('durbar') || q.includes('festival') || q.includes('carnival') || q.includes('event')) {
      return 'Akwa Ibom State hosts vibrant cultural celebrations including the Akwa Ibom State Cultural Festival, Ekpe Masquerade displays, and Christmas Unplugged in Uyo. Check out our Home Page events calendar to register and book free digital tickets!';
    }

    if (q.includes('tender') || q.includes('procurement') || q.includes('bid')) {
      return 'The Procurement Portal lists open state bids. Opportunities include: "3D Virtual Archiving of Oron Maritime Museum Artifacts" with an ₦18.5M budget, and "Ikot Ekpene Raffia Craft Hub Expansion". Registered vendors can submit bids directly through the "Procurement" page.';
    }

    if (q.includes('museum') || q.includes('tour') || q.includes('bronze') || q.includes('sculpture')) {
      return 'Explore returned artifacts, ancient Ekpu ancestral carvings, Nok terracottas, and traditional art in our "Virtual Museum" page with 360° virtual tours!';
    }

    return 'Thank you for your message. For specialized inquiries, you can also submit a feedback ticket on the "Citizen Portal" -> "Complaints & Feedback" section, or file an official Freedom of Information (FOI) request. Our desk officers in Uyo will respond to you within 48 hours.';
  };

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim()) return;

    // Add user message
    const userMsg: Message = {
      sender: 'user',
      text: textToSend,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate bot typing
    setTimeout(() => {
      const responseText = getBotResponse(textToSend);
      const botMsg: Message = {
        sender: 'bot',
        text: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#C7A349] text-white shadow-2xl hover:bg-[#b08e3d] hover:scale-105 transition-all focus:outline-none"
          aria-label="Open AI Assistant"
        >
          <MessageSquare size={26} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[360px] sm:w-[400px] h-[500px] rounded-xl bg-white text-gray-800 shadow-2xl border border-[#C7A349]/40 flex flex-col overflow-hidden animate-slide-up">
          {/* Header */}
          <div className="bg-[#0B5E3C] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1 bg-[#C7A349]/20 rounded-lg text-[#C7A349]">
                <Sparkles size={18} />
              </div>
              <div>
                <h4 className="font-playfair text-sm font-bold">Heritage & Service AI</h4>
                <p className="text-[10px] text-green-300">Online & Ready to Assist</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto bg-[#FAF8F5] space-y-3">
            {messages.map((m, i) => (
              <div 
                key={i} 
                className={`flex gap-2.5 max-w-[85%] ${m.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
              >
                {/* Avatar */}
                <div className={`h-7 w-7 rounded-full flex items-center justify-center text-xs shrink-0 ${
                  m.sender === 'user' ? 'bg-[#C7A349] text-white' : 'bg-[#0B5E3C] text-white'
                }`}>
                  {m.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
                </div>
                {/* Bubble */}
                <div>
                  <div className={`p-3 rounded-lg text-xs leading-relaxed ${
                    m.sender === 'user' 
                      ? 'bg-[#C7A349] text-white rounded-tr-none' 
                      : 'bg-white text-gray-800 border border-gray-100 shadow-sm rounded-tl-none'
                  }`}>
                    {m.text}
                  </div>
                  <span className="text-[9px] text-gray-400 block mt-1 px-1">
                    {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5 max-w-[85%]">
                <div className="h-7 w-7 rounded-full bg-[#0B5E3C] text-white flex items-center justify-center shrink-0">
                  <Bot size={14} />
                </div>
                <div className="bg-white border border-gray-100 shadow-sm p-3 rounded-lg rounded-tl-none">
                  <div className="flex gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce"></span>
                    <span className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce delay-100"></span>
                    <span className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce delay-200"></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions Suggestions */}
          {messages.length === 1 && (
            <div className="p-3 bg-gray-50 border-t border-gray-100">
              <p className="text-[10px] font-semibold text-gray-400 mb-1.5 flex items-center gap-1">
                <HelpCircle size={10} /> Suggestions
              </p>
              <div className="flex flex-wrap gap-1.5">
                {quickQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(q)}
                    className="text-[10px] bg-white border border-gray-200 hover:border-[#C7A349] hover:bg-gray-50 text-gray-700 px-2 py-1 rounded-md transition-all text-left"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Form */}
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(input); }} 
            className="p-3 bg-white border-t border-gray-200 flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything..."
              className="flex-1 bg-gray-50 text-xs border border-gray-200 rounded px-3 py-2 focus:outline-none focus:border-[#C7A349]"
            />
            <button
              type="submit"
              className="bg-[#0B5E3C] text-white p-2 rounded hover:bg-[#073c26] transition-colors flex items-center justify-center shrink-0"
              aria-label="Send query"
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
