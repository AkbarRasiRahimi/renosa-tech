'use server'

import { LogMessage } from '@/model/log-message-model'
import { dbConnect } from '@/lib/mongo'

export const getLogMessageList = async (limit) => {
  await dbConnect()
  const messages = await LogMessage.find({})
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean()
  if (messages) {
    return messages.map((message) => ({
      ...message,
      _id: message._id.toString(),
    })).reverse()
  }
  return null
}
