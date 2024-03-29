import React from "react";
import { useNavigate } from "react-router";
import flecheGauche from "../assets/flecheGauche.png";

const ExpenseCardComponent = ({ expense, expense_id, tricount_id}) => {
  const navigate = useNavigate();
  expense = expense.find((item) => item._id === expense_id);

  const back = () => {
    window.history.back();
  };

  const onEdit = () => {
    console.log("Edit expense");
    navigate(`/${tricount_id}/expense/${expense._id}/edit`, { state: { expense }});
  };

  return (
    <div className="flex flex-col text-2xl font-sans">
      <div className="bg-blue-800 flex justify-between p-4 items-center w-full text-xl">
        <div onClick={back} className="cursor-pointer size-12">
            <img src={flecheGauche}/>
        </div>
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full"
          onClick={onEdit}
        >
          Modifier
        </button>
      </div>
      <div className="bg-blue-800 flex flex-col gap-8">
        <h1>{expense.title}</h1>
        <div>
          <strong>Montant :</strong> {expense.amount} €
        </div>
        <div className="flex justify-between p-1 text-xl">
          <div>
            <strong>Payé par :</strong> {expense.paidByUser}
          </div>
          <div className="italic">
            <strong>Date :</strong> {expense.date}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center p-14 bg-gray-500">
        <div>
          Pour {expense.paidForUsers.length} <strong> participants : </strong>
          {expense.paidForUsers.map((participant, index) => (
            <div key={index}>{participant.name}</div>
          ))}
        </div>
      </div>
      <div className="p-4 divide-y-2 divide-blue-300">
        {expense.paidForUsers.map((participant, index) => (
          <div className="flex justify-between gap-3 p-4" key={index}>
            <strong>{participant.name}</strong>{" "}
            {expense.amount / expense.paidForUsers.length} €
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseCardComponent;
