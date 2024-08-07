'use server'

import { OrderDetail } from '@/model/order-model'
import { dbConnect } from '@/lib/mongo'

export const getOrderList = async () => {
  await dbConnect()
  const orders = await OrderDetail.find({}).lean()
  if (orders) {
    return orders.map((order) => ({
      ...order,
      _id: order._id.toString(),
    }))
  }
  return null
}
