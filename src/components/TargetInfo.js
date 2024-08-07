'use client'

import { useState, useEffect } from 'react'
import { getPairList } from '@/actions/pair-actions'
const TargetInfo = () => {
  const [pairsTradeInfo, setPairsTradeInfo] = useState([])
  useEffect(() => {
    const interval = setInterval(() => {
      getPairList().then((exchangesBalance) => {
        setPairsTradeInfo(exchangesBalance.filter((key) => key.active))
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="card mb-4 w-80 bg-base-100 shadow-xl">
      <div className="card-body">
        <table className="table table-xs">
          <thead>
            <tr>
              <th>Coin Name </th>
              <th>Target </th>
              <th>Available</th>
            </tr>
          </thead>
          <tbody>
            {pairsTradeInfo.map((key, index) => (
              <tr
                key={index}
                className={
                  1.001 < key.target / key.amount ||
                  key.target / key.amount < 0.999
                    ? 'bg-red-200'
                    : 'bg-green-200'
                }>
                <th>{key.name}</th>
                <td>{key.target.toFixed(2)}</td>
                <td>{key.amount?.toFixed(2) || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TargetInfo
