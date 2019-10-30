import React, {useState} from 'react';

import ItemGrid from '../item-grid/item-grid.component';
import InfoContainer from '../info-container/info-container.component';
import ForgeButton from '../forge-button/forge-button.component';

import './game-container.styles.scss';

const GameContainer = ()=> {

    const [gridItems, setGridItems] = useState([
        [-1,-1,-1,-1,],
        [-1,-1,-1,-1,],
        [-1,-1,-1,-1,],
        [-1,-1,-1,-1,],
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

    return(
        <div className='game-container'>
            <div className='game-container-background'/>
            <InfoContainer/>
            <ItemGrid gridItems={gridItems}/>
            <ForgeButton/>
        </div>
    );
}

export default GameContainer;