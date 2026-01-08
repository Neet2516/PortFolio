import React from 'react'
import Hero from '../sections/Hero'
import About from '../sections/About'
import Skills from '../sections/Skills'
import Contact from '../sections/Contact'

const MainLayout = () => {
  return (
    <div className='w-full h-full overflow-hidden'>
      <Hero/>
      <About/>
      <Skills/>
      <Contact/>
    </div>
  )
}

export default MainLayout
