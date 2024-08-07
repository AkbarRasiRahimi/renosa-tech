'use client'

import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'

import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getProfile } from '@/actions/profile-actions'
import { HiOutlineLogout } from 'react-icons/hi'
import SettingPanel from './SettingPanel'
const NavBar = () => {
  const { data: session, status } = useSession()
  if (status !== 'authenticated') {
    redirect('/')
  }

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

  const signOutHandler = () => {
    signOut()
  }



  return (
    <div className="fixed top-0 z-10 flex h-12 w-screen items-center justify-center border-b-[1px] border-slate-300 bg-slate-200 hover:bg-slate-100">
      <div className="w-full flex-1 justify-center items-center">
        
        <SettingPanel user={user} />
      </div>
      <div className="hidden flex-none lg:block">
        <ul className="menu-horizontal flex items-center justify-around gap-2 pr-2">
          <li></li>
          <li>
            <button
              onClick={signOutHandler}
              className="rounded-full p-1 hover:cursor-pointer hover:bg-slate-300">
              <HiOutlineLogout size={20} />
            </button>
          </li>
          <li>
            {user && user.photoURL && (
              <div className="rounded-full p-1 hover:cursor-pointer hover:bg-slate-300">
                <Image
                  src={user.photoURL}
                  alt="avatar"
                  priority
                  width={30}
                  height={30}
                  className="rounded-full border-[1px] border-gray-400 p-[2px]"
                />
              </div>
            )}
          </li>
        </ul>
      </div>
    </div>
  )
}

export default NavBar
