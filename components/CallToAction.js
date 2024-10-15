'use client'
import Link from 'next/link'
import React from 'react'
import ButtonComponent from './ButtonComponent'
import { useAuth } from '@/context/authContext'

export default function CallToAction() {
  const { currentUser } = useAuth()

  if (currentUser) {
    return (
      <div className='max-w-[600px] mx-auto w-full'>
        <Link href='/dashboard'>
          <ButtonComponent dark full text="Go to dashboard"></ButtonComponent>
        </Link>
      </div>
    )
  }

  return (
    <div className='grid grid-cols-2 gap-4 w-fit mx-auto'>
        <Link href='/dashboard'>
          <ButtonComponent text="Sign Up"></ButtonComponent>
        </Link>
        <Link href='/dashboard'>
          <ButtonComponent text="Login" dark></ButtonComponent>
        </Link>
      </div>
  )
}
