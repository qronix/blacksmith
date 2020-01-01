import React, { useState, useReducer, useEffect } from 'react';
import uuid from 'uuid';
import validator from 'email-validator';

import { registerPasswordUser } from '../../api/api';
import { loginPasswordUser } from '../../firebase/firebase.utils';

import './login-register-form.styles.scss';


const LoginForm = ({ showLogin }) => {

    const formInitialState = {
        email: '',
        password: '',
        confirmPassword: '',
    };

    const [formState, setFormState] = useState(formInitialState);
    const reducer = (state, action) => {
        switch(action.type){
            case 'emailErrorLength':
                return { ...state, emailErrorLength:action.value }
            case 'emailErrorFormat':
                return { ...state, emailErrorFormat:action.value }
            case 'passwordErrorLength':
                return { ...state, passwordErrorLength:action.value }
            case 'passwordError':
                return { ...state, passwordError:action.value }
            case 'confirmPasswordError':
                return { ...state, confirmPasswordError:action.value }
            default:
                throw new Error();
        }
    }
    const formErrorsInitial = {
        emailErrorLength: false,
        emailErrorFormat: false,
        passwordErrorLength: false,
        passwordError: false,
        confirmPasswordError: false,
        formError: false
    }
    const formErrorMsgs = {
        emailErrorLength: "Email is required.",
        emailErrorFormat: "Please enter a valid email.",
        passwordErrorLength: "Password must be at least 6 characters.",
        passwordError: "Password is required.",
        confirmPasswordError: "Passwords do not match.",
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

    const clearForm = () => {
        setFormState(formInitialState);
    }

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
                if(value.length === 0){
                    dispatch({ type: 'passwordError', value: true});
                }
                else if(value.length < 6){
                    dispatch({ type: 'passwordErrorLength', value: true });
                }else{
                    dispatch({ type: 'passwordErrorLength', value: false });
                    dispatch({ type: 'passwordError', value:false });
                }
                break;
            case 'confirmPassword':
                if(showLogin) break;
                if(value !== formState.password){
                    console.log('Password: ', formState.password);
                    console.log('Confirm: ', value);
                    dispatch({type: 'confirmPasswordError', value:true });
                }else{
                    dispatch({type: 'confirmPasswordError', value:false });
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
    const handleSubmit = async () => {
        const { email, password } = formState;
        if(showLogin){
            //TODO: handle login
            const response = await loginPasswordUser({email, password});
        }else{
            try{
                const response = await registerPasswordUser({ email, password });
                console.log('Got response: ', response);
            }catch(err){
                console.log('An error occurred');
            }
        }
        clearForm();
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
                    <input id={ 'email' } type='text' name='email' onChange={ handleChange } className={ (formErrors.emailErrorLength || formErrors.emailErrorFormat ? 'error' : null) } value={ formState.email } required/>
                </div>
                <div className='password-container'>
                    <label htmlFor='password'>Password:</label>
                    <input id={ 'password' } type='password' onChange={ handleChange } name='password' className={ (formErrors.passwordError || formErrors.passwordErrorLength ? 'error' : null) } value={ formState.password } required/>
                </div>
                {(!showLogin) ? 
                    <div className='passwordConfirm-container'>
                        <label htmlFor = 'passwordConfirm'>Confirm password:</label>
                        <input id={ 'confirmPassword' } type='password' onChange={ handleChange } name='confirmPassword' className={ (formErrors.confirmPasswordError ? 'error' : null)} value={formState.confirmPassword} required />
                    </div>
                    : null
                }
                <button type='submit'>{ (showLogin ? 'Login' : 'Register') }</button>
            </form>
            <div className='form-errors'>
                { (!formIsValid) ? constructFormError() : null }
            </div>
        </div>
    );
}

export default LoginForm;