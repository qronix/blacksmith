import React, { useState, useReducer, useEffect } from 'react';

import uuid from 'uuid';
import validator from 'email-validator';
import { createPasswordUser } from '../../firebase/firebase.utils';

import './login-form.styles.scss';



const LoginForm = () => {
    const [formState, setFormState] = useState({
        email: '',
        password: '',
    });

    const reducer = (state, action) => {
        switch(action.type){
            case 'emailErrorLength':
                return { ...state, emailErrorLength:action.value }
            case 'emailErrorFormat':
                return { ...state, emailErrorFormat:action.value }
            case 'passwordError':
                return { ...state, passwordError:action.value }
            default:
                throw new Error();
        }
    }
    const formErrorsInitial = {
        emailErrorLength: false,
        emailErrorFormat: false,
        passwordError: false,
        formError: false
    }
    const formErrorMsgs = {
        emailErrorLength: "Email is required.",
        emailErrorFormat: "Please enter a valid email.",
        passwordError: "Password is required."
    }

    const [formErrors, dispatch] = useReducer(reducer, formErrorsInitial);
    const [formIsValid, setFormIsValid] = useState(true);

    useEffect(() => {
        if(formState.email === '' || formState.password === ''){
            return;
        }else{
            isFormValid();
        }
    },[formErrors]);

    const isFormValid = () => {
        const formIsValid = Object.keys(formErrors).every(key => formErrors[key] !== true);
        if(formIsValid){
            setFormIsValid(true);
            handleSubmit();
        }else{
            setFormIsValid(false);
        }
    }
    const validateInputs = (name, value) => {
        switch(name){
            case 'email':
                if(value.length === 0){
                    dispatch({ type: 'emailErrorLength', value: true });
                }else{
                    dispatch({ type: 'emailErrorLength', value: false });
                }
                if(value.length > 0){
                    const validEmail = validator.validate(value);
                    if(validEmail){
                        dispatch({ type: 'emailErrorFormat', value: false });
                    }else{
                        dispatch({ type: 'emailErrorFormat', value: true });
                    }
                }
                break;
            case 'password':
                if(value.length < 6){
                    dispatch({ type: 'passwordError', value: true });
                }else{
                    dispatch({ type: 'passwordError', value:false });
                }
                break;
            default:
                throw new Error();
        }
    }
    const handleChange = ({ target }) => {
        const { name, value } = target;
        setFormState({ ...formState, [name]: value });
    }
    const validateForm = e => {
        e.preventDefault();
        Object.keys(formState).forEach(key => {
            validateInputs(key, formState[key]);
        });
    };
    const handleSubmit = () => {
        const { email, password } = formState;
        createPasswordUser(email, password);
    };
    const constructFormError = () => {
        let errors = [];
        Object.keys(formErrors).forEach(key => {
            if(formErrors[key] === true && key !== 'formError'){
                let error = <div key={ uuid() }>{ formErrorMsgs[key] }</div>;
                errors.push(error);
            }
        });
        return errors;
    }
    return(
        <div className='login-form'>
            <form onSubmit={ validateForm }>
                <div className='email-container'>
                    <label htmlFor='email'>Username:</label>
                    <input id={ 'email' } type='text' name='email' onChange={ handleChange } className={ (formErrors.emailErrorLength || formErrors.emailErrorFormat ? 'error' : null) } required/>
                </div>
                <div className='password-container'>
                    <label htmlFor='password'>Password:</label>
                    <input id={ 'password' } type='password' onChange={ handleChange } name='password' className={ (formErrors.passwordError ? 'error' : null) } required/>
                </div>
                <button type='submit'>Login</button>
            </form>
            <div className='form-errors'>
                { (!formIsValid) ? constructFormError() : null }
            </div>
        </div>
    );
}

export default LoginForm;