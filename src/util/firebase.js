import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBHf39nxja-2R3RQOPDnx-Oh2KP5uj_UD0",
  authDomain: "filestore-4f731.firebaseapp.com",
  projectId: "filestore-4f731",
  storageBucket: "filestore-4f731.appspot.com",
  messagingSenderId: "1000048954408",
  appId: "1:1000048954408:web:6a16c1116a50e324a2b91d",
  measurementId: "G-CHV816Y3YP"
};
  
  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage =firebase.storage();

  export { db, auth, storage};