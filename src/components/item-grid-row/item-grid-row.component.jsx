import React from 'react';

import ItemContainer from '../item-container/item-container.component';

import './item-grid-row.styles.scss';

const ItemGridRow = ({ rowId })=> {
   
    return(
        <div className='item-grid-row'>
            <ItemContainer rowItemId={ 0 } rowId={ rowId } />
            <ItemContainer rowItemId={ 1 } rowId={ rowId } />
            <ItemContainer rowItemId={ 2 } rowId={ rowId } />
            <ItemContainer rowItemId={ 3 } rowId={ rowId } />
        </div>
    );
}

export default ItemGridRow;