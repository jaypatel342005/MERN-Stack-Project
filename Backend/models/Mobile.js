const mongoose = require('mongoose');

const MobileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, default: 'No description available' },
  releaseDate: { type: Date, required: true },

  specifications: {
    display: {
      size: { type: String, required: true },
      type: { type: String, required: true },
      resolution: { type: String, required: true }
    },
    chipset: { type: { type: String, required: true }, cores: { type: Number, required: true } },
    memory: {
      ram: { type: String, required: true },
      storage: { type: String, required: true },
      expandable: { type: Boolean, default: false }
    },
    camera: {
      front: { type: String, required: true },
      rear: {
        main: { type: String, required: true },
        ultrawide: { type: String },
        telephoto: { type: String },
        other: [String]
      },
      video: { type: String, required: true }
    },
    battery: { capacity: { type: String, required: true }, fastCharging: { type: Boolean, default: false }, wirelessCharging: { type: Boolean, default: false } },
    os: { type: String, required: true },
    sim: { type: String, required: true },
    connectivity: {
      network: [String],
      wifi: { type: String, required: true },
      bluetooth: { type: String, required: true },
      gps: { type: String, required: true },
      nfc: { type: Boolean, default: false }
    }
  },

  features: {
    waterproof: { type: Boolean, default: false },
    fingerprintSensor: { type: Boolean, default: false },
    faceRecognition: { type: Boolean, default: false },
    stereoSpeakers: { type: Boolean, default: false },
    otherFeatures: [String]
  },

  dimensions: {
    height: { type: String, required: true },
    width: { type: String, required: true },
    thickness: { type: String, required: true },
    weight: { type: String, required: true }
  },
  colorOptions: [String],
  ratings: { averageRating: { type: Number, default: 0 }, numberOfReviews: { type: Number, default: 0 } },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Mobile', MobileSchema);
