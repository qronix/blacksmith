import React, { useContext, useMemo } from 'react';
import uuid from 'uuid';

import { GameContext } from '../../providers/game.provider';
import UpgradeItem from '../upgrade-item-container/upgrade-item.component';

import './upgrade-window.styles.scss';


const UpgradeWindow = ({ title })=> {

    const { toggleUpgrades, upgrades } = useContext(GameContext);

    const buildUpgrades = () => {
        let upgradeItems = [];
        for(let upgrade in upgrades){
            const { name, description, rank, cost, icon } = upgrades[upgrade];
            const item = <UpgradeItem info={{ name,description,rank,cost,icon }} key={ uuid() } id={ upgrade }/>;
            upgradeItems.push(item);
        }
        return upgradeItems;
    };

    return(
        <div className='upgrade-window'>
            {/* <div className='upgrade-window-image'/> */}
            <div className='upgrade-window-header'>
                <div className='upgrade-window-title'>
                    { title }
                </div>
                <div className='upgrade-window-close' onClick={ toggleUpgrades }/>
            </div>
            <div className='upgrade-window-items'>
                { buildUpgrades() }
            </div>
        </div>
    );
}

export default UpgradeWindow;