import React, { createContext, useState, useEffect } from 'react';

// import { USER } from '../firebase/firebase.utils';

export const UserContext = createContext({
    user:{},
    updateUser: ()=>{},
});

const UserProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    //auth user when status changes

    useEffect(()=>{

    },[user]);

    const updateUser = userData => {
        setUser({ ...userData });
    }

    return(
        <UserContext.Provider
            value={{
                user,
                updateUser,
            }}
        >
            { children }
        </UserContext.Provider>
    );
}

export default UserProvider;