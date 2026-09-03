const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    bookingNumber: {
      type: String,
      unique: true,
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
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
      required: true,
    },
    serviceName: {
      type: String,
      required: true,
    },
    scheduledDate: {
      type: String, // e.g. "2026-09-10"
      required: true,
    },
    scheduledTime: {
      type: String, // e.g. "10:00 AM - 12:00 PM"
      required: true,
    },
    address: {
      addressLine: { type: String, required: true },
      city: { type: String, default: 'Bengaluru' },
      area: { type: String, default: '' },
      landmark: { type: String, default: '' },
      pincode: { type: String, default: '' },
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: [
        'PENDING',
        'ACCEPTED',
        'REJECTED',
        'ON_THE_WAY',
        'IN_PROGRESS',
        'COMPLETED',
        'CANCELLED',
      ],
      default: 'PENDING',
    },
    notes: {
      type: String,
      default: '',
    },
    statusHistory: [
      {
        status: String,
        updatedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        comment: String,
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    hasReview: {
      type: Boolean,
      default: false,
    },
    hasDispute: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Auto-generate booking number
bookingSchema.pre('save', function (next) {
  if (!this.bookingNumber) {
    this.bookingNumber = 'LX-' + Math.floor(100000 + Math.random() * 900000);
  }
  next();
});

module.exports = mongoose.model('Booking', bookingSchema);
