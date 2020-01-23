import React , {createContext} from 'react';

import {connect, disconnect} from './socket';

export const NetworkContext = createContext({
    doConnect: ()=>{},
    doDisconnect: ()=>{},
});

const NetworkProvider = ({ children }) => {

    const doConnect = () => {
        console.log('opening connection');
        connect();
    };

    const doDisconnect = () => {
        console.log('disconnecting');
        disconnect();
    };

    return(
        <NetworkContext.Provider
            value = {{
                doConnect,
                doDisconnect,
            }}
        >
            { children }
        </NetworkContext.Provider>
    )
}

export default NetworkProvider;