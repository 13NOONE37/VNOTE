import firebase from 'config/firebaseConfig';
import OnAccountCreate from 'utils/AccountFunctions/OnAccountCreate';

export default async function SignUp(email, password) {
  try {
    const res = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    //!TODO nadac userowi nick
    OnAccountCreate(res.user); //docelowo zlikwidowac i zastapic triggerem w check session ktory wywouluje sie na utworzenie konta
  } catch (err) {
    return err;
  }
}
