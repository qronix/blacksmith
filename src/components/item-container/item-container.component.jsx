import React from 'react';

import './item-container.styles.scss';

const ItemContainer = ({handleClick, rowItemId}) => {
    return(
        <div className='item-container' draggable="true" onClick={()=>handleClick(rowItemId)}>
            1
        </div>
    );
}

export default ItemContainer;