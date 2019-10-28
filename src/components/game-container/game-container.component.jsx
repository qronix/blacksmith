import React from 'react';

import ItemGrid from '../item-grid/item-grid.component';
import InfoContainer from '../info-container/info-container.component';
import ForgeButton from '../forge-button/forge-button.component';

import './game-container.styles.scss';

const GameContainer = ()=> {
    return(
        <div className='game-container'>
            <div className='game-container-background'/>
            <InfoContainer/>
            <ItemGrid/>
            <ForgeButton/>
        </div>
    );
}

export default GameContainer;