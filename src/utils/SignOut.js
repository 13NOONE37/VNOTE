import firebase from 'config/firebaseConfig';
import { Redirect } from 'react-router-dom';

export default async function SignOut() {
  try {
    await firebase.auth().signOut();
  } catch (err) {
    console.log(err);
  }
  <Redirect to='/authentication' />;
}
