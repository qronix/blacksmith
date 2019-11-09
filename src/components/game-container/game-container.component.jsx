import React, {useContext} from 'react';

import ItemGrid from '../item-grid/item-grid.component';
import InfoContainer from '../info-container/info-container.component';
import ForgeButton from '../forge-button/forge-button.component';
import {GameContext} from '../../providers/game.provider';

import './game-container.styles.scss';

const GameContainer = () => {
    const {gridItems} = useContext(GameContext);

    return(
        <div className='game-container'>
            <div className='game-container-background'/>
            <InfoContainer/>
            <ItemGrid gridItems={gridItems}/>
            <ForgeButton/>
        </div>
    );
}

export default GameContainer;