import React from 'react';

import './login-register-selector.styles.scss';

const LoginRegisterSelector = ({ selected }) => {
    return (
        <div className='login-register-selector'>
            <div className='login-register-selector-login'>
                Login
            </div>
            <div className='login-register-selector-register'>
                Register
            </div>
        </div>
    );
}

export default LoginRegisterSelector;