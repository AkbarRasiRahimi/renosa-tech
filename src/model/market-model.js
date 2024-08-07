import mongoose from 'mongoose'

const marketSchema = new mongoose.Schema({
  symbol: String,
  buyExchange: String,
  sellExchange: String,
  buyPrice: Number,
  buyAmount: Number,
  sellPrice: Number,
  sellAmount: Number,
  percent: Number,
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
})

export const Market =
  mongoose.models.Market || mongoose.model('Market', marketSchema)
