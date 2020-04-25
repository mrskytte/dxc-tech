"use strict";

import "@babel/polyfill";

const endpoint = "https://spring20-14d2.restdb.io/rest/userinformation?max=100";
const apiKey = "";

window.addEventListener("load", init);

function init() {
  if (checkLocalStorage()) {
    sendToAssetPage();
    return;
  }
  getData();
}

// TODO LANDING PAGE

//SHOW PRELOADER

// GET CURRENT DATABASE ENTRIES
async function getData() {
  const data = fetch(endpoint, {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": apiKey,
      "cache-control": "no-cache",
    },
  });
  const response = (await data).json();
  console.log(response);
}
//      STORE THEM IN AN ARRAY OF OBJECTS WITH NAME AND EMAIL

// CHECK IF USER HAS USED PAGE BEFORE
//      CHECK localSTORAGE
function checkLocalStorage() {
  if (localStorage.getItem("auth")) {
    return true;
  }
  return false;
}
//      CHECK EMAIL AGAINST THE ARRAY TO SEE IF IT'S REGISTERED

// IF USER IS REGISTERED
//      SEND USER TO ASSET PAGE
//          (MAYBE SHOW MODAL FIRST SAYING WELCOME BACK??)

// IF USER ISN'T REGISTERED
//      HIDE PRELOADER AND SHOW PAGE

// HANDLE FORM DATA
//      CHECK FORM ENTRIES VALIDITY
//      SPLIT NAME INTO FIRST AND LAST NAME
//      CHECK EMAIL INPUTS ENDING TO GUESS IF IT'S WORK EMAIL OR NOT
//          IF EMAIL LOOKS TO BE PRIVATE DISPLAY "WARNING" MESSAGE
//      CHECK EMAIL INPUT ON WHETHER IT'S PRESENT IN DATABASE
//      CREATE AN OBJECT MATCHING OUR DATABASE TO STORE THE FORM DATA
//      SEND THAT DATA TO DATABASE
//      SHOW LOADER
//      AFTER DATA IS SUBMITTED SEND USER TO ASSET PAGE

function sendToAssetPage() {
  console.log("Send to asset page");
}
