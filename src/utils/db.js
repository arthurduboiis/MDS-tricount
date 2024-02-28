import PouchDB from "pouchdb";

window.global = window;
export const db = new PouchDB("tricountDB");

export const remoteCouch = new PouchDB("http://207.154.213.42:5984/tricountDB");

export const sync = () => {
  var opts = { live: true };
  db.sync(remoteCouch, opts);
  fetch("http://207.154.213.42:3000/sync", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
};
