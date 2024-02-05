import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBarComponent from './components/NavBarComponent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='w-full'>
      <NavBarComponent />
      <h2 className='text-3xl font-bold underline'>Tricount</h2>
    </div>
  )
}

export default App
