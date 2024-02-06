import React from "react";
import NavBarComponent from "../components/NavBarComponent";
import TricountListComponent from "../components/tricountListComponent";
import { useNavigate } from "react-router";

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
  const navigate = useNavigate();

  const goToNewTricount = () => {
      navigate('/new-tricount');
  }
  return (
      <div className='w-full flex flex-col bg-zinc-900'>
        <NavBarComponent />
        <h2 className='text-3xl font-bold underline'>Tricount</h2>
        <div className='flex justify-center items-center absolute bottom-2 right-2 h-14 w-14 cursor-pointer' onClick={goToNewTricount}>
            <img src="/add.png" alt="add button"/>
        </div>

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
