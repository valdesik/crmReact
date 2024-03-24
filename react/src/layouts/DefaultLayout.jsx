import React from 'react';
import {Link, Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider.jsx";

function DefaultLayout(props) {
    const {user, token} = useStateContext()
    if (!token) {
        return <Navigate to='/login'/>
    }

    const onLogOut = (event) => {
        event.preventDefault()
    }

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
