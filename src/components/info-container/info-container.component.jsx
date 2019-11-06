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
            <CustomText text={money}/>
            {/* money per second */}
            <CustomText text={`${moneyPerSecond} / second`}/>
            <ProgressBar/>
        </div>
    );
}

export default InfoContainer;