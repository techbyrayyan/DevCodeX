import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
    },
    company: {
      type: String,
      trim: true,
      default: '',
    },
    service: {
      type: String,
      default: 'General Consultation',
    },
    budget: {
      type: String,
      default: 'Not specified',
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
    },
    whatsappSent: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      enum: ['New', 'Read', 'Replied', 'Closed'],
      default: 'New',
    },
  },
  {
    timestamps: true,
  }
);

const Contact =
  mongoose.models.Contact || mongoose.model('Contact', ContactSchema);

export default Contact;