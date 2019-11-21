import React, {useContext} from 'react';
import uuid from 'uuid';

import {GameContext} from '../../providers/game.provider';
import UPGRADES from '../../upgrades';
import UpgradeItem from '../upgrade-item-container/upgrade-item.component';

import './upgrade-window.styles.scss';


const UpgradeWindow = ({title})=> {

    const {toggleUpgrades} = useContext(GameContext);

    const buildUpgrades = ()=>{
        let upgrades = [];
        for(let upgrade in UPGRADES){
            const {name, description, rank, cost, icon} = UPGRADES[upgrade];
            const item = <UpgradeItem info={{name,description,rank,cost,icon}} key={uuid} id={upgrade}/>;
            upgrades.push(item);
        }
        return upgrades;
    }

    return(
        <div className='upgrade-window'>
            <div className='upgrade-window-image'/>
            <div className='upgrade-window-header'>
                <div className='upgrade-window-title'>
                    {title}
                </div>
                <div className='upgrade-window-close' onClick={toggleUpgrades}/>
            </div>
            <div className='upgrade-window-items'>
                {buildUpgrades()}
            </div>
        </div>
    );
}

export default UpgradeWindow;