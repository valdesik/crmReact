import React, {useEffect} from 'react';
import {Link, Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import axiosClient from "../axios-client/axios-client.js";

function DefaultLayout(props) {
    const {user, token, setUser} = useStateContext()
    if (!token) {
        return <Navigate to='/login'/>
    }

    const onLogOut = (event) => {
        event.preventDefault()
    }

    useEffect( () => {
        axiosClient.get('/user')
            .then(({data}) => {
                setUser(data)
        })
    },[])

    return (
        <div id='defaultLayout'>
            <aside>
                <Link to='/dashboard'>Dashboard</Link>
                <Link to='/users'>Users</Link>
            </aside>
            <div className='content'>
                <header>
                    <div>Header</div>
                    <div>{user.name}
                        <a href="#" onClick={onLogOut} className='btn-logout'>Logout</a>
                    </div>
                </header>
                <main>
                    <Outlet/>
                </main>
            </div>

        </div>
    );
}

export default DefaultLayout;
