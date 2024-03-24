import React from 'react';
import {Link} from "react-router-dom";

function Login(props) {

    const onSubmit = (event) => {
        event.preventDefault()
    }
    return (
        <div className='login-signup-form animated fadeInDown'>
            <div className='form'>
                <form onSubmit={onSubmit} >
                    <h1 className='title'>Login into your account </h1>
                <input type='email' placeholder='emeil'/>
                <input type='password' placeholder='password'/>
                    <button className='btn btn-block'>Login</button>
                    <p className='message'>
                        Not Registered? <Link to='/signup'>Create an account</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;
