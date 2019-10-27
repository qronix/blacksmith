import React from 'react';

import ItemGrid from '../item-grid/item-grid.component';

import './game-container.styles.scss';

const GameContainer = ()=> {
    return(
        <div className='game-container'>
            <div className='game-container-background'/>
            <ItemGrid/>
        </div>
    );
}

export default GameContainer;