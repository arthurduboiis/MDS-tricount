import React from "react";
import NavBarComponent from "../components/NavBarComponent";
import TricountListComponent from "../components/TricountListComponent";
import { useNavigate } from "react-router";
import * as PusherPushNotifications from "@pusher/push-notifications-web";
import { useLiveQuery } from "dexie-react-hooks";
import { db, dbRemote, sync } from "../utils/db.js";

const Home = () => {
  const tricounts = useLiveQuery(() => db.tricount.toArray());
  const navigate = useNavigate();

  const goToNewTricount = () => {
    navigate("/new-tricount");
  };



  React.useEffect(() => {
    window.navigator.serviceWorker.ready.then((serviceWorkerRegistration) => {
      const beamsClient = new PusherPushNotifications.Client({
        instanceId: "8dc0f2ef-508d-41cb-8402-e4758cdbe4a6",
        serviceWorkerRegistration: serviceWorkerRegistration,
      });
      beamsClient
        .start()
        .then(() => beamsClient.addDeviceInterest("debug-test"))
        .then(() => console.log("Successfully registered and subscribed!"))
        .then(() => beamsClient.getDeviceInterests())
        .then((interests) => console.log("Current interests:", interests))
        .catch(console.error);
    });
  }, []);

  return (
    <div className="w-full flex flex-col bg-zinc-900">
      <NavBarComponent />
      <div className="divide-y-2 divide-blue-300">
        {tricounts?.map((tricount, index) => (
          <TricountListComponent key={index} tricount={tricount} />
        ))}
      </div>
      <div
        className="flex justify-center items-center absolute bottom-2 right-2 h-14 w-14 cursor-pointer"
        onClick={goToNewTricount}
      >
        <img src="/add.png" alt="add button" />
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
