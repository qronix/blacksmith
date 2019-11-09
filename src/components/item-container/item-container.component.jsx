import React, {useContext} from 'react';

import { GameContext } from '../../providers/game.provider';
import {compareArrays} from '../../utils/utils';

import './item-container.styles.scss';

// import sword from '../../assets/sword.jpg';
//rowId => x coord, rowItemId => y coord
const ItemContainer = ({rowId, rowItemId}) => {

    const {mergeItems, getItemInfo, selectedItem:{gridId}} = useContext(GameContext);
    const handleClick = ()=> {
        mergeItems([rowId, rowItemId]);
    }
    const myItem = getItemInfo(rowId, rowItemId);
    const isSelected = compareArrays([rowId, rowItemId],gridId);

    return(
        (myItem.img !== null) 
            ? <div className={`item-container ${(isSelected) ? 'selected' : null}`} onClick={()=>handleClick()}
                style={{
                    backgroundImage:`url(${myItem.img})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            /> 
            : 
            <div className={`item-container ${(isSelected) ? 'selected' : null}`} onClick={()=>handleClick()}/>
            
    );
}

export default ItemContainer;