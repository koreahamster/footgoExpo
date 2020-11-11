import React, { createContext } from "react";
import firebase, { database } from "firebase";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from "../config/firebase";

const FirebaseContext = createContext();

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();
const Firebase = {
  getCurrentUser: () => {
    return firebase.auth().currentUser;
  },
  createUser: async (user) => {
    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password);
        
      const uid = Firebase.getCurrentUser().uid;

      let profilePhotoUrl = "default";

      await db.collection("users").doc(uid).set({
        username: user.username,
        email: user.email,
        profilePhotoUrl,
      });
      if (user.profilePhoto) {
        profilePhotoUrl = await Firebase.uploadProfilePhoto(user.profilePhoto);
      }

      delete user.password;
      return { ...user, profilePhotoUrl, uid };
    } catch (error) {
      window.alert(error.message);
      console.log("Error @createUser:", error.message);
    }
  },
  uploadProfilePhoto: async (uri) => {
    const uid = Firebase.getCurrentUser().uid;
    try {
      const photo = await Firebase.getBlob(uri);
      const imageRef = firebase.storage().ref("profilePhotos").child(uid);
      await imageRef.put(photo);

      const url = await imageRef.getDownloadURL();

      await db.collection("users").doc(uid).update({
        profilePhotoUrl: url,
      });
      return url;
    } catch (error) {
      window.alert(error.message);
      console.log("Error @uploadProfilePhoto:", error.message);
    }
  },
  getBlob: async (uri) => {
    return await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest(); //확인 필요

      xhr.onload = () => {
        resolve(xhr.response);
      };
      xhr.onerror = () => {
        reject(new TypeError("Network request failed."));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
  },
  getUserInfo: async (uid) => {
    try {
      const user = await db.collection("users").doc(uid).get();

      if (user.exists) {
        return user.data();
      }
    } catch (error) {
      console.log("Error @getUserInfo: ", error);
    }
  },
  logOut: async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.log("Error @logOut: ", error);
    }
    return true;
  },
  signIn: async (email, password) =>{
      const provider = firebase.auth.EmailAuthProvider;
      const authCredential = provider.credential(email, password);
      return await firebase.auth().signInWithCredential(authCredential);
    //return firebase.auth().signInWithEmailAndPassword(email,password)
  }
};

const FirebaseProvider = (props) => {
  return (
    <FirebaseContext.Provider value={Firebase}>
      {props.children}
    </FirebaseContext.Provider>
  );
};

export { FirebaseContext, FirebaseProvider };
