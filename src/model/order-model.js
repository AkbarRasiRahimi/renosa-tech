import mongoose from 'mongoose'

const orderDetailSchema = new mongoose.Schema({
  order_id: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  exchange: {
    type: String,
    required: true,
  },
  symbol: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  side: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    default: false,
  },
  amount: {
    type: Number,
    default: false,
  },
  filled: {
    type: Number,
    default: false,
  },
  remaining: {
    type: Number,
    default: false,
  },
  date_time: {
    type: Date,
    default: Date.now,
  },
  cost: {
    type: Number,
    default: 0,
  },
  fees: {
    type: Array,
    default: [],
  },
})

export const OrderDetail =
  mongoose.models.OrderDetail ||
  mongoose.model('OrderDetail', orderDetailSchema)
