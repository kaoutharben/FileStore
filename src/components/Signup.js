import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import logo from './../assets/images/logoUp.png';
import './../assets/css/Login.css';
import Socialnsc from "./shared/Socialnsc";
import {auth} from './../util/firebase';

function Login() {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const signUp = e => {
        e.preventDefault();
        if(name===''){

            alert('Please provide your username!')
        }
        else{
            auth
        .createUserWithEmailAndPassword(email, password)
        .then((auth) => {

            auth.user.updateProfile({
                displayName: name,
              }).then(() => {

                
                history.push('/')
              }); 
            
        })
        .catch(error => alert(error.message));
        }
        


    }
    return (
        <div className='login'>
             <Link to='/'>
                <img className="login__logo" src={logo} alt='logo_login' />
            </Link>
            

            <div className='login__container'>
                <h1>Sign-Up:</h1>
                <Socialnsc />

                <form>
                    <h5>Username</h5>
                    <input type='text' value={name} onChange={e => setName(e.target.value)} />

                    <h5>E-mail</h5>
                    <input type='email' value={email} onChange={e => setEmail(e.target.value)} />

                    <h5>Password</h5>
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)} />

                    <button type='submit' onClick={signUp} className='login__signInButton'>Sign Up</button>
                </form>
                <p>
                    Alreadey a memeber?<Link className='link__form' to='/login'> Log In</Link>.
                </p>


    
            </div>
        </div>
    )
}

export default Login
