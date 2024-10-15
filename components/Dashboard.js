'use client'
import React, { useEffect, useState } from 'react'
import { Shojumaru } from 'next/font/google'
import CalendarComponent from './CalendarComponent'
import { useAuth } from '@/context/authContext'
import { average, doc, setDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import Loading from './Loading'
import Login from './Login'
const shoju = Shojumaru({subsets : ['latin'], weight: ['400'] })

export default function Dashboard() {
  const { currentUser, userDataObj, setUserDataObj, loading } = useAuth()
  const [data, setData] = useState({})
  const now = new Date()

  function countValues() {
    let total_number_of_days = 0
    let sum_sleep_health = 0
    for (let year in data) {
      for (let month in data[year]) {
        for (let day in data[year][month]) {
          let days_sleep_health = data[year][month][day]
          total_number_of_days++
          sum_sleep_health += days_sleep_health
        }
      }
    }
    return {num_days: total_number_of_days, average_sleep_health: sum_sleep_health / total_number_of_days}
  }

  const statusData = {
    ...countValues(),
    time_remaining: `${23-now.getHours()}H ${60-now.getMinutes()}M`
  }

  async function handleSetSleep(sleep) {
    const day = now.getDate()
    const month = now.getMonth()
    const year = now.getFullYear()

    try {
      const newData = {...userDataObj }
      if (!newData?.[year]) {
        newData[year] = {}
      }
      if (!newData?.[month]) {
        newData[year][month] = {}
      }

      newData[year][month][day] = sleep
      //update the current state
      setData(newData)
      //update the global state
      setUserDataObj(newData)
      // update firebase
      const docRef = doc(db, 'users', currentUser.uid)
      const res = await setDoc(docRef, {
        [year]: {
          [month]: {
            [day]: sleep
          }
        }
      }, { merge: true })
    } catch (err) {
      console.log('Failed to set data: ', err.message)
    }
  }

  const sleepStats = {
    'Insomnia': '😫',
    'Tired': '😩',
    'Sleepy': '🥱',
    'Resting': '😪',
    'Rested': '😴'
  }

  useEffect(() => {
    if (!currentUser || !userDataObj) {
      return
    }
    setData(userDataObj)
  }, [currentUser, userDataObj])

  if (loading) {
    return <Loading />
  }
  if (!currentUser) {
    return <Login />
  }
  return (
    <div className='flex flex-col flex-1 gap-8 sm:gap-12 md:gap-16'>
      <div className='grid grid-cols-3 bg-indigo-50 text-indigo-500 p-4 gap-4 rounded-lg'>
        {Object.keys(statusData).map((status, statusIndex) => {
          return (
            <div key={statusIndex} className='flex flex-col gap-1 sm:gap-2'>
              <p className='font-medium capitalize text-xs sm:text-sm truncate'>{status.replaceAll('_', ' ')}</p>
              <p className={'text-base sm:text-lg truncate ' + shoju.className}>{statusData[status]}{status === 'num_days' ? ' 🔥' : '' }</p>
            </div>
          )
        })}
      </div>
      <h4 className={'text-xl sm:text-2xl md:text-3xl text-center ' + shoju.className}>So&#x2c; did you <span className='textGradient'>sleep</span> peacefully or wrestle with the sheets like a madman?</h4>
      <div className='flex items-stretch flex-wrap gap-4'>
        {Object.keys(sleepStats).map((sleep, sleepIndex) => {
          return (
            <button onClick={() => {
              const curretSleepHealth = sleepIndex + 1
              handleSetSleep(curretSleepHealth)
            }} className={'p-4 px-5 rounded-2xl purpleShadow duration-200 bg-indigo-50 hover:bg-indigo-100 text-center flex flex-col items-center gap-2 flex-1'} key={sleepIndex}>
              <p className='text-3xl sm:text-4xl md:text-5xl'>{sleepStats[sleep]}</p>
              <p className={'text-indigo-500 text-xs sm:text-sm md:text-base ' + shoju.className}>{sleep}</p>
            </button>
          )
        })}
      </div>
      <CalendarComponent completeData={data} handleSetSleep={handleSetSleep}></CalendarComponent>
    </div>
  )
}
