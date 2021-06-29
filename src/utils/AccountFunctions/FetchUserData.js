import firebase from 'config/firebaseConfig';

export default async function FetchUserData(
  user,
  setnotes,
  setnotebooks,
  setcategoriesTable,
) {
  const db = firebase.firestore();
  // db.settings({ timestampsInSnapshots: true, merge: true });
  console.log('fetchUserData');
  if (user) {
    const res = await db.collection('users').doc(user.uid).get();
    if (!res.exists) {
      //instead this show notification
      console.log('No such document');
    } else {
      // console.log('Document data:', res.data());

      setnotes(res.data().notes);
      setnotebooks(res.data().notebooks);
      setcategoriesTable(res.data().categories);
    }
  }
}
