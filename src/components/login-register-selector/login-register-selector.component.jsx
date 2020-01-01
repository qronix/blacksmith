import React from 'react';

import './login-register-selector.styles.scss';

const LoginRegisterSelector = ({ showLogin, handleSelectionClick }) => {

    const handleClick = e => {
        const name = e.target.getAttribute('name');
        (name === 'login') ? handleSelectionClick(true) : handleSelectionClick(false);
    }

    return (
        <div className='login-register-selector'>
            <div className={`login-register-selector-login ${(showLogin ? 'isActive' : null)}`} name='login' onClick={handleClick}>
                Login
            </div>
            <div className={`login-register-selector-register ${(showLogin ? null : 'isActive')}`} name='register' onClick={handleClick}>
                Register
            </div>
        </div>
    );
}

export default LoginRegisterSelector;