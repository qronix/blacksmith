import React from 'react';

import CustomText from '../custom-text/custom-text.component';
import ProgressBar from '../progress-bar/progress-bar.component';

import './info-container.styles.scss';

const InfoContainer = ()=> {
    return(
        <div className='info-container'>
            <CustomText text='24.5b'/>
            <CustomText text='20m / second'/>
            <ProgressBar/>
        </div>
    );
}

export default InfoContainer;