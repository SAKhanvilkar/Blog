import { SignIn } from '@clerk/clerk-react'
import React from 'react'

export default function LoginPage() {
  return (
    <div className='flex items-center justify-center h-[calc(100vh-80px)]'>
      <SignIn signUpUrl="/register" />
    </div>
  )
}
