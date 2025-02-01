import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'

const root = ReactDOM.createRoot(document.querySelector('#root'))

window.addEventListener('wheel', (ev) => {
    console.log(ev);
    console.log(ev.offsetY);
})

root.render(
    <>
        <div className="content">
            <h1 className='relative h-screen text-center text-7xl'> 
                TAMAGOTCHI
            </h1>

            <h2 className='h-screen text-center'>
                DIGITAL PET
            </h2>

            <h2>
                FEED
            </h2>

            <h2>
                GAME
            </h2>

            <h2>
                DISCIPLINE
            </h2>

            <h2>
                AND POOP, ... OF COURSE
            </h2>

            <h2>
                CUSTOMIZE YOUR SHELL !!
            </h2>

            <button className='outline-dashed rounded-xs p-2'>ORDER NOW</button>

            <h2>
                FAQ
            </h2>

            <h2>
                WARRANTY
            </h2>

            <div name='footer'>
                shim.sueyoung@gmail.com
            </div>

            
        </div>

        <Canvas
            className="r3f"
            camera={{
                fov: 45,
                near: 0.1,
                far: 2000,
                position: [ -3, 1.5, 4 ]
            }}
        >
            <Experience />
        </Canvas>
    </>
)
