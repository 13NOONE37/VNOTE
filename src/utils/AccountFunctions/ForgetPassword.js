import firebase from 'config/firebaseConfig';

export default async function ForgetPassword(email) {
  try {
    const res = await firebase.auth().sendPasswordResetEmail(email);
  } catch (err) {
    return err;
  }
}
