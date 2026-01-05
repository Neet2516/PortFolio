import React from 'react'
import Hero from '../sections/Hero'
import About from '../sections/About'
import Skills from '../sections/Skills'

const MainLayout = () => {
  return (
    <div className='w-full h-full overflow-hidden'>
      <Hero/>
      <About/>
      <Skills/>
    </div>
  )
}

export default MainLayout
