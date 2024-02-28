import React from "react";
import ExpenseCardComponent from "../components/ExpenseCardComponent";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../utils/db.js";
import { useParams } from "react-router-dom";

const Expense = () => {
  const { id, expenseId } = useParams();
  const [tricount, setTricount] = React.useState({});
  const [expense, setExpense] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      await db
        .allDocs({ include_docs: true, descending: true })
        .then((result) => {
          result.rows.map((row) => {
            row.doc._id === id ? setTricount(row.doc) : null;
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchData();
  }, [id]);

  React.useEffect(() => {
    if (tricount) {
      setExpense(tricount.expenses);
    }
  }, [tricount]);

  return (
    <div className="w-full h-screen flex flex-col justify-between bg-zinc-900">
      {expense && <ExpenseCardComponent expense={expense} expense_id={expenseId}/>}
    </div>
  );
};

export default Expense;
