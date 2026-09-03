const mongoose = require('mongoose');

const professionalSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    businessName: {
      type: String,
      required: [true, 'Business or display name is required'],
      trim: true,
    },
    tagline: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    experienceYears: {
      type: Number,
      default: 3,
    },
    skills: [
      {
        type: String,
      },
    ],
    // Services offered with custom pricing
    services: [
      {
        serviceId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Service',
        },
        name: String,
        slug: String,
        price: Number,
        priceType: {
          type: String,
          enum: ['fixed', 'hourly', 'starts_at'],
          default: 'starts_at',
        },
        description: String,
      },
    ],
    // GeoJSON Point location for 2dsphere geospatial search
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
        default: [77.6412, 12.9784], // Default: Indiranagar, Bengaluru
      },
      address: {
        type: String,
        default: 'Indiranagar, Bengaluru',
      },
      city: {
        type: String,
        default: 'Bengaluru',
      },
    },
    serviceRadius: {
      type: Number, // in kilometers
      default: 15,
    },
    verificationStatus: {
      type: String,
      enum: ['PENDING', 'VERIFIED', 'REJECTED', 'SUSPENDED'],
      default: 'PENDING',
    },
    verificationRemarks: {
      type: String,
      default: '',
    },
    documents: [
      {
        docType: {
          type: String,
          enum: ['gov_id', 'address_proof', 'trade_cert', 'police_clearance'],
        },
        title: String,
        fileUrl: String,
        uploadedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    rating: {
      type: Number,
      default: 4.8,
      min: 0,
      max: 5,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
    completedJobs: {
      type: Number,
      default: 0,
    },
    responseRate: {
      type: Number, // percentage (0 - 100)
      default: 98,
    },
    cancellationRate: {
      type: Number, // percentage (0 - 100)
      default: 2,
    },
    // Deterministic Trust Score (0 - 100)
    trustScore: {
      type: Number,
      default: 85,
    },
    trustTier: {
      type: String,
      enum: ['Elite Pro', 'Verified Master', 'Rising Pro', 'Newcomer'],
      default: 'Rising Pro',
    },
    availability: {
      isAvailable: {
        type: Boolean,
        default: true,
      },
      workingHours: {
        type: String,
        default: '08:00 AM - 08:00 PM',
      },
      days: {
        type: [String],
        default: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      },
    },
    portfolio: [
      {
        title: String,
        imageUrl: String,
      },
    ],
  },
  { timestamps: true }
);

// 2dsphere index for MongoDB geospatial queries
professionalSchema.index({ location: '2dsphere' });
professionalSchema.index({ rating: -1 });
professionalSchema.index({ trustScore: -1 });
professionalSchema.index({ verificationStatus: 1 });

module.exports = mongoose.model('Professional', professionalSchema);
