import React, {useContext} from 'react';
import uuid from 'uuid';
// import DragDropContext from 'react-dnd';
// import HTML5Backend from 'react-dnd-html5-backend';

import {GameContext} from '../../providers/game.provider';
import ItemGridRow from '../item-grid-row/item-grid-row.component';

import './item-grid.styles.scss';

const ItemGrid = () => {

    const {gridItems, mergeItems} = useContext(GameContext);

    const buildGrid = ()=> {
        const gridRows = [];
        for(let i=0;i<6;i++){
            let gridRow = <ItemGridRow items={gridItems[i]} key={uuid()} rowId={i} handleItemClick={mergeItems}/>;
            gridRows.push(gridRow);
        }
        return gridRows;
    }

    return(
        <div className='item-grid'>
           {buildGrid()}
        </div>
    );
}

export default ItemGrid;