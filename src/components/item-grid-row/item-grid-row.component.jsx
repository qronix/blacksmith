import React from 'react';

import ItemContainer from '../item-container/item-container.component';

import './item-grid-row.styles.scss';

const ItemGridRow = ({items, rowId, handleItemClick})=> {
    const getItems = ()=>{
        // let 
    }

    const handleClick = (rowItemId)=>{
        handleItemClick([rowId, rowItemId]);
    }
    
    return(
        <div className='item-grid-row'>
            <ItemContainer rowItemId={0} handleClick={handleClick}/>
            <ItemContainer rowItemId={1} handleClick={handleClick}/>
            <ItemContainer rowItemId={2} handleClick={handleClick}/>
            <ItemContainer rowItemId={3} handleClick={handleClick}/>
        </div>
    );
}

export default ItemGridRow;