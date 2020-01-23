import React, { useContext } from 'react';

import './gamepage.styles.scss';

// import { NetworkContext } from '../../network/network';

import {connect} from '../../network/socket';


import withAuthorization from '../../components/session/withAuthorization';

const GamePage = () => {

    // const { doConnect } = useContext(NetworkContext);
    // doConnect();
    connect();
    return(
        <div className='gamepage'>
            <h1>GAME PAGE!</h1>
        </div>
    )
}

export default withAuthorization(GamePage);