import React from 'react';

import './progress-bar.styles.scss';

const ProgressBar = ({progressAmount})=> {
    return(
        <div className='progress-bar'>
            <div className='progress-bar-progress' style={{width:{progressAmount}}}/>
        </div>
    );
}

export default ProgressBar;