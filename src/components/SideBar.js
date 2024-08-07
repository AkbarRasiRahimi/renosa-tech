'use client'

import { useState, useEffect } from 'react'
import iconImage from '../app/icon.png'
import Image from 'next/image'
import { getProfile } from '@/actions/profile-actions'
import { IoCalendarOutline } from 'react-icons/io5'
import { useSession } from 'next-auth/react'
import { IoSettingsOutline } from 'react-icons/io5'
import { GiSettingsKnobs } from 'react-icons/gi'
import { RiHome6Line } from 'react-icons/ri'
import { TbReportAnalytics } from 'react-icons/tb'
import Link from 'next/link'
const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { data: session, status } = useSession()

  const userEmail = session?.user?.email
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (!userEmail) return
    getProfile(userEmail).then((profile) =>
      setUser({
        displayName: profile?.displayName || '',
        email: profile?.email || '',
        photoURL: profile?.photoURL || '',
        roles: profile?.roles || [],
      })
    )
  }, [userEmail])

  const handleMouseOver = () => {
    setIsOpen(true)
  }
  const handleMouseLeave = () => {
    setIsOpen(false)
  }
  return (
    <div
      className={`fixed left-0 h-screen ${
        isOpen ? 'w-32' : 'w-12'
      } z-20 border-r-[1px] border-slate-300 bg-slate-200 transition-all duration-300 ease-in-out hover:bg-slate-100`}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}>
      <ul className="relative flex flex-col items-start justify-center gap-0">
        <div className="obsolute right-0 ml-1 flex h-12 w-full items-center justify-start border-b-[1px] border-slate-300 text-xs">
          <Image
            src={iconImage}
            alt="icon"
            width={40}
            height={40}
            priority
            className="z-30"
          />
          <span
            className={`text-md text-xs font-bold duration-300 ${
              isOpen
                ? 'ml-2 translate-x-0 opacity-100'
                : 'w-0 translate-x-[-20px] opacity-0'
            }`}>
            Profi
          </span>
        </div>
        {user && user.roles && !user.roles.includes('admin') ? null : (
          <>
            {' '}
            <li className="w-full">
              <Link
                href="/dashboard"
                className={`mx-2 mt-2 flex w-auto items-center rounded-lg border-[1px] border-slate-300 bg-white px-1 py-1 hover:cursor-pointer hover:bg-slate-100`}>
                <span className="h-30 w-30 z-20 bg-white">
                  <RiHome6Line size={20} />
                </span>
                <span
                  className={`text-xs ${
                    isOpen
                      ? 'ml-2 translate-x-0 opacity-100 duration-500'
                      : 'w-0 translate-x-[-20px] opacity-0'
                  }`}>
                  Dashboard
                </span>
              </Link>
            </li>
            <li className="w-full">
              <Link
                href="/dashboard/pairs"
                className={`mx-2 mt-2 flex w-auto items-center rounded-lg border-[1px] border-slate-300 bg-white px-1 py-1 hover:cursor-pointer hover:bg-slate-100`}>
                <span className="h-30 w-30 z-20 bg-white">
                  <IoCalendarOutline size={20} />
                </span>
                <span
                  className={`text-xs ${
                    isOpen
                      ? 'ml-2 translate-x-0 opacity-100 duration-500'
                      : 'w-0 translate-x-[-20px] opacity-0'
                  }`}>
                  Pairs
                </span>
              </Link>
            </li>
            <li className="w-full">
              <Link
                href="/dashboard/exchanges"
                className={`mx-2 mt-2 flex w-auto items-center rounded-lg border-[1px] border-slate-300 bg-white px-1 py-1 hover:cursor-pointer hover:bg-slate-100`}>
                <span className="h-30 w-30 z-20 bg-white">
                  <GiSettingsKnobs size={20} />
                </span>
                <span
                  className={`text-xs ${
                    isOpen
                      ? 'ml-2 translate-x-0 opacity-100 duration-500'
                      : 'w-0 translate-x-[-20px] opacity-0'
                  }`}>
                  Exchanges
                </span>
              </Link>
            </li>
            <li className="w-full">
              <Link
                href="/dashboard/reports"
                className={`mx-2 mt-2 flex w-auto items-center rounded-lg border-[1px] border-slate-300 bg-white px-1 py-1 hover:cursor-pointer hover:bg-slate-100`}>
                <span className="h-30 w-30 z-20 bg-white">
                  <TbReportAnalytics size={20} />
                </span>
                <span
                  className={`text-xs ${
                    isOpen
                      ? 'ml-2 translate-x-0 opacity-100 duration-500'
                      : 'w-0 translate-x-[-20px] opacity-0'
                  }`}>
                  Reports
                </span>
              </Link>
            </li>
          </>
        )}
        <li className="w-full">
          <Link
            href="/dashboard/setting"
            className={`mx-2 mt-2 flex w-auto items-center rounded-lg border-[1px] border-slate-300 bg-white px-1 py-1 hover:cursor-pointer hover:bg-slate-100`}>
            <span className="h-30 w-30 z-20 bg-white">
              <IoSettingsOutline size={20} />
            </span>
            <span
              className={`text-xs ${
                isOpen
                  ? 'ml-2 translate-x-0 opacity-100 duration-500'
                  : 'w-0 translate-x-[-20px] opacity-0'
              }`}>
              Setting
            </span>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default SideBar
