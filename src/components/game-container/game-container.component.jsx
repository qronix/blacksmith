import React, {useState} from 'react';

import ItemGrid from '../item-grid/item-grid.component';
import InfoContainer from '../info-container/info-container.component';
import ForgeButton from '../forge-button/forge-button.component';

import './game-container.styles.scss';

const GameContainer = ()=> {

    //store index identifiers for the items array
    //eg a 0 would be the first index in the items array
    const [gridItems, setGridItems] = useState([
        [0,1,2,3,],
        [0,0,0,0,],
        [0,0,0,0,],
        [4,1,6,7,],
        [0,0,0,0,],
        [0,0,0,0,],
    ]);
    const [playerData, setPlayerData] = useState({
        money:0,
        moneyPerSecond:0,
        currentForgeProgress:0
    });
    const [items, setItems] = useState([
        {
            itemName:'Empty',
            moneyPerSecond:0,
            img:null,
        },
        {
            itemName:'Sword',
            moneyPerSecond:10,
            img:'../../assets/sword.jpg'
        },
        {
            itemName:'Hatchet',
            moneyPerSecond:20,
            img:'../../assets/hatchet.jpg'
        },
    ]);
    
    const [sourceItem, setSourceItem] = useState({
        gridId:[],
        itemName:null
    });
    // const [targetItem, setTargetItem] = useState(null);

    const handleItemClick = (itemIdentifier)=> {
        const [rowId, itemId] = itemIdentifier;
        const itemIndex = gridItems[rowId][itemId];
        const itemName = items[itemIndex];

        if(sourceItem.itemName===null){
            //if there is no current sourceItem
            //get item location on grid and item level
            //set source item to the item which was clicked
            return setSourceItem(
                {
                    gridId: [[rowId],[itemId]],
                    itemName
                }
            );
        }
        //add check to see if this is the same item,
        //if it is the same item, reset the source item and 
        //deselect the clicked item

        //if there IS a source item this means we previously selected an item
        //now we are going to check to see if these items are the same
        //if they are, we will merge the items into the next level of item
        //then we will set the current source location (the second item we clicked)
        //to be empty and reset the source item to an empty item
        else{
            //first selected item
            const [sourceIndex, sourceElement] = sourceItem.gridId;
            let prevGridItems = gridItems;

            //check to see if both selected items are the same
            if(sourceItem.itemName === itemName){
                console.log('Source item name: ', sourceItem.itemName);
                console.log('Current item name: ', itemName);
                //multidimensional array swap
                //[targetArray[index1][element1],targetArray[index2][element2]] = [targetArray[index2][element2],targetArray[index1][element1]]
                
                
                
                //advance the target item to the next item level
                prevGridItems[rowId][itemId] += 1;

                //set the previous item to a blank item
                prevGridItems[sourceIndex][sourceElement] = 0;

                //set source back to an empty item
                // setSourceItem({
                //     gridId: [],
                //     itemName: null
                // });

                // setGridItems(prevGridItems);

                // [prevGridItems[sourceIndex][sourceElement], prevGridItems[rowId][itemId]] = [prevGridItems[rowId][itemId],prevGridItems[sourceIndex][sourceElement]];
            }
            //if no item is in this spot
            //swap the items
            else if(itemName === 'Empty'){
                [prevGridItems[sourceIndex][sourceElement], prevGridItems[rowId][itemId]] = [prevGridItems[rowId][itemId],prevGridItems[sourceIndex][sourceElement]];
                
            }
            else{
                console.log('These items are not the same and cannot be merged');
            }
            setSourceItem({
                gridId: [],
                itemName: null
            });

            setGridItems(prevGridItems);
        }
        console.dir(gridItems);

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