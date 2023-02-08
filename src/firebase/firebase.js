import { db } from "./firebaseInit";

import { collection, getDocs } from "firebase/firestore";

async function getPlayersFromFirease() {
  const querySnapshot = await getDocs(collection(db, "players"));
  const notesArray = [];
  querySnapshot.forEach((doc) => {
    let note = {
      id: doc.id,
      content: doc.data().content,
    };
    notesArray.unshift(note);
  });

  return notesArray;
}

export { getPlayersFromFirease };
