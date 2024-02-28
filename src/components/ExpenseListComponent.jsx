import React from "react";
import { useNavigate } from "react-router";

const ExpenseListComponent = ({ expense, tricount_id }) => {
  const navigate = useNavigate();
  const goToSpecifyExpense = (e, tricount_id, expense_id) => {
    e.preventDefault();
    navigate(`/${tricount_id}/expense/${expense_id}`);
  };
  return (
    <div
      onClick={(e) => goToSpecifyExpense(e, tricount_id, expense._id)}
      className="flex justify-between items-center text-2xl font-sans"
    >
      <div className="flex flex-col items-start justify-between pt-2 pl-4">
        {expense.title}

        <div className="text-xl pb-4">
          payé par <strong>{expense.paidByUser}</strong>
        </div>
      </div>
      <div className="flex flex-col items-ends justify-between pt-2 pr-4">
        {expense.amount} €<div className="text-xl pb-4">{expense.date}</div>
      </div>
    </div>
  );
};

export default ExpenseListComponent;
