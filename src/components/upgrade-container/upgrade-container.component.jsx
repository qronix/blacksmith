import React, { useContext } from 'react';

import CustomButton from '../custom-button/custom-button.component';
import { GameContext } from '../../providers/game.provider';

import './upgrade-container.styles.scss';

const UpgradeContainer = () => {
    const { toggleUpgrades } = useContext(GameContext);

    return(
        <div className='upgrade-container'>
            <CustomButton img='/imgs/button.png' text='Upgrade' action={ toggleUpgrades }/>
            <CustomButton img='/imgs/button.png' text='Shop'/>
        </div>
    );
}

export default UpgradeContainer;