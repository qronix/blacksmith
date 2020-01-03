import React from 'react';

import LoginRegisterContainer from '../../components/login-register-container/login-register-container.component';

// import { withFirebase } from '../../components/'

import './login-register-page.styles.scss';

const LoginRegisterPage = () => {
    return (
        <div className='login-register-page'>
            <LoginRegisterContainer/>
        </div>
    ) ;
}

export default LoginRegisterPage;