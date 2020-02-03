import React, {useContext} from 'react';

import { GameContext } from '../../providers/game.provider';
import { compareArrays, formatNumber } from '../../utils/utils';

import './item-container.styles.scss';

const ItemContainer = ({ rowId, rowItemId }) => {
    const { mergeItems, getItemInfo, selectedItem:{gridId, itemName} } = useContext(GameContext);
    
    const handleClick = () => {
        mergeItems([rowId, rowItemId]);
    }
    const myItem = getItemInfo(rowId, rowItemId);
    const isSelected = compareArrays([rowId, rowItemId],gridId);
    let sameAsSelected = null;
    if(!isSelected){
        sameAsSelected = (myItem.itemName === itemName);  
    }

    return(
        (myItem.img !== null) 
            ? <div className={`item-container ${(isSelected) ? 'selected' : null} ${(sameAsSelected) ? 'mergeable' : null}`} onClick={() => handleClick() }
                style={{
                    backgroundImage:`url(${myItem.img})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
                >
                    <div className='item-container-revenue'>
                        <img src='/imgs/coin.png' alt='coin' className='item-container-revenue-coin'/>
                        <span className='item-container-revenue-value'>{ formatNumber(myItem.moneyPerSecond) }</span>
                    </div>
                </div> 
            : 
            <div className={ `item-container ${(isSelected) ? 'selected' : null}`} onClick={ () => handleClick() }/>
            
    );
}

export default ItemContainer;