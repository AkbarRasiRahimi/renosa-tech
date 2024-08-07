'use client'

import { useState, useEffect } from 'react'
import { ImConnection } from 'react-icons/im'
import { getMarketList } from '@/actions/market-actions'

const PairsBalance = ({ isConnected }) => {
  const [pairsTradeInfo, setPairsTradeInfo] = useState([])
  useEffect(() => {
   const interval = setInterval(() => {
      getMarketList().then((markets) => setPairsTradeInfo(markets))
    }, 200)

    return () => clearInterval(interval)
  }, [])


  return (
    <div className="card mb-4 w-full bg-base-100 shadow-xl">
      <div className="card-body">
        <table className="table table-xs w-full">
          <thead>
            <tr>
              <th>Pair</th>
              <th>Buy Exchange</th>
              <th>Buy Price </th>
              <th>Buy Amount</th>
              <th>Sell Exchange</th>
              <th>Sell Price </th>
              <th>Sell Amount</th>
              <th className="font-bold">%</th>
              <th> Amount</th>
            </tr>
          </thead>
          <tbody>
            {pairsTradeInfo.map((mainPair, index) => (
              <tr
                key={index}
                className={mainPair.percent > 0 ? 'bg-green-200' : ''}>
                <th>{mainPair.symbol}</th>
                <th>{mainPair.buyExchange.toUpperCase()}</th>
                <td>{mainPair.buyPrice}</td>
                <td>{mainPair.buyAmount.toFixed(2)}</td>
                <th>{mainPair.sellExchange.toUpperCase()}</th>
                <td>{mainPair.sellPrice}</td>
                <td>{mainPair.sellAmount.toFixed(2)}</td>
                <td
                  className={
                    mainPair.percent > 0
                      ? 'font-bold text-success'
                      : 'font-bold text-error'
                  }>
                  {mainPair.percent.toFixed(2)} %
                </td>
                <td
                  className={
                    mainPair.amount > 0
                      ? 'text-success'
                      : 'text-error'
                  }>
                  {mainPair.amount.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PairsBalance
