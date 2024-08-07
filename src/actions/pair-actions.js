'use server'

import { ERRORS, MESSAGES } from '@/enums/enums.js'
import { PairDetail } from '@/model/pair-model'
import { dbConnect } from '@/lib/mongo'
export const addNewPair = async (prevState, formData) => {
  const name = formData.name
  const target = +formData.target
  console.log(formData)
  let errors = {}
  let messages = {}

  if (typeof name !== 'string' || name.length < 3 || name.length > 255) {
    errors.name = ERRORS.INVALID_EXCHANGE_NAME
  }

  if (typeof target !== 'number' || target.length > 11) {
    errors.target = ERRORS.INVALID_BASE_URL
  }

  if (Object.keys(errors).length > 0) {
    return { errors }
  }

  const pair = new PairDetail({
    name,
    target,
  })

  await dbConnect()

  const existingPair = await PairDetail.findOne({
    name,
  })

  if (existingPair) {
    return { errors, messages: MESSAGES.EXCHANGE_EXISTS }
  }

  const res = await pair.save()

  if (!res) {
    return { errors, messages: MESSAGES.EXCHANGE_ADDED }
  }

  messages = MESSAGES.EXCHANGE_ADDED

  return { messages }
}

export const UpdatePair = async (prevState, formData) => {
  const name = formData.get('name')
  const target = +formData.get('target')

  let errors = {}
  let messages = {}

  if (typeof target !== 'number' || target.length > 11) {
    errors.target = ERRORS.INVALID_API_KEY
  }

  if (Object.keys(errors).length > 0) {
    return { errors }
  }
  await dbConnect()

  const existingPair = await PairDetail.findOne({
    name,
  })
  console.log(existingPair)
  if (!existingPair) {
    return { errors, messages: MESSAGES.EXCHANGE_NOT_FOUND }
  }

  existingPair.target = target

  const res = await existingPair.save()

  if (!res) {
    return { errors, messages: MESSAGES.EXCHANGE_ADDED }
  }

  messages = MESSAGES.EXCHANGE_ADDED

  return { messages }
}

export const getPairList = async () => {
  await dbConnect()
  const pairs = await PairDetail.find({}).lean()
  if (pairs) {
    return pairs.map((pair) => ({
      ...pair,
      _id: pair._id.toString(), // Convert _id to a string
    }))
  }
  return null
}

export const deletePair = async (id) => {
  await dbConnect()
  const res = await PairDetail.deleteOne({ _id: id })
  return res
}

export const activePair = async (id, active) => {
  await dbConnect()
  await PairDetail.findOneAndUpdate({ _id: id }, { active })
  
}
