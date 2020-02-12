import React, { useEffect, useState, useContext } from 'react';

import { withAuthorization, } from '../../components/session';

import { NetworkContext } from '../../network/network';

import { logout } from '../../api/api';

const LogoutPage = props =>  {

    const [isLoggedOut, setIsLoggedOut] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const { doDisconnect } = useContext(NetworkContext);
    
    useEffect(() => {
        const doLogout = async () => {
            try{
                await props.firebase.doSignOut();
                await logout();
                // if(isMounted)
                // setIsLoggedOut(true);
            }catch(err){
                // if(isMounted)
                // setIsLoggedOut(false);
            }
        }
        setIsMounted(true);
        doLogout();
        return () => {
            setIsMounted(false);
        };
    },[]);

    // useEffect(() => {
    //     doDisconnect();
    // },[]);



    return(
        // isLoggedOut ? (<h2>You have been logged out</h2>) : (<h2>Could not log out</h2>)
        props.history.push('/'),
        null
    )
}

export default withAuthorization(LogoutPage);