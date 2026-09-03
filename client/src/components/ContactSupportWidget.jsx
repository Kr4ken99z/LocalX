import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  ShieldCheck,
  ChevronDown,
  Headphones,
  Zap,
} from 'lucide-react';

const QUICK_QUESTIONS = [
  'How do I book a specialist in Kolkata?',
  'What is Escrow Payment Protection?',
  'How do I register as a service specialist?',
  'What if a specialist is fully booked in Sept/Oct?',
];

const KNOWLEDGE_BASE = {
  book: 'To book a service, browse our **Explore Professionals** directory or search directly by category (e.g. Electrician, AC Repair, Plumbing). Select an open date and time slot, enter your Kolkata address, and confirm! If your preferred specialist is fully booked for September or October, you can switch to an available partner specialist in 1 click.',
  escrow: 'LocalX uses an **Escrow Protection System**. When you make a booking, your payment is held safely in escrow and is only released to the professional after you provide the 4-digit OTP upon successful job completion.',
  register: 'You can sign up as a service specialist by visiting our **Register** page and selecting "Service Specialist". Upload your Aadhaar / Govt ID and skills certifications in the Pro Verification portal to get your **Verified Master** badge.',
  busy: 'High-demand specialists are currently booked through September and October due to peak pre-festival rush. However, their calendar opens in **November 2026**, or you can immediately book an available partner specialist with open slots tomorrow!',
  contact: 'You can reach the LocalX executive support team 24/7 via email at **support@localx.app** or direct helpline at **+91 98765 43210**. Kolkata Operations Hub is located in Salt Lake Sector V.',
  pricing: 'Pricing on LocalX is 100% transparent. Consultations start at ₹249 for Electricians, ₹349 for Plumbers, and ₹549 for AC Jet Deep Cleaning. There are no hidden call-out fees.',
};

export default function ContactSupportWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: 'Hello! I am your LocalX AI Support Concierge. How can I assist you with booking a specialist or managing your account today?',
      time: 'Just now',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatBottomRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const generateReply = (query) => {
    const q = query.toLowerCase();
    if (q.includes('book') || q.includes('plumber') || q.includes('electrician') || q.includes('ac')) {
      return KNOWLEDGE_BASE.book;
    } else if (q.includes('escrow') || q.includes('pay') || q.includes('money') || q.includes('refund')) {
      return KNOWLEDGE_BASE.escrow;
    } else if (q.includes('register') || q.includes('partner') || q.includes('become') || q.includes('specialist')) {
      return KNOWLEDGE_BASE.register;
    } else if (q.includes('busy') || q.includes('september') || q.includes('october') || q.includes('november') || q.includes('available')) {
      return KNOWLEDGE_BASE.busy;
    } else if (q.includes('price') || q.includes('cost') || q.includes('charge') || q.includes('rate')) {
      return KNOWLEDGE_BASE.pricing;
    } else {
      return `Thank you for reaching out! Regarding "${query}": Our Kolkata support desk is actively monitoring all service requests. You can also contact our team directly at support@localx.app or call +91 98765 43210.`;
    }
  };

  const handleSend = (textToSend = null) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const aiReply = {
        id: Date.now() + 1,
        sender: 'ai',
        text: generateReply(text),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiReply]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <>
      {/* Floating Button: Positioned on LEFT bottom, slightly upper (bottom-24 left-6) */}
      <div className="fixed bottom-24 left-6 z-50 flex items-center">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Contact Us & AI Support"
            className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#0c1628]/95 border border-teal-500/40 text-white font-bold text-xs shadow-2xl hover:scale-105 hover:border-teal-400 transition-all duration-300 backdrop-blur-xl hover:shadow-teal-500/20"
          >
            <div className="relative">
              <div className="w-7 h-7 rounded-full bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-300">
                <Headphones className="w-4 h-4 text-teal-400" />
              </div>
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#0c1628] animate-pulse" />
            </div>

            <div className="flex flex-col text-left">
              <span className="text-white text-xs font-extrabold flex items-center gap-1">
                Contact Us
                <Sparkles className="w-3 h-3 text-amber-400" />
              </span>
              <span className="text-[10px] text-teal-400 font-semibold leading-none">
                AI Concierge 24/7
              </span>
            </div>
          </button>
        )}
      </div>

      {/* Support Window Popup */}
      {isOpen && (
        <div className="fixed bottom-24 left-6 z-50 w-[340px] sm:w-[390px] h-[520px] bg-[#091120] border border-teal-500/40 rounded-3xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="p-4 bg-[#0d1a30] border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-2xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-300">
                  <Bot className="w-5 h-5 text-teal-400" />
                </div>
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-[#0d1a30]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-extrabold text-white text-xs">LocalX AI Concierge</h3>
                  <span className="px-1.5 py-0.5 rounded text-[9px] bg-teal-500/20 text-teal-300 font-bold border border-teal-500/40">
                    Live
                  </span>
                </div>
                <p className="text-[10px] text-slate-400">Hyperlocal Support & Answers</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
              aria-label="Close Support Window"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'ai' && (
                  <div className="w-6 h-6 rounded-full bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-300 shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[82%] p-3 rounded-2xl text-xs leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-teal-500 text-slate-950 font-semibold rounded-tr-none'
                      : 'bg-[#101e35] text-slate-200 border border-slate-700/60 rounded-tl-none shadow-sm'
                  }`}
                >
                  <p className="whitespace-pre-line">{m.text}</p>
                  <span
                    className={`block text-[9px] mt-1 text-right ${
                      m.sender === 'user' ? 'text-teal-950/70' : 'text-slate-400'
                    }`}
                  >
                    {m.time}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-slate-400 text-xs italic pl-8">
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-bounce delay-100" />
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-bounce delay-200" />
                <span className="text-[11px] ml-1">AI Concierge is typing...</span>
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>

          {/* Quick Question Chips */}
          <div className="px-3 py-2 bg-[#0c1628] border-t border-slate-800/80 flex gap-1.5 overflow-x-auto no-scrollbar">
            {QUICK_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="px-2.5 py-1 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/70 text-[10px] text-teal-300 font-medium whitespace-nowrap shrink-0 transition"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-[#0d1a30] border-t border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask anything about LocalX..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-teal-400 transition"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-2.5 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold transition disabled:opacity-40"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
