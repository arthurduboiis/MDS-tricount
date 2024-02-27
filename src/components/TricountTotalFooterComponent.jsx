import React from "react";
import { useNavigate } from "react-router";

const TricountTotalFooterComponent = ({tricountId, expenses, currentUser}) => {
    const navigate = useNavigate();
    const [total, setTotal] = React.useState(0);
    const [paidByTotal, setPaidByTotal] = React.useState(0);

    const goToNewExpense = () => {
        navigate("/" + tricountId +"/new-expense");
    };

    React.useEffect(() => {
        if (expenses) {
            const total = expenses.reduce((acc, expense) => parseFloat(acc) + parseFloat(expense.amount), 0);
            setTotal(Number(total));
        }
    }, [expenses]);

    React.useEffect(() => { 
        if (currentUser && expenses) {
            const paidByTotal = expenses?.reduce((acc, expense) => {
                if (expense.paidByUser === currentUser) {
                    return parseFloat(acc) + parseFloat(expense.amount);
                } else {
                    return acc;
                }
            }, 0);
            setPaidByTotal(Number(paidByTotal));
        }
    }, [currentUser, expenses]);

    

  return (
    <div className="w-full h-16 flex justify-between items-center bg-slate-800 text-white ">
      <div className="flex flex-col items-start p-2">
        <span className="uppercase  text-slate-400">Mon coût total</span>
        <span>{paidByTotal} €</span>
      </div>
      <div
        className="flex justify-center items-center self-start -my-8 justify-self-start h-14 w-14 cursor-pointer"
        onClick={goToNewExpense}
      >
        <img src="/add.png" alt="add button" />
      </div>
      <div className="flex flex-col items-end p-2">
        <span className="uppercase text-slate-400">Total dépenses</span>
        <span>{total} €</span>
      </div>
    </div>
  );
};

export default TricountTotalFooterComponent;
