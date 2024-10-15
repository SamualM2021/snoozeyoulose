import React from 'react'
import { Shojumaru } from 'next/font/google'
import CalendarComponent from './CalendarComponent'
import CallToAction from './CallToAction'
const shoju = Shojumaru({subsets : ['latin'], weight: ['400'] })

export default function Hero() {
  return (
    <div className='py-4 md:py-10 flex flex-col gap-8 sm:gap-10'>
      <h1 className={'text-3xl sm:text-4xl md:text-5xl text-center  ' + shoju.className}><span className='textGradient'>Snooze You Lose</span> because counting sheep each<span className='textGradient'> day</span> is for suckers.</h1>
      <p className='text-lg sm:text-xl md:text-2xl text-center w-2/3 mx-auto max-w-[600px]'> If you don&#39;t <span className='font-semibold'>track your sleep</span>, how will you know if you really needed that third nap? Spoiler: you probably did.</p>
      <CallToAction />
      <CalendarComponent demo></CalendarComponent>
    </div>
  )
}
