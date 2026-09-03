const mongoose = require('mongoose');

const disputeSchema = new mongoose.Schema(
  {
    disputeNumber: {
      type: String,
      unique: true,
    },
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking',
      required: true,
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    professionalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Professional',
      required: true,
    },
    reason: {
      type: String,
      required: true,
      enum: [
        'Service Not Completed',
        'Poor Work Quality',
        'Overcharging / Pricing Issue',
        'Professional Did Not Arrive',
        'Damaged Property',
        'Unprofessional Behavior',
        'Other',
      ],
    },
    description: {
      type: String,
      required: true,
    },
    evidence: [
      {
        title: String,
        url: String,
      },
    ],
    status: {
      type: String,
      enum: ['OPEN', 'UNDER_REVIEW', 'RESOLVED', 'REJECTED'],
      default: 'OPEN',
    },
    resolution: {
      adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      actionTaken: String,
      notes: String,
      resolvedAt: Date,
    },
  },
  { timestamps: true }
);

disputeSchema.pre('save', function (next) {
  if (!this.disputeNumber) {
    this.disputeNumber = 'DSP-' + Math.floor(1000 + Math.random() * 9000);
  }
  next();
});

module.exports = mongoose.model('Dispute', disputeSchema);
