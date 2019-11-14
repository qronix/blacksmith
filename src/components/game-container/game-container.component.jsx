import React, {useContext} from 'react';

import ItemGrid from '../item-grid/item-grid.component';
import InfoContainer from '../info-container/info-container.component';
// import ForgeButton from '../forge-button/forge-button.component';
import CustomButton from '../custom-button/custom-button.component';
import UpgradeContainer from '../upgrade-container/upgrade-container.component';
import {GameContext} from '../../providers/game.provider';

import './game-container.styles.scss';

const GameContainer = () => {
    const {gridItems, mergeItems, forgeItem} = useContext(GameContext);

    return(
        <div className='game-container'>
            <div className='game-container-background'/>
            <InfoContainer/>
            <ItemGrid gridItems={gridItems} mergeItems={mergeItems}/>
            {/* <ForgeButton/> */}
            <CustomButton img='/imgs/forgeButton.png' action={forgeItem} large/>
            <UpgradeContainer/>
        </div>
    );
}

export default GameContainer;