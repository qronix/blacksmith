import React, { useEffect, useState } from 'react';

import { Redirect } from 'react-router-dom';
import { withAuthorization, UserContext } from '../../components/session';


const LogoutPage = props =>  {

    const [isLoggedOut, setIsLoggedOut] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(()=>{
        const doLogout = async () => {
            try{
                await props.firebase.doSignOut();
                if(isMounted)
                setIsLoggedOut(true);
            }catch(err){
                if(isMounted)
                setIsLoggedOut(false);
            }
        }
        setIsMounted(true);
        doLogout();
        return setIsMounted(false);
    },[]);



    return(
        isLoggedOut ? (<h2>You have been logged out</h2>) : (<h2>Could not log out</h2>)
    )
}

export default withAuthorization(LogoutPage);