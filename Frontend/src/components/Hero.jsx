import React from 'react'
import Intro from './Intro'
import ProjectsGrid from './ProjectsGrid'
import TechStack from './TechStack'
import Platforms from './Platforms'
import Experience from './Experience'
import Education from './Education'
import Contact from './Contact'

const Hero = () => {
  return (
    <div className="w-full ">
      <div id="intro">
        <Intro />
      </div>
      <div>
        <TechStack />
      </div>
      <div id='projects' className="scroll-mt-22 max-w-6xl flex text-white mt-15 flex-col mx-auto px-5">
        <div className='opacity-70'>
          PORTFOLIO
        </div>
        <div className='text-3xl pb-5 my-4 font-bold'>
          Selected work
        </div>
        <ProjectsGrid />
      </div>
      <div className="max-w-6xl flex text-white mt-20 flex-col mx-auto px-5">
        <div className='opacity-70'>
          DEVELOPER METRICS
        </div>
        <div id='platform' className='scroll-mt-35 text-3xl pb-5 my-4 font-bold'>
          Coding Platforms
        </div>
        <Platforms />
      </div>
      <div id='work' className='scroll-mt-25 my-15'>
        <Experience />
      </div>
      <div>
        <Education />
      </div>
      <div id='getTouch'>
        <Contact/>
      </div>
    </div>
  )
}

export default Hero