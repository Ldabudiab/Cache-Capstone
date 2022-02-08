// import firebase from "firebase/app";
// import "firebase/auth";

// const _apiUrl = "/api/userprofile";


// const _doesUserExist = (firebaseUserId) => {
//   return getToken().then((token) =>
//     fetch(`${_apiUrl}/DoesUserExist/${firebaseUserId}`, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     }).then(resp => resp.ok));
// };

// const _saveUser = (userProfile) => {
//   return getToken().then((token) =>
//     fetch(_apiUrl, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(userProfile)
//     }).then(resp => resp.json()));
// };


// export const getToken = () => {
//   const currentUser = firebase.auth().currentUser;
//   if (!currentUser) {
//     throw new Error("Cannot get current user. Did you forget to login?");
//   }
//   return currentUser.getIdToken();
// };



// export const login = (email, pw) => {
//   return firebase.auth().signInWithEmailAndPassword(email, pw)
//     .then((signInResponse) => _doesUserExist(signInResponse.user.uid))
//     .then((doesUserExist) => {
//       if (!doesUserExist) {

//         // If we couldn't find the user in our app's database, we should logout of firebase
//         logout();

//         throw new Error("Something's wrong. The user exists in firebase, but not in the application database.");
//       } else {
//         _onLoginStatusChangedHandler(true);
//       }
//     }).catch(err => {
//       console.error(err);
//       throw err;
//     });
// };


// export const logout = () => {
//   firebase.auth().signOut()
// };


// export const register = (userProfile, password) => {
//   return firebase.auth().createUserWithEmailAndPassword(userProfile.email, password)
//     .then((createResponse) => _saveUser({
//       ...userProfile,
//       firebaseId: createResponse.user.uid
//     }).then(() => _onLoginStatusChangedHandler(true)));
// };


// // This function will be overwritten when the react app calls `onLoginStatusChange`
// let _onLoginStatusChangedHandler = () => {
//   throw new Error("There's no login status change handler. Did you forget to call 'onLoginStatusChange()'?")
// };

// // This function acts as a link between this module.
// // It sets up the mechanism for notifying the react app when the user logs in or out.
// // You might argue that this is all wrong and you might be right, but I promise there are reasons,
// //   and at least this mess is relatively contained in one place.
// export const onLoginStatusChange = (onLoginStatusChangedHandler) => {

  
//   const unsubscribeFromInitialLoginCheck =
//     firebase.auth().onAuthStateChanged(function initialLoadLoginCheck(user) {
//       unsubscribeFromInitialLoginCheck();
//       onLoginStatusChangedHandler(!!user);

//       firebase.auth().onAuthStateChanged(function logoutCheck(user) {
//         if (!user) {
//           onLoginStatusChangedHandler(false);
//         }
//       });
//     });

//   // Save the callback so we can call it in the `login` and `register` functions.
//   _onLoginStatusChangedHandler = onLoginStatusChangedHandler;
// };

import firebase from "firebase/app";
import "firebase/auth";

const _apiUrl = "/api/userprofile";

const _doesUserExist = (firebaseUserId) => {
  return getToken().then((token) =>
    fetch(`${_apiUrl}/DoesUserExist/${firebaseUserId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(resp => resp.ok));
};

const _saveUser = (userProfile) => {
  return getToken().then((token) =>
    fetch(_apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userProfile)
    }).then(resp => resp.json()));
};

// const _saveUser = (userProfile) => {
//   return getToken().then((token) =>
//     fetch(_apiUrl, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(userProfile)
//     }).then(resp => resp.json()));
// };


export const getToken = () => firebase.auth().currentUser.getIdToken();


export const login = (email, pw) => {
  return firebase.auth().signInWithEmailAndPassword(email, pw)
    .then((signInResponse) => _doesUserExist(signInResponse.user.uid))
    .then((doesUserExist) => {
      if (!doesUserExist) {

        // If we couldn't find the user in our app's database, we should logout of firebase
        logout();

        throw new Error("Something's wrong. The user exists in firebase, but not in the application database.");
      }
    }).catch(err => {
      console.error(err);
      throw err;
    });
};


export const logout = () => {
  firebase.auth().signOut()
};


export const register = (userProfile, password) => {
  return firebase.auth().createUserWithEmailAndPassword(userProfile.email, password)
    .then((createResponse) => _saveUser({ 
      ...userProfile, 
      firebaseId: createResponse.user.uid 
    }));
};


export const onLoginStatusChange = (onLoginStatusChangeHandler) => {
  firebase.auth().onAuthStateChanged((user) => {
    onLoginStatusChangeHandler(!!user);
  });
};