'use client'

import { useState, useEffect } from 'react'
import { getOrderList } from '@/actions/orders-actions'
import Link from 'next/link'

const ReportList = () => {
  const [Orders, setOrders] = useState([])
  useEffect(() => {
    getOrderList().then((orders) => setOrders(orders))
  }, [])

  if (!Orders || Orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-start bg-base-200">
        <div className="max-w-72 rounded-lg bg-base-100 p-10 text-center shadow-md">
          <h1 className="mb-6 text-2xl font-bold">No Orders</h1>
          <p className="mb-6 text-base-content">No any order yet </p>
          <Link href={'/dashboard'} className="btn btn-primary w-full">
            Main
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="card mb-4 w-full bg-base-100 shadow-xl">
      <div className="card-body">
        <table className="table table-xs w-full">
          <thead>
            <tr>
              <th>status</th>
              <th>exchange</th>
              <th>symbol</th>
              <th>type</th>
              <th>side</th>
              <th>price</th>
              <th>amount</th>
              <th>filled</th>
              <th>remaining</th>
              <th>date_time</th>
            </tr>
          </thead>
          <tbody>
            {Orders.map((Order, index) => (
              <tr key={index}>
                <th>{Order.status}</th>
                <th>{Order.exchange}</th>
                <td>{Order.symbol}</td>
                <td>{Order.type}</td>
                <th>{Order.side}</th>
                <td>{Order.price}</td>
                <td>{Order.amount}</td>
                <td>{Order.filled}</td>
                <td>{Order.remaining}</td>
                {/* <td>{ new Date(Order.date_time)}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ReportList
