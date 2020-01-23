import app from 'firebase/app';
import 'firebase/auth';

import { verifyToken, login } from '../../api/api';
import firebaseConfig from './firebaseConfig';

  class Firebase{
      constructor(){
          app.initializeApp(firebaseConfig);
          this.auth = app.auth();
        //   this.user = null;
        //   app.auth().onAuthStateChanged(user=>{
        //       user ? this.user = user : this.user = null
        //   });
      }
     
      doCreateUserWithEmailAndPassword = async (email, password) => {
          const response = await this.auth.createUserWithEmailAndPassword(email, password);
      }

      doSignInWithEmailAndPassword = async (email, password)=>{
          const user = await this.auth.signInWithEmailAndPassword(email, password);
          try{
              console.log('User: ', this.auth.currentUser);
              const TOKEN = await this.auth.currentUser.getIdToken(true);
              const response = await login(TOKEN);
              const { data, status } = response;
              return { data, status };
          }catch(err){
              console.log('Got token login error: ', err.message);
          }
      }

      doSignOut = async () => {
          try{
              await this.auth.signOut();
              return true;
            }catch(err){
                return false;
            }
        };

      doVerifyUser = async () => {
          try{
            //   console.log('User: ', this.auth.currentUser);
              const TOKEN = await this.auth.currentUser.getIdToken(true);
            //   console.log('TOKEN: ', TOKEN);
              console.log('Verifying user');
              const response = await verifyToken(TOKEN);
            //   console.log('TOKEN RESPONSE: ', response);
              const { status } = response;
              if(status === 200){
                  return true;
              }else{
                  return false;
              }
          }catch(err){
              console.log('Err: ', err.message);
              return false;
          }
      };
      getCurrentUser = async () => {
          return this.auth.currentUser;
      }

      //TODO:
      //doPasswordReset
      //doPasswordUpdate
  }

  export default Firebase;