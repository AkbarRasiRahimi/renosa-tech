'use server'
import { dbConnect } from '@/lib/mongo'
import { Exchanges } from '@/model/exchange'

export const getExchangesBalance = async () => {
  await dbConnect()

  const exchangesBalance = await Exchanges.find({}).lean()
  if (exchangesBalance) {
    return exchangesBalance.map((exchanges) => ({
      ...exchanges,
      _id: exchanges._id.toString(),
    }))
  }
  return null
}
