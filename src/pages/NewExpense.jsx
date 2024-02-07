import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import "../assets/newExpense.css";
import { db } from "../utils/db.js";
import { useLiveQuery } from "dexie-react-hooks";
import { useParams } from "react-router-dom";

const NewExpense = () => {
  const { id } = useParams();
  const [status, setStatus] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [amount, setAmount] = React.useState(0);
  const tricounts = useLiveQuery(() => db.tricount.toArray());
  const usersTricount = tricounts?.find(
    (tricount) => tricount.id === parseInt(id)
  ).participants;

  const [paidForUsers, setPaidForUsers] = React.useState([]);
  React.useEffect(() => {
    setPaidForUsers(
      usersTricount?.map((user, index) => {
        return { id: index + 1, name: user, isChecked: false };
      })
    );
  }, [usersTricount]);

  const [paidByUser, setPaidByUser] = React.useState("");
  const [date, setDate] = React.useState("");
  const [isAllChecked, setIsAllChecked] = React.useState(false);

  const navigate = useNavigate();

  const handleChange = (event) => {
    const itemName = event.target.name;
    console.log(itemName);
    setIsAllChecked(false);

    setPaidForUsers((prevUsers) =>
      prevUsers.map((user) => {
        if (user.id === parseInt(itemName)) {
          return { ...user, isChecked: !user.isChecked };
        }
        return user;
      })
    );
  };

  const handleCheckAll = () => {
    const allChecked = !isAllChecked;

    setIsAllChecked(allChecked);
    setPaidForUsers((prevUsers) =>
      prevUsers.map((user) => ({ ...user, isChecked: allChecked }))
    );
  };

  const addExpense = async () => {
    try {
      const newExpense = {
        title,
        amount,
        date,
        paidByUser,
        paidForUsers: paidForUsers.filter((user) => user.isChecked),
      };
      console.log(newExpense);
      await db.expense.add(newExpense);
      setStatus("Expense added successfully!");
    } catch (error) {
      setStatus(`Error adding expense : ${error}`);
    }
  };

  useEffect(() => {
    setIsAllChecked(paidForUsers?.every((user) => user.isChecked));
  }, [paidForUsers]);
  const goBack = () => {
    navigate("/tricount");
  };

  return (
    <div className="flex flex-col gap-4 h-screen bg-zinc-900">
      <div className="text-white relative top-0 bg-slate-800 flex justify-between items-center w-full h-16 py -4">
        <button onClick={goBack} className="p-2 bg-transparent cursor-pointer">
          Annuler
        </button>
        <h2 className="font-bold">Nouveau tricount</h2>
        <button
          className="p-2 bg-transparent cursor-pointer"
          onClick={addExpense}
        >
          Enregistrer
        </button>
      </div>
      <div className="flex flex-col gap-8 p-4">
        <input
          type="text"
          placeholder="Titre"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          className="border-b-2 bg-transparent border-slate-600 focus:border-b-2 focus:border-y-indigo-600 focus:outline-none"
        />
        <input
          type="number"
          placeholder="Montant"
          onChange={(e) => {
            setAmount(e.target.value);
          }}
          className="border-b-2 bg-transparent border-slate-600 focus:border-b-2 focus:border-y-indigo-600 focus:outline-none"
        />
        <div className="flex flex-col items-start w-full">
          <label htmlFor="date" className="text-slate-600 ">
            Date
          </label>
          <input
            type="date"
            id="date"
            placeholder={Date.now()}
            onChange={(e) => {
              setDate(e.target.value);
            }}
            className="w-full border-b-2 bg-transparent border-slate-600 focus:border-b-2 focus:border-y-indigo-600 focus:outline-none"
          />
        </div>

        <div className="flex flex-col items-start w-full">
          <label htmlFor="paidBy" className="text-slate-600 ">
            Payé par
          </label>
          <select
            id="paidBy"
            onChange={(e) => {
              setPaidByUser(e.target.value);
            }}
            className="w-full border-b-2  bg-zinc-900 focus:border-b-2 focus:border-y-indigo-600 focus:outline-none  text-white"
          >
            <option disabled value="">
              Choisir un utilisateur
            </option>
            {paidForUsers?.map((user, index) => (
              <option key={index} value={user.name}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex w-full gap-4 bg-slate-800 p-4 items-center">
        <input
          type="checkbox"
          name="checkAll"
          onChange={handleCheckAll}
          checked={isAllChecked}
          className="w-5 h-5"
        />{" "}
        <span>Pour qui</span>
      </div>

      <div className="flex flex-col  w-full px-4 gap-4">
        {paidForUsers?.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between border-b-2 border-slate-500 py-2"
          >
            <div className="flex gap-4 items-center">
              <input
                type="checkbox"
                checked={user.isChecked}
                onChange={handleChange}
                name={user.id}
                className="w-5 h-5"
              />
              <label>{user.name}</label>
            </div>
            <div className="">0.00 EUR</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewExpense;
