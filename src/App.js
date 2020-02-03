import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { withAuthentication } from './components/session';
import HomePage from './pages/homepage/homepage.component';
import LoginRegisterPage from './pages/login-register-page/login-register-page.component';
import LogoutPage from './pages/logoutpage/logoutpage.component';
import GamePage from './pages/gamepage/gamepage.component';
import Navbar from './components/navbar/navbar-component';
import NetworkProvider from './network/network';

import './app.styles.scss';

const App =  () => {

    return(
        <Router>
            <Navbar/>
            <Switch>
                <Route exact path ='/game'>
                    <GamePage/>
                </Route>
                <Route exact path='/login'>
                    <LoginRegisterPage/>
                </Route>
                <Route exact path='/logout'>
                    <NetworkProvider>
                        <LogoutPage/>
                    </NetworkProvider>
                </Route>
                <Route path="/">
                    <HomePage/>
                </Route>
            </Switch>
        </Router>
    );
}

export default withAuthentication(App);