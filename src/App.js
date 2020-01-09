import React, { useEffect } from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import GameProvider from './providers/game.provider';
import GameContainer from './components/game-container/game-container.component';

import ProtectedRoute from './components/protected-route/protected-route.component';

// import { withFirebase } from './components/firebase';
import { withAuthentication } from './components/session';
import HomePage from './pages/homepage/homepage.component';
import LoginRegisterPage from './pages/login-register-page/login-register-page.component';
import GamePage from './pages/gamepage/gamepage.component';
import Navbar from './components/navbar/navbar-component';


import './app.styles.scss';

const App =  () => {

    return(
        // <GameProvider>
        //     <GameContainer/>
        // </GameProvider>
        <Router>
            <Navbar/>
            <Switch>
                <Route exact path ='/protect'>
                    <GamePage/>
                </Route>
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

export default withAuthentication(App);