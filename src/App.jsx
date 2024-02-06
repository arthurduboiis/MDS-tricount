import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ExpenseCardComponent from './components/ExpenseCardComponent.jsx'


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
    <div>
      <div>
        <ExpenseCardComponent expense={expenseObject} />
      </div>
      
    </div>
  )
}

export default App
