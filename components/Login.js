'use client'
import React, { useState } from 'react'
import { Shojumaru } from 'next/font/google'
import ButtonComponent from './ButtonComponent'
import { useAuth } from '@/context/authContext'
const shoju = Shojumaru({subsets : ['latin'], weight: ['400'] })

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRegister, setIsRegister] = useState(false)
  const [authenticating, setAuthenticating] = useState(false)

  const { signup, login } = useAuth()

  async function handleSubmit(params) {
    if (!email || !password || password.length < 6 ) {
      return
    }

    setAuthenticating(true)
    try {
      if (isRegister) {
        console.log('Signing up a new user')
        await signup(email, password)
      } else {
        console.log('Logging in existing user')
        await login(email, password)
      }
    } catch (error) {
      console.log(error.message)
    } finally {
      setAuthenticating(false)
    }
  }

  return (
    <div className='flex flex-col flex-1 justify-center items-center gap-4'>
      <h3 className={'text-3xl sm:text-4xl md:text-5xl ' + shoju.className}>{isRegister ? 'Register' : 'Log In'}</h3>
      <p>You&#39;re almost there!</p>
      <input value={email} onChange={(e) => {
        setEmail(e.target.value)
      }} className='max-w-[400px] w-full mx-auto px-3 duration-200 hover:border-indigo-700 focus:border-indigo-700 py-2 sm:py-3 border border-solid border-indigo-400 rounded-full outline-none' placeholder='Email'/>
      <input value={password} onChange={(e) => {
        setPassword(e.target.value)
      }} className='max-w-[400px] w-full mx-auto px-3 duration-200 hover:border-indigo-700 focus:border-indigo-700 py-2 sm:py-3 border border-solid border-indigo-400 rounded-full outline-none' placeholder='Password' type='password'/>
      <div className='max-w-[400px] w-full mx-auto'>
        <ButtonComponent clickHandler={handleSubmit} text={authenticating ? "Submitting" : "Submit"} full></ButtonComponent>
      </div>
      <p className='text-center'>{isRegister ? 'Already have an account? ' : 'Don\'t have an account? '}
        <button onClick={() => {setIsRegister(!isRegister)}} className='text-indigo-600'>{isRegister ? 'Sign In' : 'Sign Up'}</button></p>
    </div>
  )
}
