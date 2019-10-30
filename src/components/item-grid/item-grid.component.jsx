import React from 'react';
import uuid from 'uuid';

import ItemGridRow from '../item-grid-row/item-grid-row.component';

import './item-grid.styles.scss';

const ItemGrid = ({gridItems}) => {


    const buildGrid = ()=> {
        const gridRows = [];
        for(let i=0;i<5;i++){
            let gridRow = <ItemGridRow items={gridItems[i]} key={uuid()}/>;
            gridRows.push(gridRow);
        }
        return gridRows;
    }

    return(
        <div className='item-grid'>
           {/* <ItemGridRow/>
           <ItemGridRow/>
           <ItemGridRow/>
           <ItemGridRow/>
           <ItemGridRow/>
           <ItemGridRow/> */}
           {buildGrid()}
        </div>
    );
}

export default ItemGrid;