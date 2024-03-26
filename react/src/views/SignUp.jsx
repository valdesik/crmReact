import React, {useRef, useState} from 'react';
import {Link} from "react-router-dom";
import axiosClient from "../axios-client/axios-client.js";
import {useStateContext} from "../contexts/ContextProvider.jsx";

function SignUp(props) {
    const {setUser, setToken} = useStateContext();
    const [errors, setErrors] = useState(null);
    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmationRef = useRef()

    const onSubmit = (event) => {
        event.preventDefault()
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value
        }
        axiosClient.post('/signup', payload)
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
                <form onSubmit={onSubmit}>
                    <h1 className='title'>Sign up for free </h1>
                    {errors && <div className='alert'>
                        {Object.keys(errors).map(key => (
                            <>
                                <div key={key}>{errors[key]}</div>
                            </>
                        ))}
                    </div>}
                    <input ref={nameRef} type='text' placeholder='full name'/>
                    <input ref={emailRef} type='email' placeholder='email'/>
                    <input ref={passwordRef} type='password' placeholder='password'/>
                    <input ref={passwordConfirmationRef} type='password' placeholder='password confirmation'/>
                    <button className='btn btn-block'>Signup</button>
                    <p className='message'>
                        Already Registered? <Link to='/login'>Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
