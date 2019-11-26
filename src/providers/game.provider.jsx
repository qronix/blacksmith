import React, {createContext, useState, useEffect, useCallback, useRef} from 'react';

import ITEMS from '../item-data';
import UPGRADES from '../upgrades';
import EFFECTS from '../effects';

export const GameContext = createContext({
    gridItems: [],
    playerData:{},
    items: [],
    upgrades:[],
    modifiers:{},
    effects:[],
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

    const useCurrentState = (initialState)=> {
        const [state, setState] = useState(initialState);
        const stateRef = useRef(state);
        useEffect(()=>{
            stateRef.current = state;
        },[state]);

        return [state, setState, stateRef];
    }

    const [gridItems, setGridItems, gridItemsRef] = useCurrentState([
        [0,0,0,0,],
        [0,0,0,0,],
        [0,0,0,0,],
        [0,3,0,0,],
        [0,0,0,0,],
        [0,0,0,0,],
    ]);

    const [playerData, setPlayerData] = useState({
        money:1000000,
        moneyPerSecond:0,
    });

    const [upgradesShown, setUpgradesShown] = useState(false);

    const [items, setItems] = useState(ITEMS);
    
    const [upgrades, setUpgrades] = useState(UPGRADES);
    const [effects, setEffects] = useState(EFFECTS);
    const [modifiers, setModifiers, modifiersRef] = useCurrentState({
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

    const processEffects = (upgradeEffects)=>{
        for(let effect in upgradeEffects){
            const effectID = upgradeEffects[effect];
            const {modifier:{type,increase}} = effects[effectID];
            switch(type){
                case 'spawnLevel':
                    setModifiers({...modifiersRef.current, spawnLevel:modifiersRef.current.spawnLevel+=increase});
                    convertLowerItems();
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
    const convertLowerItems = ()=> {
        //search grid for items with level lower than
        //current spawn level
        let convertedCash = 0;
        let correctGridItems = gridItems.flat().map(item=>{
            if(item<modifiersRef.current.spawnLevel){
                convertedCash+=(items[item].moneyPerSecond * 60);
                return 0;
            }else{
                return item;
            }
        });
        setPlayerData((prevPlayerData)=>({...prevPlayerData, money:prevPlayerData.money+convertedCash}));
        convertFlatArrayToGrid(correctGridItems);
    }

    const convertFlatArrayToGrid = (flatArray)=> {
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
                row=[];
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
    const purchaseUpgrade = (id)=>{
        //get upgrade cost
        const upgradeCost = upgrades[id].cost;
        if(upgradeCost<=playerData.money){
            setPlayerData(prevPlayerData=>{
                return {...prevPlayerData, money:(prevPlayerData.money-upgradeCost)}
            });

            let modUpgrades = upgrades;
            let changedUpgrade = modUpgrades[id];
            let {cost, rank, costDelta, effects} = changedUpgrade;
            cost+=(cost*costDelta);
            rank+=1;
            changedUpgrade = {...changedUpgrade, cost, rank};
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
        let hasSpace = gridItemsRef.current.flat().some(item=>item===0);
        return hasSpace;
    }

    //when the forge is done creating a new item
    //loop through the grid to find a blank space
    //add a new item to that spot and stop execution
    //check if there is space in the grid for a new item
    const addForgedItem = useCallback(()=> {
        const spaceInGrid = gridHasSpace();
        if(spaceInGrid){
            for(let i=0; i<gridItemsRef.current.length; i++){
                for(let j=0; j<4; j++){
                    //if grid position is empty
                    if(gridItemsRef.current[i][j]===0){
                        setGridItems((prevGridItems)=>{
                            prevGridItems[i][j] = modifiersRef.current.spawnLevel;
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
    },[addForgedItem, modifiers]);

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

    useEffect(()=>{
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
                purchaseUpgrade,
                modifiers,
            }}
        >
            {children}
        </GameContext.Provider>
    );
}

export default GameProvider;