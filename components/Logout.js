'use client'
import React from 'react'
import ButtonComponent from './ButtonComponent'
import { useAuth } from '@/context/authContext'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function Logout() {
  const { logout, currentUser } = useAuth()
  const pathname = usePathname()
  // console.log(pathname)
  if (!currentUser) {
    return null
  }

  if (pathname === '/') {
    return (
      <Link href='/dashboard'>
        <ButtonComponent text='Go To Dashboard'></ButtonComponent>
      </Link>
    )
  }
  return (
    <ButtonComponent text='Logout' clickHandler={logout}/>
  )
}
