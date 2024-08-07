import mongoose from 'mongoose'

const logMessageSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
})

export const LogMessage =
  mongoose.models.LogMessage || mongoose.model('LogMessage', logMessageSchema)
