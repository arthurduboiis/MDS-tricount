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
  const [tricount, setTricount] = React.useState({});
  const [expenses, setExpenses] = React.useState([]);
  const [effectiveTab, setEffectiveTab] = React.useState("expenses");

  const handleTabChange = (tab) => {
    setEffectiveTab(tab);
  };

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
      setExpenses(tricount.expenses);
    }
  }, [tricount]);

  return (
    <div className="w-full h-screen flex flex-col justify-between bg-zinc-900">
      <div className="">
        <NavBarTicountComponent
          name={tricount.title}
          users={tricount.participants}
        />
        <ExpenseBalanceTabComponent changeTab={handleTabChange} />
        {effectiveTab === "expenses" && (
          <div className="divide-y-2 divide-blue-300">
            {expenses?.map((expense, index) => (
              <ExpenseListComponent key={index} expense={expense} tricount_id={tricount._id} />
            ))}
          </div>
        )}
        {effectiveTab === "balance" && (
          <div className="flex justify-center items-center h-full">
            <div className="text-white text-2xl">Balance</div>
          </div>
        )}
      </div>
      {tricount && (
        <TricountTotalFooterComponent
          tricountId={tricount._id}
          expenses={expenses}
          currentUser={(tricount.participants || [])[0]}
        />
      )}
    </div>
  );
};

export default Tricount;
