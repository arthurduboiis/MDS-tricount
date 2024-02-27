import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import "../assets/newExpense.css";
import { db, sync } from "../utils/db.js";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const NewExpense = () => {
  const { id } = useParams();
  const [status, setStatus] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [amount, setAmount] = React.useState(0);
  const [paidByUser, setPaidByUser] = React.useState("");
  const [date, setDate] = React.useState("");
  const [isAllChecked, setIsAllChecked] = React.useState(false);
  const [usersTricount, setUsersTricount] = React.useState([]);
  const [tricount, setTricount] = React.useState({});
  const [paidForUsers, setPaidForUsers] = React.useState([]);

  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchData = async () => {
      const tricountData = await db.tricount.toArray();
      const tricount = tricountData?.find(
        (tricount) => tricount.id === parseInt(id)
      );

      setTricount(tricount);
    };

    fetchData();
  }, [id]);

  React.useEffect(() => {
    if (tricount) {
      console.log(tricount.participants);
      setUsersTricount(tricount.participants);
    }
  }, [tricount]);

  React.useEffect(() => {
    setPaidForUsers(
      usersTricount?.map((user, index) => {
        return { id: index + 1, name: user, isChecked: false };
      })
    );
  }, [usersTricount]);

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

    if (title === "" || amount === 0 || paidByUser === "" || date === "" || paidForUsers.length === 0) {
      setStatus("Veuillez remplir tous les champs");
     
      return;
    }

    try {
      const newExpense = {
        title,
        amount,
        date,
        paidByUser,
        paidForUsers: paidForUsers.filter((user) => user.isChecked),
      };
      await db.tricount.update(parseInt(id), {
        expenses: [...tricount.expenses, newExpense],
      });
      sync();
      setStatus("Expense added successfully!");
      navigate(`/tricount/${id}`);
    } catch (error) {
      setStatus(`Error adding expense : ${error}`);
    }
  };

  const notifyAndResetStatus = (message) => {
    console.log(message);
    console.log("toast");
    toast.error(message, {
      autoClose: 5000, 
      onClose: () => setStatus(""), 
      closeButton: true,
      draggable: true,
     
    });
  };

  const getCheckedUserCount = () => {
    const checkedUsers = paidForUsers?.filter((user) => user.isChecked);
    return checkedUsers.length;
  };

  React.useEffect(() => {
    setIsAllChecked(paidForUsers?.every((user) => user.isChecked));
  }, [paidForUsers]);

  const goBack = () => {
    navigate(`/tricount/${id}`);
  };

  return (
    <div className="flex flex-col gap-4 h-screen bg-zinc-900">
      
      {status && notifyAndResetStatus(status)}
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
            value={paidByUser}
            onChange={(e) => {
              setPaidByUser(e.target.value);
            }}
            className="w-full border-b-2  bg-zinc-900 focus:border-b-2 focus:border-y-indigo-600 focus:outline-none  text-white"
          >
            <option disabled value={""}>Choisir un utilisateur</option>
            {paidForUsers?.map((user, index) => (
              <option key={index} value={user.name || ""}>
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
          checked={isAllChecked || false}
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
                checked={user.isChecked || false}
                onChange={handleChange}
                name={user.id}
                className="w-5 h-5"
              />
              <label>{user.name}</label>
            </div>
            { user.isChecked ?  <div className="">{getCheckedUserCount() > 0 ? amount /getCheckedUserCount() : 0.00 } EUR</div> :
            <div className="text-slate-600">0.00 EUR</div>}
          </div>
        ))}
        <ToastContainer />
      </div>
    </div>
  );
};

export default NewExpense;
