import firebase from 'config/firebaseConfig';
import OnAccountCreate from 'utils/OnAccountCreate';

export default SignUp = async (email, username, password) => {
  try {
    const res = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    //!TODO nadac userowi nick
    OnAccountCreate(res.user); //docelowo zlikwidowac i zastapic triggerem w check session ktory wywouluje sie na utworzenie konta
  } catch (err) {
    //osblusa bledu
    console.log(err);
  }
};
