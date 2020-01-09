import React from 'react';

import UserContext from '../session/context'
import { withFirebase } from '../firebase';


//withAuthentication HOC
const withAuthentication = Component => {
    class WithAuthentication extends React.Component{
        //keep track of firebase user
        state = {
            user: null,
        };

        componentDidMount(){
            //initialize with firebase auth observer which updates user state
            //as firebase updates the user based on session changes
            this.listener = this.props.firebase.auth.onAuthStateChanged(user => {
                user
                ? this.setState({ user })
                : this.setState({ user: null });
            });
        }

        componentWillUnmount(){
            //execute the unsubscribe function for our firebase auth observer
            //to prevent memory leaks
            this.listener();
        }

        render(){
            //wrap the provided component in the user context provider
            //this will allow the wrapped component to maintain access
            //to the firebase user object whenever the observer updates
            return(
                <UserContext.Provider value={this.state.user}>
                    <Component { ...this.props }/>
                </UserContext.Provider>
            );
        }
    }

    //wrap the WithAuthentication component in
    //the withFirebase HOC to provide access to firebase
    return withFirebase(WithAuthentication);
}

export default withAuthentication;