'use strict';

//DB url: https://console.firebase.google.com/u/0/project/messages-from-the-sink/database/messages-from-the-sink/data

let nodeData; // object we will push to firebase
let fbData; // data we pull from firebasej
let fbDataArray; //firebase data values converted to an fbDataArray
let database; // reference to our firebase database
let folderName = 'messages'; // name of folder you create in db


function setup() {
  noCanvas();

  //Initialize firebase
  // support for Firebase Realtime Database 4 web here: https://firebase
  // Copy an paste your config here (replace object commented out)
  // ---> directions on finding config below

  let config = {
    apiKey: "AIzaSyDwQ3iFvxGss4hTk3-WIlKLO21KmwRB7lA",
    authDomain: "messages-from-the-sink.firebaseapp.com",
    databaseURL: "https://messages-from-the-sink.firebaseio.com",
    projectId: "messages-from-the-sink",
    storageBucket: "messages-from-the-sink.appspot.com",
    messagingSenderId: "990418030652",
    appId: "1:990418030652:web:582eabc40c805232717339"
  };

  firebase.initializeApp(config);

  database = firebase.database();

  // this reference the folder you want your data to appear in
  let ref = database.ref(folderName);
  // **** folderName must be consistant across all calls to this folder

  ref.on('value', gotData, errData);


  // ---> To find your config object:
  // They will provide it during Firebase setup
  //or (if your project already created)
  // 1. Go to main console page
  // 2. Click on projectId
  // 3. On project home page click on name of app under project name
  // 4. Click the gear icon --> it's in there!

}

function draw() {

}
