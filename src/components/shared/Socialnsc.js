import React from "react";
import firebase from "firebase/app";
import { useHistory } from "react-router-dom";
import "./../../assets/css/Socialnsc.css";
import google from "./../../assets/images/google.png";
import face from "./../../assets/images/face.png";
import { auth } from "./../../util/firebase";

function Socialnsc() {
  const history = useHistory();

  const signInWithGoogle = (e) => {
    e.preventDefault();
    var googleProvider = new firebase.auth.GoogleAuthProvider();
    auth
      .signInWithPopup(googleProvider)
      .then((auth) => {
        history.push("/");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const signInWithFacebook = (e) => {
    e.preventDefault();
    var Facebookprovider = new firebase.auth.FacebookAuthProvider();
    firebase
      .auth()
      .signInWithPopup(Facebookprovider)
      .then((auth) => {
        history.push("/");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="socialnsc">
      <div className="container">
        <img
          className="login_icon"
          src={face}
          alt="facebook icon"
          onClick={signInWithFacebook}
        />
        <img
          className="login_icon"
          src={google}
          alt="gmail icon"
          onClick={signInWithGoogle}
        />
      </div>
      <div className="container">
        <div className="extrem"></div>
        <div className="or">or</div>
        <div className="extrem"></div>
      </div>
    </div>
  );
}

export default Socialnsc;
