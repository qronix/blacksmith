import React, { createContext, useState, useEffect, useCallback, useRef } from 'react';

import ITEMS from '../item-data';
import UPGRADES from '../upgrades';
import EFFECTS from '../effects';

export const GameContext = createContext({
    gridItems: [],
    playerData: {},
    items: [],
    upgrades: [],
    modifiers: {},
    effects: [],
    selectedItem: {},
    currentForgeProgress:0,
    upgradesShown:null,
    mergeItems:() => {},
    forgeItem:() => {},
    getItemInfo:() => {},
    toggleUpgrades: () => {},
    purchaseUpgrade:() => {}
});

const GameProvider = ({ children }) => {

    //allows the use of proper state
    //within asynchronous functions and their
    //called children. Without this, asynchronous
    //functions will not read the current state
    //due to the execution context enclosing the 
    //initial state
    const useCurrentState = initialState => {
        const [state, setState] = useState(initialState);
        const stateRef = useRef(state);
        useEffect(() => {
            stateRef.current = state;
        },[state]);

        return [state, setState, stateRef];
    }

    const [gridItems, setGridItems, gridItemsRef] = useCurrentState([
        [139,139,139,139,],
        [139,139,139,139,],
        [139,139,139,139,],
        [139,139,139,139,],
        [139,139,139,139,],
        [139,139,139,139,],
    ]);

    const [playerData, setPlayerData] = useState({
        money:10000000000000000000000000000000000,
        moneyPerSecond:0,
    });

    const [upgradesShown, setUpgradesShown] = useState(false);

    const [items, setItems] = useState(ITEMS);
    
    const [upgrades, setUpgrades] = useState(UPGRADES);
    const [effects, setEffects] = useState(EFFECTS);
    const [modifiers, setModifiers, modifiersRef] = useCurrentState({
        spawnLevel:1,
        moneyPerSecond:1,
        forgeSpeed:1,
        autoMerge:{
            active: false,
            mergeSpeed:500
        }
    });

    const [selectedItem, setSelectedItem] = useState({
        gridId:[],
        itemName:null
    });
    const[currentForgeProgress, setCurrentForgeProgress] = useState(0);

    const findItemPair = () => {
        //loop through gridItems
        //find two items of the same type
        //return the coordinates for the items
        let target = null;
        let target2 = null;
        //loop through the grid
        for(let i=0; i<gridItemsRef.current.length; i++){
            for(let j=0; j<4; j++){
                //if we do not have a current target
                //to match with, assign the current indicies
                //to target and check for the number of
                //matching items in the grid
                if(target === null){
                    target = [i,j];
                   
                    //check if the current item is empty
                    //if so, skip this item
                    //if this check is not here then duplicate level 1 items
                    //are added to the grid because every empty item
                    //is a "pair" which triggers a level 1 item to appear
                    if(gridItemsRef.current[target[0]][target[1]] === 0){
                        target = null;
                        continue;
                    }else{
                        const count = getItemIdCount(gridItemsRef.current[target[0]][target[1]]);
                        //if at least two matching items
                        //continue to the next grid item
                        if(count >= 2){
                            continue;
                        }else{
                            //if there are less than two of the same item
                            //reset the target
                            target = null;
                            continue;
                        }
                    }
                    //if we have a target AND a match
                    //return the grid coords for both items
                }else if(gridItemsRef.current[i][j] === gridItemsRef.current[target[0]][target[1]]){
                    target2 = [i,j];
                    return [target, target2];
                }
            }
        }
        return null;
    }

    const getItemIdCount = id => {
        let count = gridItemsRef.current.flat().reduce((acc, curr) => acc += (curr === id),0);
        return count;
    }

    const getNonEmptySpaces = () => {
        const count = gridItemsRef.current.flat().filter(id => id !== 0).length;
        return count;
    }

    const autoMerge = () => {
        let targets = findItemPair();
        if(targets){
            const [target1, target2] = targets;
            const [tar1X, tar1Y] = target1;
            const [tar2X, tar2Y] = target2;
            if(gridItemsRef.current[tar1X][tar1Y] === (items.length - 1)){
                return console.log('This is a max level item and cannot be merged');
            } else{
                setGridItems(() => {
                    let grid = [...gridItemsRef.current];
                    //advance item to next level
                    grid[tar1X][tar1Y] = gridItemsRef.current[tar1X][tar1Y] + 1;
                    //clear second item
                    grid[tar2X][tar2Y] = 0;
                    return [...grid];
                });
            }
        }else{
            return console.log('No matching items found');
        }
    }
    
    //toggle the upgrade window between open and closed
    const toggleUpgrades = () => {
        setUpgradesShown(prevUpgradesShown => !prevUpgradesShown);
    }

    const processEffects = upgradeEffects => {
        for(let effect in upgradeEffects){
            const effectID = upgradeEffects[effect];
            const { modifier: { type, increase } } = effects[effectID];
            switch(type){
                case 'spawnLevel':
                    setModifiers({ ...modifiersRef.current, spawnLevel:modifiersRef.current.spawnLevel += increase });
                    convertLowerItems();
                    break;
                case 'forgeSpeed':
                    setModifiers({ ...modifiersRef.current, forgeSpeed:modifiersRef.current.forgeSpeed += increase });
                    break;
                case 'autoMerge':
                    setModifiers({...modifiersRef.current, autoMerge:{...modifiersRef.current.autoMerge, active:true}});
                    break;
                default:
                    break;
            }
        }
    }


    //when using the item upgrade modification, singular lower level items
    //sometimes remain behind and can no longer be used
    //searches the grid for any item whose level is lower
    //than the current spawn level and then for
    //each item found this takes the MPS (money per second) for the item
    //multiplies it by 60 (a full minutes worth of output)
    //adds that value to the players money and removes the
    //item from the grid
    const convertLowerItems = () => {
        //search grid for items with level lower than
        //current spawn level
        let convertedCash = 0;
        let correctGridItems = gridItemsRef.current.flat().map(item => {
            if(item < modifiersRef.current.spawnLevel){
                convertedCash += (items[item].moneyPerSecond * 60);
                return 0;
            }else{
                return item;
            }
        });
        setPlayerData(prevPlayerData => ({ ...prevPlayerData, money:prevPlayerData.money+convertedCash }));
        setSelectedItem({
            gridId:[],
            itemName:null
        });
        convertFlatArrayToGrid(correctGridItems);
    }

    const convertFlatArrayToGrid = flatArray => {
        //take an array with length of 24 items
        //to a 4 x 6 array
        let grid = [];
        let row = [];
        let indexCounter = 0;
        const ARRAY_ROW_WIDTH_REQUIREMENT = 4;
        const ARRAY_ROW_HEIGHT_REQUIREMENT = 6;
        const ARRAY_LENGTH_REQUIREMENT = (ARRAY_ROW_WIDTH_REQUIREMENT * ARRAY_ROW_HEIGHT_REQUIREMENT);

        if(flatArray.length !== ARRAY_LENGTH_REQUIREMENT){
            throw Error('Array is incorrect length');
        }else{
            //row
            for(let i=0; i<ARRAY_ROW_HEIGHT_REQUIREMENT; i++){
                //column
                for(let j=0; j<ARRAY_ROW_WIDTH_REQUIREMENT; j++){
                    row.push(flatArray[indexCounter]);
                    indexCounter++;
                }
                grid.push(row);
                row = [];
            }
            setGridItems(grid);
        }
    }
    //if we have enough money
    //add 1 to the rank of the upgrade
    //if the upgrade is inactive, activate it
    //increase the cost by the cost * costDelta
    //update the upgrade object with the new cost
    //get the item effects
    //based on effect modifier
    //update the corresponding game property
    const purchaseUpgrade = id => {
        //get upgrade cost
        const upgradeCost = upgrades[id].cost;
        if(upgradeCost <= playerData.money){
            setPlayerData(prevPlayerData => {
                return { ...prevPlayerData, money:(prevPlayerData.money - upgradeCost) }
            });

            let modUpgrades = upgrades;
            let changedUpgrade = modUpgrades[id];
            let { cost, rank, costDelta, effects } = changedUpgrade;
            cost += (cost * costDelta);
            rank += 1;
            changedUpgrade = { ...changedUpgrade, cost, rank };
            modUpgrades[id] = changedUpgrade;
            setUpgrades(modUpgrades);
            processEffects(effects);
        } else{
            console.log('You do not have enough money to purchase this upgrade');
        }
    }

    //get the item info for an item container
    //by providing the rowId and rowItemId
    //this will get the item index from the
    //gridItems array by using the row and rowItem Ids
    //as coordinates for the multidimensional array
    const getItemInfo = (rowId, rowItemId) => {
        const itemId = gridItemsRef.current[rowId][rowItemId];
        const itemData = items[itemId];
        return itemData;
    }

    const updateMoneyPerSecond = useCallback(() => {
        let moneyPerSecond = gridItemsRef.current.flat().reduce((acc, current) => acc += items[current].moneyPerSecond, 0);
        setPlayerData(prevPlayerData => {
            return { ...prevPlayerData, moneyPerSecond:moneyPerSecond * modifiers.moneyPerSecond }
        });
    },[items]);


    const gridHasSpace = () => {
        let hasSpace = gridItemsRef.current.flat().some(item => item === 0);
        return hasSpace;
    }

    //when the forge is done creating a new item
    //loop through the grid to find a blank space
    //add a new item to that spot and stop execution
    //check if there is space in the grid for a new item
    const addForgedItem = () => {
        const spaceInGrid = gridHasSpace();
        if(spaceInGrid){
            for(let i=0; i<gridItemsRef.current.length; i++){
                for(let j=0; j<4; j++){
                    //if grid position is empty
                    if(gridItemsRef.current[i][j] === 0){
                        //reset forge so the next item
                        //can begin forging
                        setCurrentForgeProgress(0);
                        return setGridItems(() => {
                            let grid = [...gridItemsRef.current];
                            grid[i][j] = modifiersRef.current.spawnLevel;
                            return [...grid];
                        });
                    }
                }
            }
        }
    };

    const updateMoney = () => {
        const id = setInterval(() => {
            setPlayerData(prevPlayerData => {
                const { money, moneyPerSecond } = prevPlayerData;
                return { ...prevPlayerData, money:money+moneyPerSecond }
            });
        },1000);
        return id;
    };

    const forgeItem = () => {
        if(currentForgeProgress < 100){
            setCurrentForgeProgress(prevProgress => {
                return prevProgress += 20;
            });
        }else{
            addForgedItem();
        }
    }

    const runForge = useCallback(() => {
        const id = setInterval(() => {
            setCurrentForgeProgress(prevProgress => {
                if(prevProgress < 100 ){
                    return(prevProgress+modifiersRef.current.forgeSpeed);
                }else{
                    addForgedItem();
                }
            });
        },50);
        return(id);
    },[]);

    const mergeItems = itemIdentifier => {
        const [rowId, itemId] = itemIdentifier;
        const itemIndex = gridItemsRef.current[rowId][itemId];
        const {itemName} = items[itemIndex];

        if(itemIndex === (items.length-1)){
            return console.log('This is a max level item and cannot be merged');
        }
        //if there is no current sourceItem
        //get item location on grid and item level
        //set source item to the item which was clicked
        if(selectedItem.itemName === null){
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
            let prevGridItems = [...gridItemsRef.current];

            //check if current item and previous item are the same slot
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
    }

    useEffect(() => {
        const id = runForge();
        return () => clearInterval(id);
    },[]);

    useEffect(() => {
        const id = updateMoney();
        return () => clearInterval(id);
    },[]);

    useEffect(() => {
        updateMoneyPerSecond();
    },[gridItems, updateMoneyPerSecond]);

    useEffect(() => {
        //empty counts store the number of grid items
        //which are empty. If this changes, then 
        //auto merge needs to fire
        //otherwise, this prevents unnecessary merge calcs
        let nonEmptyCount = getNonEmptySpaces();
        const id = setInterval(() => {
            if(modifiersRef.current.autoMerge.active){
                let newEmptyCount = getNonEmptySpaces();
                if(nonEmptyCount !== newEmptyCount){
                    autoMerge();
                    nonEmptyCount = newEmptyCount;
                }
            }
        },100);
        return () => clearInterval(id);
    },[]);

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
                purchaseUpgrade,
                modifiers,
            }}
        >
            {children}
        </GameContext.Provider>
    );
}

export default GameProvider;