import mongoose from 'mongoose'

const settingSchema = new mongoose.Schema({
  arbitrage: {
    type: Boolean,
    required: true,
    default: false,
  },
  autoBalance: {
    type: Boolean,
    required: true,
    default: false,
  },
  percentage: {
    type: Number,
    required: true,
  },
  allDone: {
    type: Boolean,
    required: true,
    default: false,
  },
})

export const Setting =
  mongoose.models.Setting || mongoose.model('Setting', settingSchema)
