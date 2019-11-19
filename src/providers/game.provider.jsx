import React, {createContext, useState, useEffect, useCallback} from 'react';

import ITEMS from '../item-data';
import UPGRADES from '../upgrades';

export const GameContext = createContext({
    gridItems: [],
    playerData:{},
    items: [],
    upgrades:[],
    modifiers:{},
    selectedItem:{},
    currentForgeProgress:0,
    upgradesShown:null,
    mergeItems:()=>{},
    forgeItem:()=>{},
    getItemInfo:()=>{},
    toggleUpgrades: ()=>{},
    purchaseUpgrade:()=>{}
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
    const [upgradesShown, setUpgradesShown] = useState(false);
    const [items, setItems] = useState(ITEMS);
    const [upgrades, setUpgrades] = useState(UPGRADES);
    const [modifiers, setModifiers] = useState({
        spawnLevel:1,
        moneyPerSecond:1,
        forgeSpeed:1
    });
    const [selectedItem, setSelectedItem] = useState({
        gridId:[],
        itemName:null
    });
    const[currentForgeProgress, setCurrentForgeProgress] = useState(0);
    
    //toggle the upgrade window between open and closed
    const toggleUpgrades = ()=>{
        setUpgradesShown((prevUpgradesShown)=>!prevUpgradesShown);
    }

    const purchaseUpgrade = (id)=>{
        //get upgrade cost
        //if we have enough money
        //add 1 to the rank of the upgrade
        //if the upgrade is inactive, activate it
        //increase the cost by the cost * costDelta
        //update the upgrade object with the new cost
        //get the item effects
        //based on effect modifier
        //update the corresponding game property
    }

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

    const updateMoneyPerSecond = useCallback(() =>{
        let moneyPerSecond = gridItems.flat().reduce((acc, current)=> acc += items[current].moneyPerSecond, 0);
        setPlayerData(prevPlayerData=>{
            return {...prevPlayerData, moneyPerSecond:moneyPerSecond*modifiers.moneyPerSecond}
        });
    },[items]);


    const gridHasSpace = ()=> {
        let hasSpace = gridItems.flat().some(item=>item===0);
        return hasSpace;
    }

    const addForgedItem = useCallback(()=> {
        //when the forge is done creating a new item
        //loop through the grid to find a blank space
        //add a new item to that spot and stop execution
        //check if there is space in the grid for a new item
        const spaceInGrid = gridHasSpace();
        if(spaceInGrid){
            for(let i=0; i<gridItems.length; i++){
                for(let j=0; j<4; j++){
                    //if grid position is empty
                    if(gridItems[i][j]===0){
                        setGridItems((prevGridItems)=>{
                            prevGridItems[i][j] = modifiers.spawnLevel;
                            return [...prevGridItems];
                        });
                        return setCurrentForgeProgress(0);
                    }
                }
            }
        }
    },[gridItems]);

    
    const updateMoney = ()=> {
        const id = setInterval(()=>{
            setPlayerData(prevPlayerData=>{
                const {money, moneyPerSecond} = prevPlayerData;
                return {...prevPlayerData, money:money+moneyPerSecond}
            });
        },1000);
        return id;
    };

    const forgeItem = () => {
        if(currentForgeProgress<100){
            setCurrentForgeProgress((prevProgress)=>{
                return prevProgress += 20;
            });
        }else{
            addForgedItem();
        }
    }

    const runForge = useCallback(()=> {
        const id = setInterval(()=>{
            setCurrentForgeProgress(prevProgress=>{
                if(prevProgress<100){
                    setCurrentForgeProgress(prevProgress+modifiers.forgeSpeed);
                }else{
                    addForgedItem();
                }
            });
        },50);
        return(id);
    },[addForgedItem]);

    const mergeItems = itemIdentifier => {
        const [rowId, itemId] = itemIdentifier;
        const itemIndex = gridItems[rowId][itemId];
        const {itemName} = items[itemIndex];
        if(itemIndex === (items.length-1)){
            return console.log('This is a max level item and cannot be merged');
        }
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
                    gridId: [rowId,itemId],
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
            console.log('Source index: ', sourceIndex);
            console.log('Source element: ', sourceElement);
            console.log('Row Id: ', rowId);
            console.log('itemId: ', itemId);
            if((sourceIndex === rowId) && (sourceElement === itemId)){
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
            setGridItems([...prevGridItems]);
        }
        console.dir(gridItems);
    }

    useEffect(()=>{
        console.log('Running forge!');
        const id = runForge();
        return ()=> {
            clearInterval(id);
        };
    },[]);

    useEffect(()=>{
        const id = updateMoney();
        return(()=>{
            clearInterval(id);
        });
    },[]);

    useEffect(()=>{
        updateMoneyPerSecond();
    },[gridItems, updateMoneyPerSecond]);

    return(
        <GameContext.Provider
            value={{
                gridItems,
                playerData,
                items,
                selectedItem,
                currentForgeProgress,
                upgradesShown,
                mergeItems,
                forgeItem,
                getItemInfo,
                toggleUpgrades,
            }}
        >
            {children}
        </GameContext.Provider>
    );
}

export default GameProvider;