import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../context/SocketContext';
import { Send, User, MessageSquare, ShieldCheck, Check, Clock } from 'lucide-react';

export default function ChatPage() {
  const { user } = useAuth();
  const { socket, onlineUsers } = useSocket();
  const [searchParams] = useSearchParams();

  const queryConvId = searchParams.get('convId');
  const targetUserId = searchParams.get('targetUserId');
  const targetName = searchParams.get('targetName');
  const bookingId = searchParams.get('bookingId');

  const [conversations, setConversations] = useState([]);
  const [activeConvId, setActiveConvId] = useState(queryConvId || null);
  const [activePartner, setActivePartner] = useState(
    targetUserId ? { _id: targetUserId, name: targetName || 'Specialist' } : null
  );
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Fetch conversations list
  const fetchConversations = async () => {
    try {
      const res = await axios.get('/api/conversations');
      if (res.data.success) {
        setConversations(res.data.data);
        if (!activeConvId && res.data.data.length > 0) {
          setActiveConvId(res.data.data[0].conversationId);
          setActivePartner(res.data.data[0].otherParticipant);
        }
      }
    } catch (err) {
      console.error('Fetch conversations error:', err);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  // Fetch messages when activeConvId changes
  useEffect(() => {
    if (!activeConvId) return;

    const fetchMessages = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/conversations/${activeConvId}/messages`);
        if (res.data.success) {
          setMessages(res.data.data);
        }
      } catch (err) {
        console.error('Fetch messages error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();

    // Join Socket room
    if (socket) {
      socket.emit('join_conversation', { conversationId: activeConvId });
    }

    return () => {
      if (socket) {
        socket.emit('leave_conversation', { conversationId: activeConvId });
      }
    };
  }, [activeConvId, socket]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Socket.IO message receiver
  useEffect(() => {
    if (!socket) return;

    const handleReceiveMessage = (msg) => {
      if (msg.conversationId === activeConvId) {
        setMessages((prev) => [...prev, msg]);
      }
      fetchConversations();
    };

    socket.on('receive_message', handleReceiveMessage);
    return () => {
      socket.off('receive_message', handleReceiveMessage);
    };
  }, [socket, activeConvId]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || !activeConvId || !activePartner) return;

    const msgText = inputMessage.trim();
    setInputMessage('');

    if (socket) {
      socket.emit('send_message', {
        conversationId: activeConvId,
        senderId: user.id,
        receiverId: activePartner._id,
        bookingId: bookingId || undefined,
        message: msgText,
      });
    } else {
      // Fallback via HTTP
      try {
        const res = await axios.post('/api/conversations/messages', {
          conversationId: activeConvId,
          receiverId: activePartner._id,
          bookingId: bookingId || undefined,
          message: msgText,
        });
        if (res.data.success) {
          setMessages((prev) => [...prev, res.data.data]);
        }
      } catch (err) {
        console.error('Failed to send message via HTTP:', err);
      }
    }
  };

  // If query gave us a new conversation not yet in list
  useEffect(() => {
    if (queryConvId && targetUserId) {
      setActiveConvId(queryConvId);
      setActivePartner({ _id: targetUserId, name: targetName || 'User' });
    }
  }, [queryConvId, targetUserId, targetName]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="glass-panel rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[600px] border border-slate-800">
        {/* Left: Conversations List */}
        <div className="md:col-span-4 border-b md:border-b-0 md:border-r border-slate-800 p-4 space-y-3 bg-slate-950/70">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
            <MessageSquare className="w-4 h-4 text-teal-400" />
            <h2 className="font-bold text-white text-sm">Direct Messages</h2>
          </div>

          <div className="space-y-2 overflow-y-auto max-h-[500px]">
            {conversations.length === 0 && !activePartner ? (
              <p className="text-xs text-slate-500 py-6 text-center italic">
                No active conversations yet. Click "Chat" from any booking or specialist profile to start!
              </p>
            ) : (
              conversations.map((conv) => {
                const isActive = conv.conversationId === activeConvId;
                const isOnline = onlineUsers.has(conv.otherParticipant?._id);
                return (
                  <div
                    key={conv.conversationId}
                    onClick={() => {
                      setActiveConvId(conv.conversationId);
                      setActivePartner(conv.otherParticipant);
                    }}
                    className={`p-3 rounded-2xl cursor-pointer transition flex items-center gap-3 ${
                      isActive
                        ? 'bg-teal-500/15 border border-teal-500/40 text-white'
                        : 'bg-slate-900/60 border border-slate-800/80 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="relative shrink-0">
                      <img
                        src={conv.otherParticipant?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'}
                        alt=""
                        className="w-10 h-10 rounded-xl object-cover"
                      />
                      {isOnline && (
                        <span className="w-2.5 h-2.5 rounded-full bg-teal-400 ring-2 ring-slate-950 absolute -bottom-0.5 -right-0.5"></span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0 text-xs">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="font-bold truncate">{conv.otherParticipant?.name}</span>
                        <span className="text-[10px] text-slate-500">
                          {new Date(conv.lastMessageAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 truncate">{conv.lastMessage}</p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right: Active Chat Room */}
        <div className="md:col-span-8 flex flex-col justify-between h-[600px] bg-slate-900/40">
          {activePartner ? (
            <>
              {/* Chat Room Header */}
              <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
                <div className="flex items-center gap-3">
                  <img
                    src={activePartner?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'}
                    alt=""
                    className="w-9 h-9 rounded-xl object-cover border border-teal-500/30"
                  />
                  <div>
                    <h3 className="font-bold text-white text-xs sm:text-sm">{activePartner?.name}</h3>
                    <span className="text-[10px] text-teal-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
                      {onlineUsers.has(activePartner?._id) ? 'Online' : 'Encrypted Socket Active'}
                    </span>
                  </div>
                </div>

                <span className="text-[10px] text-slate-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                  LocalX Protected Chat
                </span>
              </div>

              {/* Messages Feed */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3">
                {messages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center text-xs text-slate-500 space-y-2">
                    <MessageSquare className="w-8 h-8 text-slate-700" />
                    <p>No messages yet. Send a message to coordinate your service schedule!</p>
                  </div>
                ) : (
                  messages.map((msg, idx) => {
                    const isMe = msg.senderId?._id === user?.id || msg.senderId === user?.id;
                    return (
                      <div
                        key={idx}
                        className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                      >
                        <div
                          className={`max-w-md p-3 rounded-2xl text-xs leading-relaxed ${
                            isMe
                              ? 'bg-teal-500 text-slate-950 font-medium rounded-br-xs shadow-md'
                              : 'bg-slate-800 text-white rounded-bl-xs border border-slate-700'
                          }`}
                        >
                          <p>{msg.message}</p>
                        </div>
                        <span className="text-[10px] text-slate-500 mt-1 px-1">
                          {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Form */}
              <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-800 flex items-center gap-2 bg-slate-950/80">
                <input
                  type="text"
                  placeholder="Type your message here..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-teal-400"
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim()}
                  className="p-2.5 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold transition disabled:opacity-40"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center text-xs text-slate-500 space-y-3 p-8">
              <MessageSquare className="w-12 h-12 text-slate-700" />
              <h3 className="text-white font-bold text-sm">Select a Conversation</h3>
              <p className="max-w-xs">Choose an ongoing conversation from the left or launch chat directly from your bookings.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
