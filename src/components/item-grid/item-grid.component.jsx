import React, { useMemo } from 'react';
import uuid from 'uuid';
import ItemGridRow from '../item-grid-row/item-grid-row.component';

import './item-grid.styles.scss';

const ItemGrid = ({ gridItems, mergeItems }) => {
    const buildGrid = useMemo(() => {
        const gridRows = [];
        for(let i=0;i<6;i++){
            let gridRow = <ItemGridRow items={ gridItems[i] } key={ uuid() } rowId={ i } handleItemClick={ mergeItems }/>;
            gridRows.push(gridRow);
        }
        return gridRows;
    },[gridItems]);
    
    return(
        <div className='item-grid'>
           { buildGrid }
        </div>
    );
};

export default ItemGrid;