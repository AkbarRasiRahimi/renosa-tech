'use server'

import { ERRORS, MESSAGES } from '@/enums/enums.js'
import { ExchangeDetail } from '@/model/exchange-model'
import { dbConnect } from '@/lib/mongo'
export const addNewExchange = async (prevState, formData) => {
  const name = formData.name
  const baseUrl = formData.baseUrl
  const api_key = formData.api_key
  const secret_key = formData.secret_key
  const password = formData.password

  let errors = {}
  let messages = {}

  if (typeof name !== 'string' || name.length < 3 || name.length > 255) {
    errors.name = ERRORS.INVALID_EXCHANGE_NAME
  }

  if (
    typeof baseUrl !== 'string' ||
    baseUrl.length < 3 ||
    baseUrl.length > 255
  ) {
    errors.baseUrl = ERRORS.INVALID_BASE_URL
  }

  if (
    typeof api_key !== 'string' ||
    api_key.length < 3 ||
    api_key.length > 255
  ) {
    errors.api_key = ERRORS.INVALID_API_KEY
  }

  if (
    typeof secret_key !== 'string' ||
    secret_key.length < 3 ||
    secret_key.length > 255
  ) {
    errors.secret_key = ERRORS.INVALID_SECRET_KEY
  }

  if (Object.keys(errors).length > 0) {
    return { errors }
  }

  const exchange = new ExchangeDetail({
    name,
    baseUrl,
    api_key,
    secret_key,
    password,
  })

  await dbConnect()

  const existingExchange = await ExchangeDetail.findOne({
    name,
  })

  if (existingExchange) {
    return { errors, messages: MESSAGES.EXCHANGE_EXISTS }
  }

  const res = await exchange.save()

  if (!res) {
    return { errors, messages: MESSAGES.EXCHANGE_ADDED }
  }

  messages = MESSAGES.EXCHANGE_ADDED

  return { messages }
}

export const UpdateExchange = async (prevState, formData) => {
  const name = formData.get('name')
  const baseUrl = formData.get('baseUrl')
  const api_key = formData.get('api_key')
  const secret_key = formData.get('secret_key')
  const password = formData.get('password')

  let errors = {}
  let messages = {}

  if (
    typeof baseUrl !== 'string' ||
    baseUrl.length < 3 ||
    baseUrl.length > 255
  ) {
    errors.baseUrl = ERRORS.INVALID_BASE_URL
  }

  if (
    typeof api_key !== 'string' ||
    api_key.length < 3 ||
    api_key.length > 255
  ) {
    errors.api_key = ERRORS.INVALID_API_KEY
  }

  if (
    typeof secret_key !== 'string' ||
    secret_key.length < 3 ||
    secret_key.length > 255
  ) {
    errors.secret_key = ERRORS.INVALID_SECRET_KEY
  }

  if (Object.keys(errors).length > 0) {
    return { errors }
  }
  await dbConnect()

  const existingExchange = await ExchangeDetail.findOne({
    name,
  })
  console.log(existingExchange)
  if (!existingExchange) {
    return { errors, messages: MESSAGES.EXCHANGE_NOT_FOUND }
  }

  existingExchange.baseUrl = baseUrl
  existingExchange.api_key = api_key
  existingExchange.secret_key = secret_key
  existingExchange.password = password

  const res = await existingExchange.save()

  if (!res) {
    return { errors, messages: MESSAGES.EXCHANGE_ADDED }
  }

  messages = MESSAGES.EXCHANGE_ADDED

  return { messages }
}

export const getExchangeList = async () => {
  await dbConnect()
  const exchanges = await ExchangeDetail.find({}).lean()
  if (exchanges) {
    return exchanges.map((exchange) => ({
      ...exchange,
      _id: exchange._id.toString(), // Convert _id to a string
    }))
  }
  return null
}

export const deleteExchange = async (id) => {
  await dbConnect()
  const res = await ExchangeDetail.deleteOne({ _id: id })
  return res
}

export const activeExchange = async (id, active) => {
  await dbConnect()
  await ExchangeDetail.findOneAndUpdate({ _id: id }, { active })

  await fetch(`${process.env.NEXT_PUBLIC_URL}/reset-ws`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
