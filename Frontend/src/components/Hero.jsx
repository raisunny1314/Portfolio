import React from 'react'
import Intro from './Intro'
import ProjectsGrid from './ProjectsGrid'
import TechStack from './TechStack'

const Hero = () => {
  return (
    <div className="w-full bg-black">
     <div>
      <Intro/>
     </div>
     <div>
      <TechStack/>
     </div>
      <div className="max-w-6xl flex flex-col mx-auto px-5">
        <div className='opacity-80'>
          PORTFOLIO
        </div>
        <div className='text-3xl my-4 font-bold'>
        Selected work
        </div>
        <ProjectsGrid />
      </div>
    </div>
  )
}

export default Hero