import React, {useState} from 'react';

import ItemGrid from '../item-grid/item-grid.component';
import InfoContainer from '../info-container/info-container.component';
import ForgeButton from '../forge-button/forge-button.component';

import './game-container.styles.scss';

const GameContainer = ()=> {

    const [gridItems, setGridItems] = useState([
        [0,1,2,3,],
        [-1,-1,-1,-1,],
        [-1,-1,-1,-1,],
        [4,5,6,7,],
        [-1,-1,-1,-1,],
        [-1,-1,-1,-1,],
    ]);
    const [playerData, setPlayerData] = useState({
        money:0,
        moneyPerSecond:0,
        currentForgeProgress:0
    });
    const [items, setItems] = useState([
        {
            itemName:'Sword',
            moneyPerSecond:10,
            img:'../../assets/sword.jpg'
        }
    ]);

    const [sourceItem, setSourceItem] = useState(null);
    // const [targetItem, setTargetItem] = useState(null);

    const handleItemClick = (itemIdentifier)=> {
        console.log('Swapping items! Look out!');
        console.log('Source item: ', sourceItem);
        const [rowId, itemId] = itemIdentifier;
        // console.log(`Clicked item with rowId: ${rowId} and itemId: ${itemId}` );
        // console.log(`Item ${rowId}, ${itemId} has item with id: ${gridItems[rowId][itemId]}`);
        if(!sourceItem){
            setSourceItem([[rowId],[itemId]]);
        }else{
            //multidimensional array swap
            //[targetArray[index1][element1],targetArray[index2][element2]] = [targetArray[index2][element2],targetArray[index1][element1]]
            console.log('Source item', sourceItem);
            const [sourceIndex, sourceElement] = sourceItem;
            let prevGridItems = gridItems;
            [prevGridItems[sourceIndex][sourceElement], prevGridItems[rowId][itemId]] = [prevGridItems[rowId][itemId],prevGridItems[sourceIndex][sourceElement]];
            setGridItems(prevGridItems);
            setSourceItem(null);
            console.dir(gridItems);
        }
    }
    
    return(
        <div className='game-container'>
            <div className='game-container-background'/>
            <InfoContainer/>
            <ItemGrid gridItems={gridItems} handleItemClick = {handleItemClick}/>
            <ForgeButton/>
        </div>
    );
}

export default GameContainer;