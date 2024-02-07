import Dexie from "dexie";
import PouchDB from "pouchdb";
import 'dexie-observable';

window.global = window;

export const db = new Dexie("tricountDB");
db.version(3).stores({
  tricount: "++id, title, amount",
  user: "++id, name",
  expense: "++id, name, amount, tricountId",
  userTricount: "++id, userId, tricountId",
  depenseUser: "++id, userId, depenseId",
});

export const dbRemote = new PouchDB("http://207.154.213.42:5984/tricountDB");

export const sync = () => { 
  db.on("changes", function (changes) {
    // Handle changes here
    const json = {
      "_id": changes[0].key.toString(),
      "data": changes[0].obj,
    }
 
    dbRemote.post(json).then(function (response) {
      // handle response
      console.log(response);
    }
  ).catch(function (err) {
    console.log(err);
  }
  );
  });
}
 


// tricount id name amount description usersIds[] depensesIds[]
// user id name tricountIds[]
// depense id name amount description tricountId userIds[]
// userTricount id userId tricountId
// depenseUser id userId depenseId
