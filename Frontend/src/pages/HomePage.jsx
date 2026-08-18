import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero';
import IntroCanvas from '../components/IntroCanvas';


function HomePage() {

  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved !== null ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <>
      
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

        <IntroCanvas />

        <div className='relative z-10'>

          <Hero />

        </div>
     
    </>
  )
}

export default HomePage
