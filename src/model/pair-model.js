import mongoose from 'mongoose'

const pairDetailSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  target: {
    type: Number,
  },
  amount: {
    type: Number,
  },
  active: {
    type: Boolean,
    default: false,
  },
})

export const PairDetail =
  mongoose.models.PairDetail || mongoose.model('PairDetail', pairDetailSchema)
