'use server'
import { dbConnect } from '@/lib/mongo'
import { Setting } from '@/model/setting-model'

export const getSettings = async () => {
  await dbConnect()
  const setting = await Setting.findOne().lean()
  if (setting) {
    return {
      ...setting,
      _id: setting._id.toString(),
    }
  } else {
    const newSetting = new Setting({
      arbitrage: false,
      autoBalance: false,
      percentage: 0.5,
    })

    await newSetting.save()
    return {
      ...newSetting._doc,
      _id: newSetting._id.toString(),
    }
  }
}

export const updateSetting = async (settingData) => {
  await dbConnect()
  const setting = await Setting.findOne({ _id: settingData._id })
  setting.arbitrage = settingData.arbitrage
  setting.autoBalance = settingData.autoBalance
  setting.percentage = settingData.percentage
  setting.allDone = settingData.allDone
  setting.save()
}
