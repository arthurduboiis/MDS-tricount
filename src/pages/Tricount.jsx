import React from "react";
import NavBarTicountComponent from "../components/NavBarTicountComponent";
import ExpenseBalanceTabComponent from "../components/ExpenseBalanceTabComponent";
import TricountTotalFooterComponent from "../components/TricountTotalFooterComponent";

const Tricount = () => {
  const tricount = {
    name: "Lyon",
    users: ["arthur", "baptiste"],
  };

  return (
    <div className="w-full h-screen flex flex-col justify-between bg-zinc-900">
      <div className="">
        {" "}
        <NavBarTicountComponent name={tricount.name} users={tricount.users} />
        <ExpenseBalanceTabComponent />
      </div>
      <TricountTotalFooterComponent />
    </div>
  );
};

export default Tricount;
