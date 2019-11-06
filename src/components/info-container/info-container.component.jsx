import React, {useContext} from 'react';


import {GameContext} from '../../providers/game.provider';
import CustomText from '../custom-text/custom-text.component';
import ProgressBar from '../progress-bar/progress-bar.component';

import './info-container.styles.scss';

const InfoContainer = ()=> {

    const {playerData:{money, moneyPerSecond}} = useContext(GameContext);

    return(
        <div className='info-container'>
            {/* money */}
            <div className='info-container-money'>
                <img src='/imgs/coin.png' alt='coin' className='info-container-coin-money'/>
                <CustomText text={money}/>
            </div>
            {/* money per second */}
            <div className='info-container-mps'>
                <img src='/imgs/coin.png' alt='coin' className='info-container-coin-mps'/>
                <CustomText text={`${moneyPerSecond} / second`}/>
            </div>
            <ProgressBar/>
        </div>
    );
}

export default InfoContainer;