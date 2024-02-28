import PouchDB from "pouchdb";

window.global = window;
export const db = new PouchDB("tricountDB");

export const remoteCouch = new PouchDB("http://207.154.213.42:5984/tricountDB");

function sync() {
  var opts = { live: true };
  db.sync(remoteCouch, opts, syncError);
}
