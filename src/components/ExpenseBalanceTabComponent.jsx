import React from "react";
import '../assets/ExpenseBalanceTabComponent.css';
import expense from '../assets/expense.png';
import two_side_arrow from '../assets/two_side_arrow.png';

const ExpenseBalanceTabComponent = ({changeTab}) => {
  const [activeTab, setActiveTab] = React.useState("expenses");

  return (
    <div className="flex justify-around items-start bg-slate-800 relative w-full">
    <div
      className={`tab flex flex-col items-center justify-center cursor-pointer gap-4 p-4 w-full ${activeTab === 'expenses' ? 'active' : ''}`}
      onClick={() => {setActiveTab('expenses'); changeTab('expenses')}}
    >
      <img src={expense} alt="expense" className=" h-10" />
      <span className="text-lg font-bold uppercase">Expenses</span>
    </div>
    <div
      className={`tab flex flex-col items-center justify-center cursor-pointer gap-4 p-4 w-full ${activeTab === 'balance' ? 'active' : ''}`}
      onClick={() => {setActiveTab("balance"); changeTab('balance')}}
    >
      <img src={two_side_arrow} alt="balance" className="h-10" />
      <span className="text-lg font-bold uppercase">Balance</span>
    </div>
    <div className={`slider ${activeTab}`} />
  </div>
  );
};

export default ExpenseBalanceTabComponent;
