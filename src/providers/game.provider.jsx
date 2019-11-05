import React, {createContext, useState, useEffect, useCallback} from 'react';

import ITEMS from '../items';

export const GameContext = createContext({
    gridItems: [],
    playerData:{},
    items: [],
    selectedItem:{},
    currentForgeProgress:0,
    mergeItems:()=>{},
    forgeItem:()=>{},
    getItemInfo:()=>{}
});

const GameProvider = ({children})=>{
    const [gridItems, setGridItems] = useState([
        [0,0,0,0,],
        [0,0,0,0,],
        [0,0,0,0,],
        [0,0,0,0,],
        [0,0,0,0,],
        [0,0,0,0,],
    ]);
    const [playerData, setPlayerData] = useState({
        money:0,
        moneyPerSecond:0,
    });
    const [items, setItems] = useState(ITEMS);
    const [selectedItem, setSelectedItem] = useState({
        gridId:[],
        itemName:null
    });
    const[currentForgeProgress, setCurrentForgeProgress] = useState(0);
    
    //get the item info for an item container
    //by providing the rowId and rowItemId
    //this will get the item index from the
    //gridItems array by using the row and rowItem Ids
    //as coordinates for the multidimensional array
    const getItemInfo = (rowId, rowItemId)=>{
        const itemId = gridItems[rowId][rowItemId];
        const itemData = items[itemId];
        return itemData;
    }

    const addForgedItem = useCallback(()=> {
        //when the forge is done creating a new item
        //loop through the grid to find a blank space
        //add a new item to that spot and stop execution
        // console.log('Adding forged item!');
        for(let i=0; i<gridItems.length; i++){
            for(let j=0; j<4; j++){
                if(gridItems[i][j]===0){
                    // let prevGrid = gridItems;
                    setGridItems((prevGridItems)=>{
                        prevGridItems[i][j] = 1;
                        return prevGridItems;
                    });
                    return setCurrentForgeProgress(0);
                }
            }
        }
        // console.log('Grid items: ', gridItems);
    },[gridItems]);

    const forgeItem = () => {
        if(currentForgeProgress<100){
            setCurrentForgeProgress((prevProgress)=>{
                prevProgress += 1;
            });
        }else{
            addForgedItem();
        }
    }

    const runForge = useCallback(()=> {
        // console.log('Starting the mighty forge!');
        const id = setInterval(()=>{
            if(currentForgeProgress<100){
                setCurrentForgeProgress(prevProgress=> prevProgress += 1);
            }else{
                addForgedItem();
            }
            // console.log('Forge progress: ', currentForgeProgress);
        },10);
        return(id);
    },[currentForgeProgress, addForgedItem]);

    // const selectItem = (itemIdentifier) => {
    //     const [rowId, itemId] = itemIdentifier;
    //     const itemIndex = gridItems[rowId][itemId];
    //     const itemName = items[itemIndex];

        
    // }

    /*
        ToDo:
            If both items are empty, do nothing
            If the items are different, swap the items
            If the same item is clicked twice, deselect the item
    */
    const mergeItems = itemIdentifier => {
        const [rowId, itemId] = itemIdentifier;
        const itemIndex = gridItems[rowId][itemId];
        const {itemName} = items[itemIndex];

        //if there is no current sourceItem
        //get item location on grid and item level
        //set source item to the item which was clicked
        if(selectedItem.itemName === null){
            console.log('ItemIndex: ', itemIndex);
            console.log('GridId: ', [[rowId],[itemId]]);
            console.log('ItemName: ', itemName);
            console.log('GridItems:', gridItems);
            return setSelectedItem(
                {
                    gridId: [[rowId],[itemId]],
                    itemName
                }
            );
        }
        //if there IS a source item this means we previously selected an item
        //now we are going to check to see if these items are the same
        //if they are, we will merge the items into the next level of item
        //then we will set the current source location (the second item we clicked)
        //to be empty and reset the source item to an empty item
        else{
            //first selected item
            const [sourceIndex, sourceElement] = selectedItem.gridId;
            let prevGridItems = gridItems;

            //check if current item and previous item are the same slot
            // console.log('Source index: ', sourceIndex);
            // console.log('Source element: ', sourceElement);
            // console.log('Row Id: ', rowId);
            // console.log('itemId: ', itemId);
            if((sourceIndex[0] === rowId) && (sourceElement[0] === itemId)){
                //add functionality to deselect item
                setSelectedItem({
                    gridId: [],
                    itemName: null
                });
               return console.log('This is the same item space.');
            }
            //check if both selected items are the same type
            if(((selectedItem.itemName === itemName) && itemName !== 'Empty')){
                console.log('itemName === Empty: ', itemName === 'Empty');
                console.log('Source item name: ', selectedItem.itemName);
                console.log('Current item name: ', itemName);
                //advance the target item to the next item level
                prevGridItems[rowId][itemId] += 1;
                //set the previous item to a blank item
                prevGridItems[sourceIndex][sourceElement] = 0;
            }
            //if no item is in this spot
            //swap the items
            else if(itemName === 'Empty' && selectedItem.itemName !== 'Empty'){
                [prevGridItems[sourceIndex][sourceElement], prevGridItems[rowId][itemId]] = [prevGridItems[rowId][itemId],prevGridItems[sourceIndex][sourceElement]];
            } 
            else{
                console.log('These items are not the same OR both spaces are empty');
            }
            setSelectedItem({
                gridId: [],
                itemName: null
            });
            setGridItems(prevGridItems);
        }
        console.dir(gridItems);
    }

    useEffect(()=>{
        const id = runForge();
        return ()=> clearInterval(id);
    },[runForge]);

    return(
        <GameContext.Provider
            value={{
                gridItems,
                playerData,
                items,
                selectedItem,
                currentForgeProgress,
                mergeItems,
                forgeItem,
                getItemInfo
            }}
        >
            {children}
        </GameContext.Provider>
    );
}

export default GameProvider;