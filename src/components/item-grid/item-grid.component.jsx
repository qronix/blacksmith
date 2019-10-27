import React from 'react';

import ItemGridRow from '../item-grid-row/item-grid-row.component';

import './item-grid.styles.scss';

const ItemGrid = ()=> {
    return(
        <div className='item-grid'>
           <ItemGridRow/>
           <ItemGridRow/>
           <ItemGridRow/>
           <ItemGridRow/>
           <ItemGridRow/>
           <ItemGridRow/>
        </div>
    );
}

export default ItemGrid;