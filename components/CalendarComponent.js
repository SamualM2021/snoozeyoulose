'use client'
import React, { useState } from 'react'
import { gradients, baseRating, demoData } from '@/utils'

const months = { 'January': 'Jan', 'February': 'Feb', 'March': 'Mar', 'April': 'Apr', 'May': 'May', 'June': 'Jun', 'July': 'Jul', 'August': 'Aug', 'September': 'Sept', 'October': 'Oct', 'November': 'Nov', 'December': 'Dec' }
const monthsArr = Object.keys(months)
const now = new Date()
const dayList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

import { Shojumaru } from 'next/font/google'
const shoju = Shojumaru({ subsets: ['latin'], weight: ['400'] })

export default function CalendarComponent(props) {
  const { demo, completeData, handleSetSleep } = props
  const now = new Date()
  const nowMonth = now.getMonth()
  const [selectedMonth, setSelectedMonth] = useState(Object.keys(months)[nowMonth])
  const [selectedYear, setSelectedYear] = useState(now.getFullYear())

  const numericMonth = monthsArr.indexOf(selectedMonth)
  const data = completeData?.[selectedYear]?.[numericMonth] || {}
  // console.log('THIS MONTHS DATA: ', completeData?.[selectedYear]?.[numericMonth])

  function handleChangeMonth(val) {
    //value +1 -1
    //if we hit bounds of month adjust year instead
    if (numericMonth + val < 0) {
      //set the month value to 11 and decrement year
      setSelectedYear(curr => curr - 1)
      setSelectedMonth(monthsArr[monthsArr.length - 1])
    } else if (numericMonth + val > 11) {
      //set month value to 0 and increment year
      setSelectedYear(curr => curr + 1)
      setSelectedMonth(monthsArr[0])
    } else {
      setSelectedMonth(monthsArr[numericMonth + val])
    }
  }

  // console.log('Selected Month ' + selectedMonth)
  const currentMonth = new Date(selectedYear, monthsArr.indexOf(selectedMonth), 1)
  const firstDayOfMonth = currentMonth.getDay()
  const daysInMonth = new Date(selectedYear, monthsArr.indexOf(selectedMonth) + 1, 0).getDate()

  const daysToDisplay = firstDayOfMonth + daysInMonth
  const numRows = (Math.floor(daysToDisplay / 7)) + (daysToDisplay % 7 ? 1 : 0)

  return (
    <div className='flex flex-col gap-2'>
      <div className='grid grid-cols-5 gap-4'>
        <button onClick={() => {
          handleChangeMonth(-1)
        }} className='mr-auto text-indigo-400 text-lg sm:text-xl duration-200 hover:opacity-60'><i className="fa-solid fa-circle-chevron-left"></i></button>
        <p className={'text-center col-span-3 capitalized whitespace-nowrap textGradient ' + shoju.className}>{selectedMonth}, {selectedYear}</p>
        <button onClick={() => {
          handleChangeMonth(+1)
        }} className='ml-auto text-indigo-400 text-lg sm:text-xl duration-200 hover:opacity-60'><i className="fa-solid fa-circle-chevron-right"></i></button>
      </div>
      <div className='flex flex-col overflow-hidden gap-1 py-4 sm:py-6 md:py-10'>
        {[...Array(numRows).keys()].map((row, rowIndex) => {
          return (
            <div key={rowIndex} className='grid grid-cols-7 gap-1'>
              {dayList.map((_, dayOfWeekIndex) => {
                let dayIndex = (rowIndex * 7) + dayOfWeekIndex - (firstDayOfMonth - 1)

                let dayIsDisplayed = dayIndex > daysInMonth ? false : (row === 0 && dayOfWeekIndex < firstDayOfMonth) ? false : true

                let isToday = dayIndex === now.getDate()

                if (!dayIsDisplayed) {
                  return (
                    <div className='bg-white' key={dayOfWeekIndex}></div>
                  )
                }

                let color = demo ?
                  gradients.indigo[baseRating[dayIndex]] :
                  dayIndex in data ?
                    gradients.indigo[data[dayIndex]] :
                    'white'

                return (
                  <div style={{ background: color }} className={'text-xs sm:text-sm border border-solid p-2 flex items-center gap-2 justify-between rounded-lg ' + (isToday ? 'border-indigo-700 ' : 'border-indigo-100 ') + (color === 'white' ? 'text-indigo-400 ' : 'text-white ')} key={dayOfWeekIndex}>
                    <p>{dayIndex}</p>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}
