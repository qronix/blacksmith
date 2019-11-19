import React, {useContext} from 'react';

import {GameContext} from '../../providers/game.provider';


import './upgrade-window.styles.scss';


const UpgradeWindow = ({title})=> {

    const {toggleUpgrades} = useContext(GameContext);

    return(
        <div className='upgrade-window'>
            <div className='upgrade-window-image'/>
            <div className='upgrade-window-header'>
                <div className='upgrade-window-title'>
                    {title}
                </div>
                <div className='upgrade-window-close' onClick={toggleUpgrades}/>
            </div>
        </div>
    );
}

export default UpgradeWindow;