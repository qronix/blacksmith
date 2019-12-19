import React, {useState} from 'react';

import {createPasswordUser} from '../../firebase/firebase.utils';

import './login-form.styles.scss';

const LoginForm = ()=>{

    const [formState, setFormState] = useState({
        email:'',
        password:'',
    });

    const handleChange = ({target})=>{
        setFormState({...formState, [target.name]:target.value});
    }

    const handleSubmit = (e=>{
        e.preventDefault();
        const {email, password} = formState;
        createPasswordUser(email, password);
    });

    return(
        <div className='login-form'>
            <form>
                <div className='email-container'>
                    <label htmlFor='email'>Username:</label>
                    <input type='text' name='email' onChange={handleChange}/>
                </div>
                <div className='password-container'>
                    <label htmlFor='password'>Password:</label>
                    <input type='password' onChange={handleChange} name='password'/>
                </div>
                <button type='submit' onClick={handleSubmit}>Login</button>
            </form>
        </div>
    );
}

export default LoginForm;