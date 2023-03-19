const firebase = require("firebase")
const firebaseConfig = {
    apiKey: "AIzaSyAb2hoNyT2hK8WQANqf2qd0pneRWXJWH_4",
    authDomain: "amma-s-website-data.firebaseapp.com",
    projectId: "amma-s-website-data",
    storageBucket: "amma-s-website-data.appspot.com",
    messagingSenderId: "921633659402",
    appId: "1:921633659402:web:97bc90d8d68c590aaf1df3",
    measurementId: "G-YVWHWW9HEQ"
  };

 firebase.initializeApp(firebaseConfig) 
 const dataBase = firebase.firestore()

 module.exports = dataBase