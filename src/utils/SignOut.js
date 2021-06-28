import firebase from 'config/firebaseConfig';
import Redirect from 'react-router-dom';

export default SignOut = async () => {
  try {
    await firebase.auth().signOut();
  } catch (err) {
    console.log(err);
  }
  <Redirect to='/authentication' />;
};
