import React from 'react';
import './../assets/css/Home.css';
import {  useHistory } from "react-router-dom";
import { useStateValue } from "./../StateProvider"

function Home() {
    const [{ user }] = useStateValue();
    const history=useHistory();
    const handlerSignUp= e=>{
        e.preventDefault();
        if(user)
            history.push('/dashboard');
        else
            history.push('/signup');

        
    }
    return (
        <div className='home'>
           <img className="back__home" src="https://www.iaea.org/sites/default/files/styles/half_page_width_landscape_16_9/public/recordsmanagementpilotproject1964017.jpg?itok=WBiabMOk" alt="backGround" />
           <div className='home__descr'>
                <h1>Flexible media storage</h1>
                <h3>Secure, scalable cloud storage</h3>
                <h2>Why waste valuable storage space on your PC or phone when you can store your documents in the cloud and share it across devices?</h2>
                <button onClick={handlerSignUp}>Let's Start</button>
            </div>
        </div>
    )
}

export default Home
