'use client'
import { useEffect, useState } from 'react'
import ExchangesTable from '@/components/ExchangesTable'
import { IoLogoUsd } from 'react-icons/io5'
import { getExchangesBalance } from '@/actions/usdt-actions'

const UsdtBalance = () => {
  const [exchangesInfo, setExchangesInfo] = useState([])

  useEffect(() => {
    const interval = setInterval(() => {
      getExchangesBalance().then((exchangesBalance) => {
        setExchangesInfo(exchangesBalance)
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="card w-80 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">
          <IoLogoUsd />
          Usd Information
        </h2>
        <div className="w-full rounded bg-blue-300 p-2">
          <ExchangesTable exchangesInfo={exchangesInfo} />
        </div>
        <div
          className={`card-actions justify-end font-semibold text-green-700`}>
          Total USDT :{' '}
          {exchangesInfo.reduce((a, b) => a + b.total, 0).toFixed(2)}
        </div>
      </div>
    </div>
  )
}

export default UsdtBalance
