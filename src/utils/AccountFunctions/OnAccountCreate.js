import firebase from 'config/firebaseConfig';

export default async function OnAccountCreate(user) {
  const db = firebase.firestore();
  // db.settings({ timestampsInSnapshots: true, merge: true });
  console.log('onAccountCreate');
  db.collection('users')
    .doc(user.uid)
    .set({
      username: user.username | null,
      email: user.email,
      notes: [],
      notebooks: [],
      categories: [],
    })
    .catch((err) => {
      console.log('Error from OnAccountCreate: ', err.message);
    });
}
