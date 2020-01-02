import firebase from 'firebase/app';
import 'firebase/auth';

import { useContext } from 'react';

import { loginUser } from '../api/api';

import { UserContext } from '../providers/user.provider';

const { updateUser } = useContext(UserContext);

const config = {
    apiKey: "AIzaSyD8Xnzg5ijSzQvy8AmRbSFAhDKd1VjSkQc",
    authDomain: "blacksmith-ed73e.firebaseapp.com",
    databaseURL: "https://blacksmith-ed73e.firebaseio.com",
    projectId: "blacksmith-ed73e",
    storageBucket: "blacksmith-ed73e.appspot.com",
    messagingSenderId: "284138161709",
    appId: "1:284138161709:web:809bbd35b64e0c99da1aa4",
    measurementId: "G-YFTCGWQ1W0"
  };

  firebase.initializeApp(config);


  //auth observer
  firebase.auth().onAuthStateChanged(user=>{
    updateUser(user);
    if(user){
      console.log('User is signed in');
    }else{
      console.log('No user is signed in');
    }
  });





  export const loginPasswordUser = async ({email, password}) =>{
    try{
      const user = await firebase.auth().signInWithEmailAndPassword(email, password);
      try{
        const TOKEN = await firebase.auth().currentUser.getIdToken(true);
        const response = await loginUser(TOKEN);
        const { data, status } = response;
        return {data, status};
      }catch(err){
        console.log('Token error!', err.message);
      }
    }catch(err){
      console.log('An error occurred: ', err);
    }
  }