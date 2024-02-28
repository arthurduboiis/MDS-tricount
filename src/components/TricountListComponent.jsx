import React from "react";
import { useNavigate } from "react-router";
import flecheDroite from "../assets/flecheDroite.png";

const TricountListComponent = ({ tricount }) => {
  const navigate = useNavigate();
  const goToSpecifyTricount = (e,id) => {
    e.preventDefault();
    navigate(`/tricount/${id}`);
  };

  return (
    <div
      onClick={(e) => goToSpecifyTricount(e,tricount._id)}
      className="hover:bg-slate-500 flex justify-between items-center text-2xl font-sans cursor-pointer"
    >
      <div className="flex flex-col items-start justify-between pt-2 pl-4">
        <strong>{tricount.title}</strong>
        <div className="text-xl italic pb-4">{tricount.description}</div>
      </div>
      <div className="flex">
        {tricount.notifications > 0 && (
          <div>
            <div className="w-9 h-9 border rounded-full bg-blue-400">
              {tricount.notifications}
            </div>
          </div>
        )}
        <div className="size-10">
          <img src={flecheDroite} style={{ filter: "invert(100%)" }} />
        </div>
      </div>
    </div>
  );
};

export default TricountListComponent;
