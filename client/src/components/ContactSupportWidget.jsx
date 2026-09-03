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
  'What if a pro is booked in Sept/Oct?',
  'How do I register as a service specialist?',
  'What areas in Kolkata do you serve?',
];

// System Prompt for LocalX AI Concierge
const AI_CONCIERGE_SYSTEM_PROMPT = `
You are LocalX AI Concierge — the dedicated intelligent assistant for LocalX Hyperlocal Network in Kolkata.
Mission: Provide instant, reliable answers to Kolkata residents seeking verified electricians, AC mechanics, plumbers, carpenters, cleaners, painters, pest exterminators, and CCTV specialists.

Pillars:
1. Kolkata Neighborhoods: Salt Lake Sector V & III, New Town, Park Street, Ballygunge, Gariahat, Alipore, Behala, Dum Dum, Lake Gardens, Kankurgachi, Kasba, Tollygunge, Howrah.
2. Escrow Protection: Payments are held in secure escrow and disbursed only after job completion with customer OTP verification.
3. Multi-Month Scheduling: High-demand pros are booked for September & October 2026, with November open. Instant 1-click alternative pros are available tomorrow.
4. Support Hotline: support@localx.app | +91 98765 43210 (Salt Lake Sector V Operations Desk).
`;

const KNOWLEDGE_BASE = {
  system: `Hello! I am the **LocalX AI Concierge**, your official assistant for Kolkata's Hyperlocal Service Network.\n\nI can help you:\n• Find & book verified local specialists near your neighborhood\n• Explain our Escrow Payment Protection with 4-digit OTP\n• Switch to available partner pros if someone is booked in Sept/Oct\n• Guide you through specialist onboarding & verification\n• Assist with support inquiries (support@localx.app | +91 98765 43210)`,
  book: 'To book a service, visit our **Explore Directory** or search directly on the Home page (e.g. Electrician, AC Repair, Plumbing). Choose an available date and time slot, enter your Kolkata address, and confirm! If your favorite pro is booked through September/October, our 1-click Alternative Specialist switcher connects you with an open partner pro tomorrow!',
  escrow: 'LocalX uses **Escrow Payment Protection**. When you schedule a service, your payment is held safely in escrow. It is only released to the professional once they finish the work and you verify their 4-digit OTP completion code. If you are ever unsatisfied, our admin team steps in to order a free rework or refund.',
  register: 'To register as a service professional, visit our **Register** page and choose "Service Specialist". You can upload your Aadhaar / Govt ID and trade license in the Pro Verification portal to earn your **Verified Master** badge and start receiving neighborhood bookings.',
  busy: 'Due to the peak pre-festival rush in Kolkata, senior specialists are booked through **September and October 2026**. Their calendars reopen in **November 2026**, or you can immediately book an available partner specialist who has open morning and afternoon slots tomorrow!',
  locations: 'LocalX operates across **all major Kolkata zones** including Salt Lake (Sector V & III), New Town, Park Street, Ballygunge, Gariahat, Alipore, Behala, Dum Dum, Lake Gardens, Kankurgachi, Kasba, Tollygunge, and Howrah with live GPS dispatch.',
  pricing: 'Pricing is transparent with zero hidden fees:\n• Electricians: Starts at ₹249\n• Plumbers: Starts at ₹299\n• AC Jet Foam Servicing: Starts at ₹549\n• Full Home Deep Cleaning: Starts at ₹1,299\n• Carpentry & Locks: Starts at ₹449\n• Painting & Waterproofing: Starts at ₹1,299',
  contact: 'Our executive Kolkata support team is available 24/7:\n• **Email**: support@localx.app\n• **Helpline**: +91 98765 43210\n• **Operations Hub**: Salt Lake Sector V, Kolkata\n• **Admin Governance**: Monitored by Master Owner Koustav Mondal.',
};

// Formatter for bold text and list formatting in chat
const renderFormattedText = (text, isUser = false) => {
  if (!text) return null;

  const lines = text.split('\n');

  return (
    <div className="space-y-1.5">
      {lines.map((line, lineIdx) => {
        if (!line.trim()) return <div key={lineIdx} className="h-1" />;

        const isBullet = line.trim().startsWith('•') || line.trim().startsWith('-');
        const cleanLine = isBullet ? line.trim().replace(/^[•-]\s*/, '') : line;

        // Split by **bold text**
        const parts = cleanLine.split(/(\*\*[^*]+\*\*)/g);

        const renderedLine = parts.map((part, partIdx) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            const inner = part.slice(2, -2);
            return (
              <strong
                key={partIdx}
                className={isUser ? 'font-black text-black' : 'font-extrabold text-white tracking-wide'}
              >
                {inner}
              </strong>
            );
          }
          return <span key={partIdx}>{part}</span>;
        });

        if (isBullet) {
          return (
            <div key={lineIdx} className="flex items-start gap-1.5 pl-0.5 text-xs leading-relaxed">
              <span className={isUser ? 'text-black font-bold' : 'text-teal-400 font-bold'}>•</span>
              <div className="flex-1">{renderedLine}</div>
            </div>
          );
        }

        return (
          <p key={lineIdx} className="leading-relaxed">
            {renderedLine}
          </p>
        );
      })}
    </div>
  );
};

export default function ContactSupportWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: 'Hello! I am your LocalX AI Support Concierge. How can I assist you with finding a Kolkata specialist, checking open slots, or managing your account today?',
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
    if (q.includes('system') || q.includes('who are you') || q.includes('what can you do') || q.includes('prompt')) {
      return KNOWLEDGE_BASE.system;
    } else if (q.includes('area') || q.includes('zone') || q.includes('kolkata') || q.includes('salt lake') || q.includes('where')) {
      return KNOWLEDGE_BASE.locations;
    } else if (q.includes('book') || q.includes('electrician') || q.includes('plumber') || q.includes('ac') || q.includes('clean') || q.includes('carpenter') || q.includes('paint') || q.includes('pest') || q.includes('cctv')) {
      return KNOWLEDGE_BASE.book;
    } else if (q.includes('escrow') || q.includes('pay') || q.includes('money') || q.includes('refund') || q.includes('otp') || q.includes('safe')) {
      return KNOWLEDGE_BASE.escrow;
    } else if (q.includes('register') || q.includes('partner') || q.includes('become') || q.includes('pro') || q.includes('specialist')) {
      return KNOWLEDGE_BASE.register;
    } else if (q.includes('busy') || q.includes('september') || q.includes('october') || q.includes('november') || q.includes('slot') || q.includes('available')) {
      return KNOWLEDGE_BASE.busy;
    } else if (q.includes('price') || q.includes('cost') || q.includes('charge') || q.includes('rate') || q.includes('fee')) {
      return KNOWLEDGE_BASE.pricing;
    } else if (q.includes('contact') || q.includes('help') || q.includes('phone') || q.includes('email') || q.includes('call') || q.includes('support')) {
      return KNOWLEDGE_BASE.contact;
    } else {
      return `Thank you for asking! Regarding "${query}": As your LocalX AI Concierge, I am connected to all verified Kolkata specialists. You can explore categories from the navigation bar, or reach our direct operations desk at **support@localx.app** / **+91 98765 43210** anytime!`;
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
                  className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-teal-500 text-slate-950 font-semibold rounded-tr-none shadow-md'
                      : 'bg-[#101e35] text-slate-200 border border-slate-700/60 rounded-tl-none shadow-sm'
                  }`}
                >
                  {renderFormattedText(m.text, m.sender === 'user')}
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
