import Dexie from "dexie";

export const db = new Dexie("tricountDB");
db.version(1).stores({
  tricount: "++id, name, amount",
  user: "++id, name",
  depense: "++id, name, amount, description, tricountId",
  userTricount: "++id, userId, tricountId",
  depenseUser: "++id, userId, depenseId",
});

// tricount id name amount description usersIds[]
// user id name tricountIds[]
// depense id name amount description tricountId userIds[]
// userTricount id userId tricountId
// depenseUser id userId depenseId
