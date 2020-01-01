import React, { useState } from 'react';

import LoginRegisterSelector from '../login-register-selector/login-register-selector.component';
import LoginRegisterForm from '../login-register-form/login-register-form.component';


import './login-register-container.styles.scss';

const LoginRegisterContainer = () => {
    const [showLogin, setShowLogin] = useState(true);

    const handleSelectorClick = willShowLogin => {
        (willShowLogin === true) ? setShowLogin(true) : setShowLogin(false);
    }

    return(
        <div className='login-register-container'>
            <LoginRegisterSelector showLogin = { showLogin } handleSelectionClick = { handleSelectorClick }/>
            <LoginRegisterForm showLogin = { showLogin }/>
        </div>
    )
}

export default LoginRegisterContainer;