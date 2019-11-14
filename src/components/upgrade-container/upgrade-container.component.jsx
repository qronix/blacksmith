import React from 'react';

import CustomButton from '../custom-button/custom-button.component';

import './upgrade-container.styles.scss';

const UpgradeContainer = ()=> {
    return(
        <div className='upgrade-container'>
            <CustomButton img='/imgs/button.png' text='Upgrade'/>
            <CustomButton img='/imgs/button.png' text='Shop'/>
        </div>
    );
}

export default UpgradeContainer;