import app from 'firebase/app';
import 'firebase/auth';

import { loginUser } from '../../api/api';
import firebaseConfig from './firebaseConfig';

  class Firebase{
      constructor(){
          app.initializeApp(firebaseConfig);
          this.auth = app.auth();
          this.state = {
              user: null,
          };
      }

      componentDidMount(){
          this.listener = this.auth.onAuthStateChanged(authUser => {
              authUser 
              ? this.setState({ authUser })
              : this.setState({ authUser: null});
          });
      }
      //Auth API
      componentWillUnmount(){
          this.listener();
      }
      doCreateUserWithEmailAndPassword = async (email, password) => {
          const response = await this.auth.createUserWithEmailAndPassword(email, password);
      }

      doSignInWithEmailAndPassword = async (email, password)=>{
          const user = await this.auth.signInWithEmailAndPassword(email, password);
          try{
              const TOKEN = await this.auth.currentUser.getIdToken(true);
              const response = await loginUser(TOKEN);
              const { data, status } = response;
              return { data, status };
          }catch(err){
              console.log('Got token login error: ', err.message);
          }
      }

      doSignOut = () => this.auth.signOut();

      //TODO:
      //doPasswordReset
      //doPasswordUpdate
  }

  export default Firebase;