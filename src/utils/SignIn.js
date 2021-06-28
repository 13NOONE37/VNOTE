import firebase from 'config/firebaseConfig';
import Redirect from 'react-router-dom';

export default SignIn = async (email, password, setLoggedIn, setuser) => {
  const res = await firebase.auth().signInWithEmailAndPassword(email, password);

  if (res.user) {
    setLoggedIn(true);
    setuser(res.user);
    <Redirect to='/' />;
  } else {
    //obsluga bledu zwracanie wiadomosci
    return 'Something went wrong';
  }
};
