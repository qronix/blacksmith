import React from 'react';

import './gamepage.styles.scss';

import withAuthorization from '../../components/session/withAuthorization';

const GamePage = () => {
    console.log('Game page!');
    return(
        <div className='gamepage'>
            <h1>GAME PAGE!</h1>
        </div>
    )
}

export default withAuthorization(GamePage);