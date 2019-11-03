import React, {createContext, useState, useEffect} from 'react';

import ITEMS from '../items';

export const GameContext = createContext({
    gridItems: [],
    playerData:{},
    items: [],
    selectedItem:{},
    currentForgeProgress:0,
    mergeItems:()=>{},
    // selectItem:()=>{},
    forgeItem:()=>{}
});

const GameProvider = ({children})=>{
    const [gridItems, setGridItems] = [
        [0,0,0,0,],
        [0,0,0,0,],
        [0,0,0,0,],
        [0,0,0,0,],
        [0,0,0,0,],
        [0,0,0,0,],
    ];
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
    
    const addForgedItem = ()=> {
        //when the forge is done creating a new item
        //loop through the grid to find a blank space
        //add a new item to that spot and stop execution
        for(let i=0; i<gridItems.length; i++){
            for(let j=0; j<4; j++){
                if(gridItems[i][j]===0){
                    setGridItems((prevGridItems)=>{
                        prevGridItems[i][j] = 1;
                    });
                    return setCurrentForgeProgress(0);
                }
            }
        }
    }
    const forgeItem = () => {
        if(currentForgeProgress<100){
            setCurrentForgeProgress((prevProgress)=>{
                prevProgress += 1;
            });
        }else{
            addForgedItem();
        }
    }
    const runForge = ()=> {
        const id = setTimeout(()=>{
            if(currentForgeProgress<100){
                setCurrentForgeProgress((prevProgress)=>{
                    prevProgress += 1;
                });
            }else{
                addForgedItem();
            }
        },100);
    }

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
        const itemName = items[itemIndex];

        //if there is no current sourceItem
        //get item location on grid and item level
        //set source item to the item which was clicked
        if(selectedItem.itemName === null){
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


            //check to see if both selected items are the same type
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
            else if(itemName === 'Empty'){
                [prevGridItems[sourceIndex][sourceElement], prevGridItems[rowId][itemId]] = [prevGridItems[rowId][itemId],prevGridItems[sourceIndex][sourceElement]];
            }
            else{
                console.log('These items are not the same and cannot be merged');
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
        runForge();
    },[]);

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
            }}
        >
            {children}
        </GameContext.Provider>
    )
}