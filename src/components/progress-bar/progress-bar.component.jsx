import React, { useContext } from 'react';

import { GameContext } from '../../providers/game.provider';

import './progress-bar.styles.scss';

const ProgressBar = () => {
    
    const { currentForgeProgress } = useContext(GameContext);
   
    return(
        <div className='progress-bar'>
            <div className='progress-bar-progress' style={{ width:`${currentForgeProgress}%` }}/>
        </div>
    );
}

export default ProgressBar;