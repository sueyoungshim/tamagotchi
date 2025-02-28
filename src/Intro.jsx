import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)


export default function Intro()
{
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.introduction',
        start: 'top 70%', // Starts when 70% of the section is in view
        toggleActions: 'play pause reset reverse', // Plays forward on enter, reverses on exit
      }
    })
  
    tl.from('.float-left div', { 
      opacity: 0, 
      y: 30, 
      stagger: 0.3, // Staggers each div by 0.3s
      ease: 'power2.out'
    })
  
  }, [])
  
  


  return (
    <div className='introduction section h-screen relative'>
      <div className='tamagotchi-equation absolute bottom-0'>
        <div className='float-left '>
          <div>&nbsp;</div> 
          <div>+ &nbsp;</div> 
          <div className="line"></div>
          <div>= &nbsp;</div>
        </div>
        <div className='float-left  japanese'>
          <div>tamago たまご &nbsp;</div> 
          <div>uotchi ウオッチ &nbsp;</div> 
          <div className="line"></div>
          <div>tamagotchi たまごっち &nbsp;</div>
        </div>
        <div className='float-left meaning'>
          <div>egg</div> 
          <div>watch</div> 
          <div className="line"></div>
          <div>digital pet</div>
        </div>
      </div>
    </div>
  )
}
