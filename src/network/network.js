import React , {createContext} from 'react';

import io from 'socket.io-client';


export const NetworkContext = createContext({
    doConnect: ()=>{},
    doDisconnect: ()=>{},
    socket:null
});
const socket = io('/game', { autoConnect: false });

const NetworkProvider = ({ children })=>{

    socket.on('connect', () => console.log('Socket connected to server!'));
    socket.on('disconnect', () => console.log('Socket connection closed'));

    const doConnect = () => {
        console.log('opening connection');
        socket.open();
    };

    const doDisconnect = () => {
        console.log('disconnecting');
        console.log('socket: ', socket);
        socket.close();
        console.log('socket after close: ', socket);
    };

    return(
        <NetworkContext.Provider
            value = {{
                doConnect,
                doDisconnect,
                socket
            }}
        >
            { children }
        </NetworkContext.Provider>
    )
}

export default NetworkProvider;