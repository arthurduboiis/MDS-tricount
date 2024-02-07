import React from "react";
import NavBarTicountComponent from "../components/NavBarTicountComponent";
import ExpenseBalanceTabComponent from "../components/ExpenseBalanceTabComponent";
import TricountTotalFooterComponent from "../components/TricountTotalFooterComponent";
import ExpenseListComponent from "../components/ExpenseListComponent";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../utils/db.js";
import { useParams } from "react-router-dom";

const Tricount = () => {
  const { id } = useParams();
  const tricount = {
    name: "Lyon",
    users: ["arthur", "baptiste"],
  };

  const expenses = useLiveQuery(() => db.expense.toArray());

  return (
    <div className="w-full h-screen flex flex-col justify-between bg-zinc-900">
      <div className="">
        <NavBarTicountComponent name={tricount.name} users={tricount.users} />
        <ExpenseBalanceTabComponent />
        <div className="divide-y-2 divide-blue-300">
          {expenses?.map((expense, index) => (
            <ExpenseListComponent key={index} expense={expense} />
          ))}
        </div>
      </div>
      <TricountTotalFooterComponent />
    </div>
  );
};

export default Tricount;
