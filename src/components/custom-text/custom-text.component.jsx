import React from 'react';

import './custom-text.styles.scss';

const CustomText = ({text}) => {
    return(
        <div className='custom-text'>
            <span>{text}</span>
        </div>
    );
}

export default CustomText;