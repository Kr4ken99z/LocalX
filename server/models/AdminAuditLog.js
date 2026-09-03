const mongoose = require('mongoose');

const adminAuditLogSchema = new mongoose.Schema(
  {
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    adminEmail: {
      type: String,
      default: '',
    },
    action: {
      type: String,
      required: true,
      enum: [
        'APPROVE_PROFESSIONAL',
        'REJECT_PROFESSIONAL',
        'SUSPEND_PROFESSIONAL',
        'REACTIVATE_PROFESSIONAL',
        'SUSPEND_USER',
        'REACTIVATE_USER',
        'RESOLVE_DISPUTE',
        'REJECT_DISPUTE',
        'CREATE_CATEGORY',
        'UPDATE_CATEGORY',
        'DELETE_REVIEW',
        'SYSTEM_UPDATE',
      ],
    },
    targetType: {
      type: String,
      required: true,
      enum: ['Professional', 'User', 'Dispute', 'Review', 'Service', 'Booking'],
    },
    targetId: {
      type: String,
      required: true,
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('AdminAuditLog', adminAuditLogSchema);
