'use strict';

//DB url: https://console.firebase.google.com/u/0/project/messages-from-the-sink/database/messages-from-the-sink/data

let nodeData; // object we will push to firebase
let fbData; // data we pull from firebasej
let fbDataArray; //firebase data values converted to an fbDataArray
let database; // reference to our firebase database
let folderName = 'messages'; // name of folder you create in db
let messageInput;
let sendMessageBtn;
let receiveMessageBtn;
let sendAgainBtn;
let receivedMessage;
let receiveDiv, sendDiv;

function setup() {

  noCanvas();

  //access DOM elements
  //messageInput = select("#messageInput");
  messageInput = document.querySelector("#messageInput");
  sendMessageBtn = document.querySelector("#sendMessageBtn");
  receiveMessageBtn = document.querySelector("#receiveMessageBtn");
  receivedMessage = document.querySelector("#receivedMessage");
  sendAgainBtn = document.querySelector("#sendAgainBtn");
  receiveDiv = document.querySelector("#receiveDiv");
  sendDiv = document.querySelector("#sendDiv");


  sendMessageBtn.addEventListener('click', sendMessage);
  receiveMessageBtn.addEventListener('click', receiveMessage);
  sendAgainBtn.addEventListener('click', sendAgain);

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

function sendMessage() {

  if (messageInput.value) {
    let timestamp = Date.now();

    nodeData = {
      messageText: messageInput.value,
      timestamp: timestamp,
      received: false,
    }

    // push to firebase!!!
    createNode(folderName, timestamp, nodeData);

    console.log("sent message:");
    console.log(nodeData);

    // createP(`sent message: ${nodeData.messageText}`);

    // zero out text area
    messageInput.value = ''

    sendDiv.style.display = 'none';
    receiveDiv.style.display = 'block';

  } else {
    alert("uh oh. type message first du ma")
  }
}

function receiveMessage() {

  // shuffle array first
  shuffleArray(fbDataArray);

  for (let i = 0; i < fbDataArray.length; i++) {

    if (fbDataArray[i].received === false) {
      // console.log("received message:");
      // console.log(fbDataArray[i].messageText);

      receivedMessage.innerHTML = fbDataArray[i].messageText;

      updateNode(folderName, fbDataArray[i].timestamp, {
        received: true
      });

      receiveMessageBtn.style.display = 'none';
      sendAgainBtn.style.display = 'block';


      break;

    } else {

      receivedMessage.innerHTML = fbDataArray[i].messageText;
      // console.log("no more messages in the sink :(");
    }
  }
}

function sendAgain(){
  // reset receive div
  receivedMessage.innerHTML = "";
  receiveMessageBtn.style.display = 'block';
  sendAgainBtn.style.display = 'none';

  // return to beginning
  receiveDiv.style.display = 'none';
  sendDiv.style.display = 'block';
}

function shuffleArray(_array){
  // iterate backwards through an array
for (let i = _array.length - 1; i > 0; i--) {

  // grab random index from 0 to i
  let randomIndex = Math.floor(Math.random() * (i + 1));

  // swap elements _array[i] and _array[j]
  [_array[i], _array[randomIndex]] = [_array[randomIndex], _array[i]]; // using "destructuring assignment" syntax

  // same can be written as:
  // let _arrayItem = _array[i]; // _array item in original position _array[i]
  // _array[i] = _array[randomIndex]; // overwrite _array[i] with new item at random index
  // _array[randomIndex] = _arrayItem; // now move _array item from original position into random position

}
}
