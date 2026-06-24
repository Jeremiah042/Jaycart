
import { SignInButton } from '@clerk/nextjs'
import React from 'react'


const SignIn = () => {
  return (
    <SignInButton mode="modal">
      <button className='text-sm font font-
     hover:bg-green-500 text-black hover: cursor-pointer hoverEffect'>Login</button>
    </SignInButton>
  )
}

export default SignIn