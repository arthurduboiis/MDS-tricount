import React from "react";
import '../assets/ExpenseBalanceTabComponent.css';

const ExpenseBalanceTabComponent = () => {
  const [activeTab, setActiveTab] = React.useState("expenses");

  return (
    <div className="flex justify-around items-start bg-slate-800 relative w-full">
    <div
      className={`tab flex flex-col items-center justify-center cursor-pointer gap-4 p-4 w-full ${activeTab === 'expenses' ? 'active' : ''}`}
      onClick={() => setActiveTab('expenses')}
    >
      <img src="/expense.png" alt="expense" className=" h-10" />
      <span className="text-lg font-bold uppercase">Expenses</span>
    </div>
    <div
      className={`tab flex flex-col items-center justify-center cursor-pointer gap-4 p-4 w-full ${activeTab === 'balance' ? 'active' : ''}`}
      onClick={() => setActiveTab("balance")}
    >
      <img src="/two_side_arrow.png" alt="balance" className="h-10" />
      <span className="text-lg font-bold uppercase">Balance</span>
    </div>
    <div className={`slider ${activeTab}`} />
  </div>
  );
};

export default ExpenseBalanceTabComponent;
