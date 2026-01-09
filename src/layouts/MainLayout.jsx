import React from 'react'
import Hero from '../sections/Hero'
import About from '../sections/About'
import Skills from '../sections/Skills'
import Contact from '../sections/Contact'
import Projects from '../sections/Projects'

const MainLayout = () => {
  return (
    <div className='w-full h-full overflow-hidden'>
      <Hero/>
      <About/>
      <Skills/>
      <Projects/>
      <Contact/>
    </div>
  )
}

export default MainLayout
