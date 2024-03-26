import React, {useRef, useState} from 'react';
import {Link} from "react-router-dom";
import axiosClient from "../axios-client/axios-client.js";
import {useStateContext} from "../contexts/ContextProvider.jsx";

function Login(props) {
    const {setUser, setToken} = useStateContext();
    const [errors, setErrors] = useState(null);
    const emailRef = useRef()
    const passwordRef = useRef()
    const onSubmit = (event) => {
        event.preventDefault()
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }
        axiosClient.post('/login', payload)
            .then(({data}) => {
                setUser(data.user)
                setToken(data.token)
            })
            .catch(err => {
                const response = err.response
                if (response && response.status == 422) {
                    console.log(response.data.errors)
                    setErrors(response.data.errors)
                }
            })
    }
    return (
        <div className='login-signup-form animated fadeInDown'>
            <div className='form'>
                <form onSubmit={onSubmit} >
                    <h1 className='title'>Login into your account </h1>
                    {errors && <div className='alert'>
                        {Object.keys(errors).map(key => (
                            <>
                                <div key={key}>{errors[key]}</div>
                            </>
                        ))}
                    </div>}
                <input ref={emailRef} type='email' placeholder='email'/>
                <input ref={passwordRef} type='password' placeholder='password'/>
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
