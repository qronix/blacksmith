import React from 'react';

import GameProvider from './providers/game.provider';
import GameContainer from './components/game-container/game-container.component';

import './app.styles.scss';

const App = () => {
    return(
        <GameProvider>
            <GameContainer/>
        </GameProvider>
    );
}

export default App;