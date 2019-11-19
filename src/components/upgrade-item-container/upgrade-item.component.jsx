import React from 'react';
import uuid from 'uuid';

import './upgrade-item.styles.scss';

const UpgradeItem = ({info})=> {
    const {
        name, 
        description,
        rank, 
        cost, 
        costDelta, 
        effects, 
        icon
    } = info;

    return(
        <div className='upgrade-item' key={uuid}>
            <div className='upgrade-item-icon-container'>
                <img src={icon} alt='item icon' className='upgrade-item-icon'></img>
                <span>{rank}</span>
            </div>
            <div className='upgrade-item-info'>
                <h6>{name}</h6>
                <p>{description}</p>
            </div>
            <div className='upgrade-button-container'>
                <img src='/imgs/coin.png' alt='coin'/>
                <span>{cost}</span>
            </div>
        </div>
    )
}

export default UpgradeItem;