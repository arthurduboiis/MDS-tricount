import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import "../assets/newExpense.css";
import { db } from "../utils/db.js";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const NewExpense = () => {
  const { state } = useLocation();
  const expense = state?.expense;

  const { id } = useParams();
  const [status, setStatus] = React.useState("");
  const [title, setTitle] = React.useState(expense?.title || "");
  const [amount, setAmount] = React.useState(expense?.amount || 0);
  const [paidByUser, setPaidByUser] = React.useState(expense?.paidByUser || "");
  const [date, setDate] = React.useState(expense?.date || "");
  const [isAllChecked, setIsAllChecked] = React.useState(false);
  const [usersTricount, setUsersTricount] = React.useState([]);
  const [tricount, setTricount] = React.useState({});
  const [paidForUsers, setPaidForUsers] = React.useState(
    expense?.paidForUsers || []
  );

  const navigate = useNavigate();

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
      setUsersTricount(tricount.participants);
    }
  }, [tricount]);

  React.useEffect(() => {
    setPaidForUsers(
      usersTricount?.map((user, index) => {
        const checkedUser = expense?.paidForUsers.find(userExpense => user === userExpense.name);
        console.log(checkedUser)
        return { id: index + 1, name: user, isChecked: checkedUser ? true : false};
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
    console.log(paidForUsers)
  };

  const handleCheckAll = () => {
    const allChecked = !isAllChecked;

    setIsAllChecked(allChecked);
    setPaidForUsers((prevUsers) =>
      prevUsers.map((user) => ({ ...user, isChecked: allChecked }))
    );
  };

  const addExpense = async () => {
    if (
      title === "" ||
      amount === 0 ||
      paidByUser === "" ||
      date === "" ||
      paidForUsers.length === 0
    ) {
      setStatus("Veuillez remplir tous les champs");

      return;
    }

    if (expense) {
      try {
        const updatedExpense = {
          _id: expense._id,
          title: title,
          amount: amount,
          date: date,
          paidByUser: paidByUser,
          paidForUsers: paidForUsers.filter((user) => user.isChecked),
        };
        console.log(paidForUsers)

        tricount.expenses = tricount.expenses.map((exp) => {
          if (exp._id === expense._id) {
            return updatedExpense;
          }
          return exp;
        });

        await db
          .put(tricount)
          .then((response) => {
            console.log(response);
          })
          .catch((err) => {
            console.log(err);
          });

        setStatus("Expense updated successfully!");
        console.log(id);
        navigate(`/tricount/${id}`);
      } catch (error) {
        setStatus(`Error updating expense : ${error}`);
      }
    } else {
      try {
        const newExpense = {
          _id: new Date().toISOString(),
          title: title,
          amount: amount,
          date: date,
          paidByUser: paidByUser,
          paidForUsers: paidForUsers.filter((user) => user.isChecked),
        };
        tricount.expenses.push(newExpense);

        await db
          .put(tricount)
          .then((response) => {
            console.log(response);
          })
          .catch((err) => {
            console.log(err);
          });

        setStatus("Expense added successfully!");
        console.log(id);
        navigate(`/tricount/${id}`);
      } catch (error) {
        setStatus(`Error adding expense : ${error}`);
      }
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
          value={title || ""}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          className="border-b-2 bg-transparent border-slate-600 focus:border-b-2 focus:border-y-indigo-600 focus:outline-none"
        />
        <input
          type="number"
          placeholder="Montant"
          value={amount || ""}
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
            value={date || ""}
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
            <option disabled value={""}>
              Choisir un utilisateur
            </option>
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
            {user.isChecked ? (
              <div className="">
                {getCheckedUserCount() > 0
                  ? amount / getCheckedUserCount()
                  : 0.0}{" "}
                EUR
              </div>
            ) : (
              <div className="text-slate-600">0.00 EUR</div>
            )}
          </div>
        ))}
        <ToastContainer />
      </div>
    </div>
  );
};

export default NewExpense;
