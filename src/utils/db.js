import PouchDB from "pouchdb";
import PouchDBAdapterIDB from "pouchdb-adapter-idb";
import { debounce } from 'lodash';


// Ajouter l'adaptateur IndexedDB à PouchDB
PouchDB.plugin(PouchDBAdapterIDB);

window.global = window;

// Créer la base de données locale avec l'adaptateur IndexedDB
export const db = new PouchDB("tricountDB", { adapter: "idb" });

// Créer la référence à la base de données distante
export const remoteCouch = new PouchDB("http://207.154.213.42:5984/tricountDB");

export const sendNotif = debounce(() => {
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
}, 10000);

function filterChanges(change) {
  // Vérifier si le document n'est pas marqué comme supprimé
  if (!change.deleted) {
    return true; // Traiter le changement
  }
  return false; // Ignorer le changement
}

// Fonction de synchronisation avec des logs améliorés
export const sync = () => {
  // Synchronisation avec la base de données distante
  var opts = { live: true, retry: true };

  const remoteSyncHandler = db
    .sync(remoteCouch, opts)
    .on("change", function (change) {
      // Réagir aux changements distants si nécessaire
      console.log("Remote change detected:", change);
    });

  db.changes({ include_docs: true }).on("change", function (change) {
    if (filterChanges(change)) {
      sendNotif()
      db.replicate.to(remoteCouch);
    }
  });
};

sync();
