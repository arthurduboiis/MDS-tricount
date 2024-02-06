import React from "react";
import NavBarTicountComponent from "../components/NavBarTicountComponent";
import ExpenseBalanceTabComponent from "../components/ExpenseBalanceTabComponent";
import TricountTotalFooterComponent from "../components/TricountTotalFooterComponent";
import ExpenseListComponent from "../components/ExpenseListComponent";

const Tricount = () => {
  const tricount = {
    name: "Lyon",
    users: ["arthur", "baptiste"],
  };

  const expenses = [
    {
      title: "Course",
      paid: "Baptiste",
      amount: 20,
      date: "12/12/2021",
    },
    {
      title: "Airbnb",
      paid: "Baptiste",
      amount: 250,
      date: "12/12/2021",
    },
    {
      title: "Pizza",
      paid: "Baptiste",
      amount: 35,
      date: "12/12/2021",
    },
  ];

  return (
    <div className="w-full h-screen flex flex-col justify-between">
      <div className="">
        <NavBarTicountComponent name={tricount.name} users={tricount.users} />
        <ExpenseBalanceTabComponent />
        <div className="divide-y-2 divide-blue-300">
          {expenses.map((expense, index) => (
            <ExpenseListComponent key={index} expense={expense} />
          ))}
        </div>
      </div>
      <TricountTotalFooterComponent />
    </div>
  );
};

export default Tricount;
