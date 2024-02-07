import React from "react";
import { useNavigate } from "react-router";
import { db } from "../utils/db.js";

const NewTricount = () => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [participant, setParticipant] = React.useState([]);
  const [newParticipant, setNewParticipant] = React.useState("");
  const [status, setStatus] = React.useState("");
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/");
  };

  const addParticipant = () => {
    if (participant?.length >= 50) {
      return;
    } else {
      if (
        typeof newParticipant === "string" &&
        participant !== undefined &&
        newParticipant !== ""
      ) {
        setParticipant([...participant, newParticipant]);
        setNewParticipant("");
      }
    }
  };

  const deleteUser = (e, index) => {
    e.preventDefault();
    setParticipant(
      participant.slice(0, index).concat(participant.slice(index + 1))
    );
  };

  const addTricount = async () => {
    try {
      const newTricount = {
        title,
        description,
        participants: participant,
      };
      console.log(newTricount);
      await db.tricount.add(newTricount);
      setStatus("Tricount added successfully!");
    } catch (error) {
      setStatus(`Error adding tricount : ${error}`);
    }
  };

  return (
    <div className="flex flex-col gap-4 h-screen">
      <div className="text-white relative top-0 bg-slate-800 flex justify-between items-center w-full h-16 py -4">
        <button onClick={goBack} className="p-2 bg-transparent cursor-pointer">
          Annuler
        </button>
        <h2 className="font-bold">Nouveau tricount</h2>
        <button
          className="p-2 bg-transparent cursor-pointer"
          onClick={addTricount}
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
          type="text"
          placeholder="Description"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          className="border-b-2 bg-transparent border-slate-600 focus:border-b-2 focus:border-y-indigo-600 focus:outline-none"
        />
      </div>
      <div className="px-2 py-4 bg-slate-800 flex items-end justify-start">
        <span> Participants ( {participant?.length} / 50 ) </span>
      </div>
      <div className="flex flex-col">
        {participant?.map((p, index) => (
          <div key={index} className="flex justify-between items-center px-4">
            <span>{p}</span>
            <button
              className="bg-transparent cursor-pointer"
              onClick={(e) => deleteUser(e, index)}
            >
              <img
                src="/trash.png"
                alt="delete"
                className="w-[25px] h-[25px]"
              />
            </button>
          </div>
        ))}
      </div>
      <div className="flex gap-4 px-4">
        <input
          type="text"
          placeholder="nom du participant"
          value={newParticipant}
          className="w-3/4 border-b-2 bg-transparent border-slate-600 focus:border-b-2 focus:border-y-indigo-600 focus:outline-none"
          onChange={(e) => {
            setNewParticipant(e.target.value);
          }}
        />
        <button
          className="p-2 bg-blue-300 text-black rounded-md"
          onClick={addParticipant}
        >
          Ajouter
        </button>
      </div>
    </div>
  );
};

export default NewTricount;
