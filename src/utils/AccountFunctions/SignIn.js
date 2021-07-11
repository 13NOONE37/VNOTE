import firebase from 'config/firebaseConfig';
import { Redirect } from 'react-router-dom';

export default async function SignIn(email, password, setLoggedIn, setuser) {
  try {
    const res = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    if (res.user) {
      setLoggedIn(true);
      setuser(res.user);
      <Redirect to='/' />;
    }
  } catch (err) {
    return err;
  }
}
