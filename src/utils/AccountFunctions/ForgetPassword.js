import firebase from 'config/firebaseConfig';

export default ForgetPassword = async (email) => {
  try {
    const res = await firebase.auth().sendPasswordResetEmail(email);
  } catch (err) {
    //obsluga bledu
    console.log(err);
  }
};
