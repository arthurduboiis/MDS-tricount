import Dexie from "dexie";

export const db = new Dexie("tricountDB");
db.version(2).stores({
  tricount: "++id, title, amount",
  user: "++id, name",
  expense: "++id, name, amount, tricountId",
  userTricount: "++id, userId, tricountId",
  depenseUser: "++id, userId, depenseId",
});

// tricount id name amount description usersIds[] depensesIds[]
// user id name tricountIds[]
// depense id name amount description tricountId userIds[]
// userTricount id userId tricountId
// depenseUser id userId depenseId
