import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBarComponent from './components/NavBarComponent'

function App() {
  const [count, setCount] = useState(0)

  const expenseObject = {
    id: 1,
    paid: 'Baptiste',
    amount: 50.00,
    participants: ['Baptiste', 'Arthur', 'Morgane', 'Léa'],
    title: 'Courses',
    date: '2024-02-05'
  };

  return (

    <div className='w-full'>
      <NavBarComponent />
      <h2 className='text-3xl font-bold underline'>Tricount</h2>


    </div>
  )
}

export default App
