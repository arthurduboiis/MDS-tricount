import React from "react";

const TricountListComponent = ({ tricount }) => {
  const detail = () => {
    console.log("detail");
  };

  return (
    <div className="flex justify-between items-center text-2xl font-sans">
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
        <div onClick={detail} className="size-10 cursor-pointer">
          <img src="/flecheDroite.png" />
        </div>
      </div>
    </div>
  );
};

export default TricountListComponent;
