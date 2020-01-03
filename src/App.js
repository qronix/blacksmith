import React, { useContext } from 'react';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { createBrowserHistory } from 'history'

import GameProvider from './providers/game.provider';
import GameContainer from './components/game-container/game-container.component';


import HomePage from './pages/homepage/homepage.component';
import LoginRegisterPage from './pages/login-register-page/login-register-page.component';
import GamePage from './pages/gamepage/gamepage.component';
import Navbar from './components/navbar/navbar-component';


import './app.styles.scss';

const App = () => {
    const history = createBrowserHistory();
    return(
        // <GameProvider>
        //     <GameContainer/>
        // </GameProvider>
        <Router history={ history }>
            <Navbar/>
            <Switch>
                <Route exact path='/login'>
                    <LoginRegisterPage/>
                </Route>
                <Route exact path='/game'>
                    <GamePage/>
                </Route>
                <Route path="/">
                    <HomePage/>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;