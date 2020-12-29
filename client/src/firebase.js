import firebase from "firebase";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCusPxGrNjhUMcuCnoQF7vORQi4LtTqzvs",
  authDomain: "ecommerce-212.firebaseapp.com",
  projectId: "ecommerce-212",
  storageBucket: "ecommerce-212.appspot.com",
  messagingSenderId: "1090828554656",
  appId: "1:1090828554656:web:267f111a870c0fa9fed4c5",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
