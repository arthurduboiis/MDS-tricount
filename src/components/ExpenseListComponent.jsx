import React from "react";

const ExpenseListComponent = ({ expense }) => {
  return (
    <div className="flex justify-between items-center text-2xl font-sans">
      <div className="flex flex-col items-start justify-between pt-2 pl-4">
       {expense.title}
        <div className="text-xl pb-4">payé par <strong>{expense.paid}</strong></div>
      </div>
      <div className="flex flex-col items-ends justify-between pt-2 pr-4">
        {expense.amount} €
        <div className="text-xl pb-4">{expense.date}</div>
      </div>

    </div>
  );
};

export default ExpenseListComponent;
