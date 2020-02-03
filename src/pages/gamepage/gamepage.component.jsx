import React, { useContext } from 'react';

import GameContainer from '../../components/game-container/game-container.component';

import GameProvider from '../../providers/game.provider';

import './gamepage.styles.scss';

// import { NetworkContext } from '../../network/network';

// import { connect } from '../../network/socket';


import withAuthorization from '../../components/session/withAuthorization';

const GamePage = () => {

    // const { doConnect } = useContext(NetworkContext);
    // doConnect();
    // connect();
    return(
        <div className='gamepage'>
            <GameProvider>
                <GameContainer/>
            </GameProvider>
        </div>
    )
}

export default withAuthorization(GamePage);