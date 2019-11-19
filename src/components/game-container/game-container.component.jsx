import React, {useContext} from 'react';

import ItemGrid from '../item-grid/item-grid.component';
import InfoContainer from '../info-container/info-container.component';
// import ForgeButton from '../forge-button/forge-button.component';
import UpgradeWindow from '../upgrade-window/upgrade-window.component';
import CustomModal from '../custom-modal/custom-modal.component';
import CustomButton from '../custom-button/custom-button.component';
import UpgradeContainer from '../upgrade-container/upgrade-container.component';
import {GameContext} from '../../providers/game.provider';

import './game-container.styles.scss';

const GameContainer = () => {
    const {gridItems, mergeItems, forgeItem, upgradesShown} = useContext(GameContext);
    return(
        <div className='game-container'>
            <div className='game-container-background'/>
            <div className='game-container-background-fade'/>
            <InfoContainer/>
            <ItemGrid gridItems={gridItems} mergeItems={mergeItems}/>
            {/* <ForgeButton/> */}
            <CustomButton img='/imgs/forgeButton.png' action={forgeItem} large/>
            {upgradesShown ?
                (<CustomModal>
                    <UpgradeWindow title='Upgrades'/>
                </CustomModal>)
                :
                null
            }
            <UpgradeContainer/>
        </div>
    );
}

export default GameContainer;