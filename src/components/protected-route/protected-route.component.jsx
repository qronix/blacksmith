import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { withFirebase } from '../firebase/index';

import { UserContext } from '../session/index';

import GamePage from '../../pages/gamepage/gamepage.component';

// class ProtectedRoute extends Component{
//     constructor(props){
//         super(props);
//         this.state = {
//             isAuthed: false,
//         }
//         this.componentToRender = this.props.comp;
//         this.firebase = this.props.firebase;
//         this.rest = {...this.props};
//     }

//     render(){
//         return(
//             <UserContext.Consumer>
//                 {user => {
//                     if(user){
//                         const checkAuth = async ()=>{
//                             const response = await this.firebase.doVerifyUser();
//                             return (response === true) ? <this.componentToRender/> : <Redirect to='/login'/>
//                         } 
//                         checkAuth();
//                     }
//                 }}
//             </UserContext.Consumer>
//         );
//     }
// }

// export default withFirebase(ProtectedRoute);


const ProtectedRoute = ({comp:Jim, firebase, ...rest}) => {
    return(
        <UserContext.Consumer>
            {user => {
                if(user){
                    const checkAuth = async () => {
                        const response = await firebase.doVerifyUser();
                        if(response){
                            // return <Route {...rest} render={props=>{
                            //     return <Component {...rest}/>
                            // }}/>
                            return  <GamePage {...rest}/>
                        }else{
                            return <Redirect to='/login'/>
                        }
                    }
                    checkAuth();
                }else{
                    return console.log('oof');
                }
            }}
        </UserContext.Consumer>
    )
}

export default withFirebase(ProtectedRoute);









// const ProtectedRoute = ({ component:Component, firebase, ...rest }) => {
    
//     const [isAuthed, setIsAuthed] = useState(async () => {
//         return await firebase.doVerifyUser();
//     });
//     const [isMounted, setIsMounted] = useState(false);

//     // useEffect(()=>{
//     //     setIsMounted(true);
//     //     return () => setIsMounted(false);
//     // },[]);

//     // useEffect(() => {     
//     //     const getStatus = async () => {
//     //         const status = await firebase.doVerifyUser();
//     //         if(isMounted){
//     //             setIsAuthed(status);
//     //         }
//     //     }   
//     //     getStatus();
//     // },[]);


//     console.log('(protected) user is authed: ', isAuthed);

//     return(
//         <Route {...rest} render={ props => {
//             console.log('props: ', props);
//             return isAuthed === true ? <Component {...props}/> : <Redirect to='/login' />
//         }}/>
//     )
// }

// export default withFirebase(ProtectedRoute);