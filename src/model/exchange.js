import mongoose from 'mongoose'

const exchangesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!'],
  },
  free: {
    type: Number,
    required: true,
  },
  used: {
    type: Number,
    required: true,
    default: 0,
  },
  total: {
    type: Number,
    required: true,
    default: 0,
  },
})

export const Exchanges =
  mongoose.models.Exchanges || mongoose.model('Exchanges', exchangesSchema)
