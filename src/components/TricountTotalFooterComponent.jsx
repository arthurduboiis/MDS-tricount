import React from "react";

const TricountTotalFooterComponent = () => {
    const goToNewExpense = () => {
        console.log("go to new expense");
    };

  return (
    <div className="w-full h-16 flex justify-between items-center bg-slate-800 text-white ">
      <div className="flex flex-col items-start p-2">
        <span className="uppercase  text-slate-400">Mon coût total</span>
        <span>1198,89 €</span>
      </div>
      <div
        className="flex justify-center items-center self-start -my-8 justify-self-start h-14 w-14 cursor-pointer"
        onClick={goToNewExpense}
      >
        <img src="/add.png" alt="add button" />
      </div>
      <div className="flex flex-col items-end p-2">
        <span className="uppercase text-slate-400">Total dépenses</span>
        <span>3000,89 €</span>
      </div>
    </div>
  );
};

export default TricountTotalFooterComponent;
