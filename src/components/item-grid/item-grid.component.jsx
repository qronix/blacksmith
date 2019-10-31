import React from 'react';
import uuid from 'uuid';
// import DragDropContext from 'react-dnd';
// import HTML5Backend from 'react-dnd-html5-backend';

import ItemGridRow from '../item-grid-row/item-grid-row.component';

import './item-grid.styles.scss';

const ItemGrid = ({gridItems, handleItemClick}) => {


    const buildGrid = ()=> {
        const gridRows = [];
        for(let i=0;i<6;i++){
            let gridRow = <ItemGridRow items={gridItems[i]} key={uuid()} rowId={i} handleItemClick={handleItemClick}/>;
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