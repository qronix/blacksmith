import React, { useContext } from 'react';

import { GameContext } from '../../providers/game.provider';

import './forge-button.styles.scss';


const ForgeButton = () => {
    const {forgeItem} = useContext(GameContext);

    return(
        <div className='forge-button' onClick={forgeItem}/>
    );
}

export default ForgeButton;