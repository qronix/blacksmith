import firebase from 'firebase/app';
import 'firebase/auth';

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

  const user = null;

  //auth observer
  firebase.auth().onAuthStateChanged(user=>{
    if(user){
      console.log('User is signed in');
    }else{
      console.log('No user is signed in');
    }
  });

 export const createPasswordUser = async (email, password)=>{
   console.log('Email: ', email);
   console.log('Password: ', password);
    if(email && password){
      try{
        const status = await firebase.auth().createUserWithEmailAndPassword(email,password);
        console.log('Create user status: ', status);
      }catch(err){
        console.log('Create user error: ', err);
      }
    }else{
      console.log('Invalid data');
    }
  }



