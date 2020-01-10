import React from 'react';

import { withRouter } from 'react-router-dom';
import { withFirebase } from '../firebase';
import { compose } from 'recompose';

const withAuthorization = Component => {
    class WithAuthorization extends React.Component {
        state = {
            authed: false,
        }
        componentDidMount(){
            this.listener = this.props.firebase.auth.onAuthStateChanged(user=>{
                if(user){
                    const checkAuth = async () => {
                        const response = await this.props.firebase.doVerifyUser();
                        if(!response){
                            this.props.history.push('/login');
                        }else{
                            this.setState({authed: true});
                        }
                    }
                    checkAuth();
                }else{
                    this.props.history.push('/login');
                }
            });
        }
        componentWillUnmount(){
            this.listener();
        }
        render(){
            if(this.state.authed){
                return <Component {...this.props}/>
            }else{
                return null
            }
        }
    }
    return compose(
        withRouter,
        withFirebase,
    )(WithAuthorization);
};

export default withAuthorization;