import React from "react";
import { useNavigate } from "react-router";
import left_arrow_white from "../assets/left_arrow_white.png";
import notif from "../assets/notif.png";

const NavBarTicountComponent = ({ name, users }) => {
  const navigate = useNavigate();
  return (
    <nav className="bg-slate-800 flex justify-between items-center relative top-0 w-full h-16 py-4">
      <img
        onClick={() => navigate("/")}
        className="h-10 cursor-pointer"
        src={left_arrow_white}
      />
      <div className="flex flex-col justify-start items-start">
        <span className="text-white font-bold">{name}</span>
        <div className="flex gap-2 text-sm">
          {users?.map((user, index) => (
            <span key={index}>
              {user} {index !== users.length - 1 && ","}{" "}
            </span>
          ))}
        </div>
      </div>
      <div className="flex gap-8 items-center pr-4">
        <img className="h-10" src={notif} />
        <div className="flex flex-col space-y-1 pr-2 cursor-pointer">
          <div className="h-2 w-2 border rounded-full bg-white"></div>
          <div className="h-2 w-2 border rounded-full bg-white"></div>
          <div className="h-2 w-2 border rounded-full bg-white"></div>
        </div>
      </div>
    </nav>
  );
};

export default NavBarTicountComponent;
