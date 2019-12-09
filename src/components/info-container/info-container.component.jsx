import React, { useContext } from 'react';

import { formatNumber } from '../../utils/utils';
import { GameContext } from '../../providers/game.provider';
import CustomText from '../custom-text/custom-text.component';
import ProgressBar from '../progress-bar/progress-bar.component';

import './info-container.styles.scss';

const InfoContainer = () => {

    const { playerData:{ money, moneyPerSecond } } = useContext(GameContext);
    const formattedMoney = formatNumber(money);
    const formattedMPS = formatNumber(moneyPerSecond);
    
    return(
        <div className='info-container'>
            {/* money */}
            <div className='info-container-money'>
                <img src='/imgs/coin.png' alt='coin' className='info-container-coin-money'/>
                <CustomText text={ formattedMoney }/>
            </div>
            {/* money per second */}
            <div className='info-container-mps'>
                <img src='/imgs/coin.png' alt='coin' className='info-container-coin-mps'/>
                <CustomText text={ `${formattedMPS} / sec` }/>
            </div>
            <ProgressBar/>
        </div>
    );
}

export default InfoContainer;