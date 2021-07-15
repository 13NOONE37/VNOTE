import firebase from 'config/firebaseConfig';
import OnAccountCreate from './OnAccountCreate';

//!TODO zamienic na async await

export default function signInWithGoogle(setLoggedIn, setuser) {
  let provider = new firebase.auth.GoogleAuthProvider();

  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      var credential = result.credential;

      console.log(result.user.metadata.a, result.user.metadata.b);
      if (result.user.metadata.a == result.user.metadata.b) {
        console.log(
          'if statement🐀',
          result.user.metadata,
          result.user.metadata.a,
          result.user.metadata.b,
        );
        OnAccountCreate(result.user);
      } else {
        console.log('else statement');
      }

      setLoggedIn(true);
      setuser(result.user);
    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
    });
}
