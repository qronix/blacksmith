import React from 'react';

import './custom-button.styles.scss';

const CustomButton = ({img, text, action, large})=> {
    return(
        <div className={`custom-button${large?'-large':''}`} onClick={action}>
            <img src={img} alt='button' className={`custom-button-img${large?'-large':''}`}/>
            <span className='custom-button-text'>{text}</span>
        </div>
    );
}

export default CustomButton;