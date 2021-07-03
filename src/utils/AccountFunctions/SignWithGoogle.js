import firebase from 'config/firebaseConfig';

//!TODO zamienic na async await

export default function signInWithGoogle(setLoggedIn, setuser) {
  let provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithRedirect(provider);

  firebase
    .auth()
    .getRedirectResult()
    .then((res) => {
      if (res.credential) {
        let credential = res.credential;

        let token = credential.accessToken;

        let user = res.user;

        setLoggedIn(true);
        setuser(user);
      }
    })
    .catch((error) => {
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
      let email = error.email;
      let credential = error.credential;
      console.log(`Sign up google error: ${error}`);
    });
}
