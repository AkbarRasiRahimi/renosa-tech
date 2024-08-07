'use client'

import { signIn } from 'next-auth/react'

import { SiApple, SiFacebook, SiGoogle } from 'react-icons/si'

export default function SocialSignIn() {
  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/' })
  }

  const handleAppleSignIn = () => {
    signIn('apple', { callbackUrl: '/' })
  }

  const handleFacebookSignIn = () => {
    signIn('facebook', { callbackUrl: '/' })
  }

  return (
    <div className="flex justify-center gap-4">
      <button
        type="button"
        onClick={handleGoogleSignIn}
        className="flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white p-4 px-4 text-gray-700 shadow-sm hover:bg-gray-50">
        <SiGoogle className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={handleAppleSignIn}
        className="flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm hover:bg-gray-50">
        <SiApple className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={handleFacebookSignIn}
        className="flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm hover:bg-gray-50">
        <SiFacebook className="h-5 w-5" />
      </button>
    </div>
  )
}
