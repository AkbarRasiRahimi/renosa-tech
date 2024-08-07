'use client'
import { VscDebugStart } from 'react-icons/vsc'
import { FcFlashAuto } from 'react-icons/fc'
import { FiPause } from 'react-icons/fi'
import { useEffect, useState } from 'react'
import { updateSetting, getSettings } from '@/actions/setting-actions'
import infinity from '../assets/image/infinity.gif'
import Image from 'next/image'
const SettingPanel = ({ user }) => {
  const [setting, setSetting] = useState()

  const arbitrageClickHandler = () => {
    if (setting.arbitrage) {
      updateData({ arbitrage: false })
    } else {
      updateData({ arbitrage: true })
    }
  }

  const autoBalanceClickHandler = () => {
    if (setting.autoBalance) {
      updateData({ autoBalance: false })
    } else {
      updateData({ autoBalance: true })
    }
  }

  const percentageChangeHandler = (event) => {
    updateData({ percentage: event.target.value })
  }

  useEffect(() => {
    const interval = setInterval(() => {
      getSettings().then((settingData) => {
        if (!settingData) {
          throw new Error('Network setting was not ok')
        }
        //console.log(settingData)
        setSetting(settingData)
        if (settingData.allDone) {
          clearInterval(interval)
        }
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  async function updateData(updatedSetting) {
    try {
      const newSetting = { ...setting, ...updatedSetting }
      updateSetting(newSetting).then(() => setSetting(newSetting))
    } catch (error) {
      throw new Error('Network setting was not ok')
    }
  }

  if (user && user.roles && !user.roles.includes('admin')) return null

  return (
    <div className="flex items-center justify-end gap-6">
      {setting && setting.allDone ? (
        <>
          {setting.arbitrage && (
            <Image
              src={infinity}
              alt="process"
              priority
              width={30}
              height={30}
              className="rounded-full border-[1px] border-gray-400 p-[2px]"
            />
          )}
          <button
            onClick={arbitrageClickHandler}
            className={`${setting.arbitrage ? 'bg-green-600 text-white hover:bg-red-700' : 'bg-base-100 hover:bg-base-300'} flex h-7 w-7 items-center justify-center rounded-full p-1 hover:cursor-pointer hover:bg-slate-300`}>
            {setting.arbitrage ? <FiPause /> : <VscDebugStart />}
          </button>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text flex items-center justify-center text-xs">
                <FcFlashAuto />
                Auto Balance
              </span>
              <input
                type="checkbox"
                className="toggle toggle-primary ml-2"
                onChange={autoBalanceClickHandler}
                checked={setting.autoBalance}
              />
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="0.5"
              className="input input-bordered h-7 w-1/4 max-w-xs"
              defaultValue={setting.percentage}
              onChange={percentageChangeHandler}
            />
            <h2 className="ml-4 text-xs font-semibold">% Arbi Prec</h2>
          </div>
          <div className="drawer-side h-fit rounded-md">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"></label>
          </div>
        </>
      ) : (
        <div className="w-full text-center">
          <span className="loading loading-bars loading-sm"></span>
        </div>
      )}
    </div>
  )
}

export default SettingPanel
