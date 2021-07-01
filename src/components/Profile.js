import React, {  useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./../assets/css/Profile.css";
import "./../assets/css/Login.css";
import logo from "./../assets/images/logoUp.png";
import { auth } from "./../util/firebase";

function Profile() {
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const history = useHistory();

 

  const updateName = (e) => {
    e.preventDefault();
    auth.currentUser
      .updateProfile({
        displayName: name,
      })
      .then(() => {
        history.push("/profile");
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  const updateEmail = (e) => {
    e.preventDefault();
    auth.currentUser
      .updateEmail(email)
      .then(() => {
        history.push("/profile");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const updatePassword = (e) => {
    e.preventDefault();
    auth.currentUser
      .updatePassword(password)
      .then(() => {
        history.push("/profile");
      })
      .catch((error) => {
        alert(error.message);
        history.push('/')
      });
  };
  const logOut=e=>{
      e.preventDefault();
      auth.signOut();
      history.push('/')
  }

  return (
    <div className="profile">
      <Link to="/">
        <img className="login__logo" src={logo} alt="logo" />
      </Link>

      <div className="login__container">
        <h1>Update your Profile:</h1>

        <form>
          <h5>Username</h5>
          <input
            type="text"
            placeholder={auth.currentUser?.displayName}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className="update__but" onClick={updateName}>
            {" "}
            Change your Username
          </button>

          <h5>E-mail</h5>
          <input
            type="email"
            placeholder={auth.currentUser?.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="update__but" onClick={updateEmail}>
            {" "}
            Change your Email
          </button>

          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="update__but" onClick={updatePassword}> Change your Password</button>
        </form>
        <button onClick={logOut} className='logout__button'>Log Out</button>
      </div>
    </div>
  );
}

export default Profile;
