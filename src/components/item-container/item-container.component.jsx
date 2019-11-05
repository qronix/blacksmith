import React, {useContext} from 'react';

import { GameContext } from '../../providers/game.provider';

import './item-container.styles.scss';

// import sword from '../../assets/sword.jpg';
const ItemContainer = ({rowItemId, rowId}) => {

    const {mergeItems, getItemInfo} = useContext(GameContext);
    const handleClick = ()=> {
        mergeItems([rowId, rowItemId]);
    }
    const myItem = getItemInfo(rowId, rowItemId);
   
    return(
        (myItem.img !== null) 
            ? <div className='item-container' draggable="true" onClick={()=>handleClick()}
                style={{
                    backgroundImage:`url(${myItem.img})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            /> 
            : 
            <div className='item-container' draggable="true" onClick={()=>handleClick()}/>
            
    );
}

export default ItemContainer;