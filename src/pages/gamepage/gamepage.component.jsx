import React, { useContext } from 'react';

import './gamepage.styles.scss';

import { NetworkContext } from '../../network/network';

// import socket from '../../network/network';

import withAuthorization from '../../components/session/withAuthorization';

const GamePage = () => {

    const {doConnect} = useContext(NetworkContext);
    console.log('Starting socket!');
    // socket.connect();
    doConnect();
    return(
        <div className='gamepage'>
            <h1>GAME PAGE!</h1>
        </div>
    )
}

export default withAuthorization(GamePage);