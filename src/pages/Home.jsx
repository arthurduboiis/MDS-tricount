import React from "react";
import NavBarComponent from "../components/NavBarComponent";
import TricountListComponent from "../components/tricountListComponent";
import { useNavigate } from "react-router";
import ExpenseListComponent from "../components/ExpenseListComponent";

const Home = () => {
  const tricounts = [
    {
      title: "Lyon",
      description: "ça coûte chère zebi",
      notifications: 2,
    },
    {
      title: "Voyage",
      description: "les vacances, c'est bien",
      notifications: 2,
    },
    {
      title: "Autre exemple",
      description: "la description de l'exemple",
      notifications: 0,
    },
  ];

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
  const navigate = useNavigate();

  const goToNewTricount = () => {
    navigate("/new-tricount");
  };
  return (
    <div className="w-full">
      <NavBarComponent />
      <div className="divide-y-2 divide-blue-300">
        {tricounts.map((tricount, index) => (
          <TricountListComponent
            key={index}
            tricount={tricount}
          />
        ))}
      </div>
      <div className="divide-y-2 divide-blue-300">
        {expenses.map((expense, index) => (
          <ExpenseListComponent
            key={index}
            expense={expense}
          />
        ))}
      </div>
      <div
        className="flex justify-center items-center absolute bottom-2 right-2 h-14 w-14 cursor-pointer"
        onClick={goToNewTricount}
      >
        <img src="/add.png" alt="add button" />
      </div>
    </div>
  );
};

export default Home;
