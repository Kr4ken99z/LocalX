const Message = require('../models/Message');

function initChatSocket(io) {
  const onlineUsers = new Map(); // userId -> socketId

  io.on('connection', (socket) => {
    console.log(`🔌 Socket connected: ${socket.id}`);

    // User online registration
    socket.on('register_user', (userId) => {
      if (userId) {
        onlineUsers.set(userId, socket.id);
        io.emit('user_status_change', { userId, status: 'online' });
      }
    });

    // Join conversation room
    socket.on('join_conversation', ({ conversationId }) => {
      socket.join(conversationId);
      console.log(`👥 Socket ${socket.id} joined conversation: ${conversationId}`);
    });

    // Leave conversation room
    socket.on('leave_conversation', ({ conversationId }) => {
      socket.leave(conversationId);
    });

    // Send real-time message
    socket.on('send_message', async (data) => {
      try {
        const { conversationId, senderId, receiverId, bookingId, message } = data;

        const newMsg = await Message.create({
          conversationId,
          senderId,
          receiverId,
          bookingId: bookingId || null,
          message,
        });

        const populatedMsg = await Message.findById(newMsg._id)
          .populate('senderId', 'name email avatar role')
          .populate('receiverId', 'name email avatar role');

        // Broadcast to all sockets in conversation room
        io.to(conversationId).emit('receive_message', populatedMsg);

        // Also notify receiver directly if online
        const receiverSocketId = onlineUsers.get(receiverId);
        if (receiverSocketId) {
          io.to(receiverSocketId).emit('new_message_notification', {
            conversationId,
            message: populatedMsg,
          });
        }
      } catch (err) {
        console.error('Socket send_message error:', err.message);
        socket.emit('error_message', { message: 'Failed to send message' });
      }
    });

    // Typing indicators
    socket.on('typing', ({ conversationId, userName }) => {
      socket.to(conversationId).emit('user_typing', { userName });
    });

    socket.on('stop_typing', ({ conversationId }) => {
      socket.to(conversationId).emit('user_stop_typing');
    });

    // Booking status event broadcast
    socket.on('booking_updated', (data) => {
      io.emit('booking_status_change', data);
    });

    socket.on('disconnect', () => {
      for (const [userId, sockId] of onlineUsers.entries()) {
        if (sockId === socket.id) {
          onlineUsers.delete(userId);
          io.emit('user_status_change', { userId, status: 'offline' });
          break;
        }
      }
      console.log(`🔌 Socket disconnected: ${socket.id}`);
    });
  });
}

module.exports = initChatSocket;
