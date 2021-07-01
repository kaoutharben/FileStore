import React from "react";
import logo from "./../assets/images/logo.png";
import "./../assets/css/Header.css";
import { Link, useHistory } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import { auth } from "../util/firebase";

function Header() {
  const [{ user }] = useStateValue();
  const history = useHistory();
  const logInOut = (e) => {
    e.preventDefault();
    if (user) {
      auth.signOut();
      history.push('/')
    } else {
      history.push("/login");
    }
  };
  const price=(e)=>{
    e.preventDefault();
    history.push('/price');
    console.log('hoooooooooo')
  }

  return (
    <div className="header">
      <Link className="link__header" to="/">
        <div className="header__left">
          <img className="logo__header" src={logo} alt="logo" />

          <div className="tiltle__container">
            <span className="home__name1">File </span>
            <span className="home__name2">Server</span>
          </div>
        </div>
      </Link>
      {user ? (
        <div className="header__right">
          <Link className="link__header" to='/profile'>
            <div className="header__option">
              <span className="header__optionLineOne">
                Hello {user.displayName}
              </span>
              <span className="header__optionLineTwo">Profile</span>
            </div>
          </Link>
          
          <button className="button"  onClick={logInOut} >
            Log Out
          </button>
         
          <button onClick={price} className="button__pric">Pricing</button>
          
        </div>
      ) : (
        <div className="header_rightMin">
          <button className="button" onClick={logInOut}>
            Log In
          </button>
          <button onClick={price}  className="button__pric">Pricing</button>
        </div>
      )}
    </div>
  );
}

export default Header;
