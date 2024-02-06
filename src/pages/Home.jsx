import React from "react";
import NavBarComponent from "../components/NavBarComponent";
import TricountListComponent from "../components/tricountListComponent";
import { useNavigate } from "react-router";
import * as PusherPushNotifications from "@pusher/push-notifications-web";

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

  const beamsClient = new PusherPushNotifications.Client({
    instanceId: '8dc0f2ef-508d-41cb-8402-e4758cdbe4a6',
  });

  beamsClient.start()
    .then(() => beamsClient.addDeviceInterest('hello'))
    .then(() => console.log('Successfully registered and subscribed!'))
    .catch(console.error);

  return (
      <div className='w-full flex flex-col bg-zinc-900'>
        <NavBarComponent />
        <div className="divide-y-2 divide-blue-300">
        {tricounts.map((tricount, index) => (
          <TricountListComponent key={index} tricount={tricount} />
        ))}
      </div>
        <div className='flex justify-center items-center absolute bottom-2 right-2 h-14 w-14 cursor-pointer' onClick={goToNewTricount}>
            <img src="/add.png" alt="add button"/>
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
