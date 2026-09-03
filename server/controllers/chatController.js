const Message = require('../models/Message');
const User = require('../models/User');
const Booking = require('../models/Booking');

// @desc    Get all conversations for logged in user
// @route   GET /api/conversations
exports.getConversations = async (req, res) => {
  try {
    const userId = req.user._id;

    // Find distinct conversations involving this user
    const messages = await Message.find({
      $or: [{ senderId: userId }, { receiverId: userId }],
    })
      .populate('senderId', 'name email avatar role')
      .populate('receiverId', 'name email avatar role')
      .populate('bookingId', 'bookingNumber serviceName status')
      .sort({ createdAt: -1 });

    const conversationsMap = {};
    messages.forEach((msg) => {
      if (!conversationsMap[msg.conversationId]) {
        const otherParticipant =
          msg.senderId._id.toString() === userId.toString()
            ? msg.receiverId
            : msg.senderId;

        conversationsMap[msg.conversationId] = {
          conversationId: msg.conversationId,
          otherParticipant,
          booking: msg.bookingId,
          lastMessage: msg.message,
          lastMessageAt: msg.createdAt,
          unreadCount: (!msg.isRead && msg.receiverId._id.toString() === userId.toString()) ? 1 : 0,
        };
      }
    });

    res.status(200).json({
      success: true,
      data: Object.values(conversationsMap),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get messages for a conversation
// @route   GET /api/conversations/:id/messages
exports.getMessages = async (req, res) => {
  try {
    const { id } = req.params; // conversationId
    const messages = await Message.find({ conversationId: id })
      .populate('senderId', 'name email avatar role')
      .populate('receiverId', 'name email avatar role')
      .sort({ createdAt: 1 });

    // Mark unread messages as read
    await Message.updateMany(
      { conversationId: id, receiverId: req.user._id, isRead: false },
      { isRead: true }
    );

    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Send a message via HTTP (fallback/REST)
// @route   POST /api/conversations/messages
exports.sendMessage = async (req, res) => {
  try {
    const { conversationId, receiverId, bookingId, message } = req.body;

    if (!conversationId || !receiverId || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide conversationId, receiverId, and message',
      });
    }

    const newMsg = await Message.create({
      conversationId,
      senderId: req.user._id,
      receiverId,
      bookingId: bookingId || null,
      message,
    });

    const populatedMsg = await Message.findById(newMsg._id)
      .populate('senderId', 'name email avatar role')
      .populate('receiverId', 'name email avatar role');

    res.status(201).json({
      success: true,
      data: populatedMsg,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
