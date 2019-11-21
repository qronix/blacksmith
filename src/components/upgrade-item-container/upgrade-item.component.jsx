import React, {useContext} from 'react';
import uuid from 'uuid';

import {formatNumber} from '../../utils/utils';
import {GameContext} from '../../providers/game.provider';

import './upgrade-item.styles.scss';

const UpgradeItem = ({info, id})=> {
    const {
        name, 
        description,
        rank, 
        cost, 
        // costDelta, 
        // effects, 
        icon
    } = info;

    const {purchaseUpgrade} = useContext(GameContext);

    return(
        <div className='upgrade-item' key={uuid}>
            <div className='upgrade-item-icon-container'>
                <img src={icon} alt='item icon' className='upgrade-item-icon'></img>
                <span>{rank}</span>
            </div>
            <div className='upgrade-item-info'>
                <h5>{name}</h5>
                <p>{description}</p>
            </div>
            <div className='upgrade-button-container' onClick={()=>purchaseUpgrade(id)}>
                <img src='/imgs/coin.png' alt='coin'/>
                <span>{formatNumber(cost)}</span>
            </div>
        </div>
    )
}

export default UpgradeItem;