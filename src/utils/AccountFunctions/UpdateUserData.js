import firebase from 'config/firebaseConfig';

export default async function UpdateUserData(
  user,
  notes,
  notebooks,
  categoriesTable,
) {
  const db = firebase.firestore();
  // db.settings({ timestampsInSnapshots: true, merge: true });
  await db
    .collection('users')
    .doc(user.uid)
    .update({
      categories: categoriesTable,
      notes: notes,
      notebooks: notebooks,
    })
    .catch((err) => {
      // console.log(`Err: ${err.message}`);
    });
}
