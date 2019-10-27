import React from 'react';

import ItemContainer from '../item-container/item-container.component';

import './item-grid-row.styles.scss';

const ItemGridRow = ()=> {
    return(
        <div className='item-grid-row'>
            <ItemContainer/>
            <ItemContainer/>
            <ItemContainer/>
            <ItemContainer/>
        </div>
    );
}

export default ItemGridRow;