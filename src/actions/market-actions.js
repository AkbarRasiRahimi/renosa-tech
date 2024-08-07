'use server'

import { Market } from '@/model/market-model'
import { dbConnect } from '@/lib/mongo'

export const getMarketList = async () => {
  await dbConnect()
  const markets = await Market.find({}).lean()
  if (markets) {
    return markets.map((market) => ({
      ...market,
      _id: market._id.toString(),
    }))
  }
  return null
}
