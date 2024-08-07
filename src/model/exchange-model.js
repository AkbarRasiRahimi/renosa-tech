import mongoose from 'mongoose'

const exchangeDetailSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  baseUrl: {
    type: String,
    required: true,
  },
  api_key: {
    type: String,
    required: true,
  },
  secret_key: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  active: {
    type: Boolean,
    default: false,
  },
})

export const ExchangeDetail =
  mongoose.models.ExchangeDetail ||
  mongoose.model('ExchangeDetail', exchangeDetailSchema)
