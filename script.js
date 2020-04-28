"use strict";

import "@babel/polyfill";

const endpoint = "https://spring20-14d2.restdb.io/rest/userinformation";
const apiKey = "5e957ac5436377171a0c2343";
const userData = [];

const form = document.querySelector("form");
window.form = form;
const elements = form.elements;
window.elements = elements;

window.addEventListener("load", init);

function init() {
  if (checkLocalStorage()) {
    // sendToAssetPage();
    return;
  }
  getUserData();
  prepareEmailInput();
}

// TODO LANDING PAGE

//SHOW PRELOADER

// GET CURRENT DATABASE ENTRIES
async function getUserData() {
  const data = await fetch(`${endpoint}?max=100`, {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": apiKey,
      "cache-control": "no-cache",
    },
  });
  const response = await data.json();
  storeUserData(response);
}
//      STORE THEM IN AN ARRAY OF OBJECTS WITH NAME AND EMAIL
function storeUserData(users) {
  users.forEach((user) => {
    const thisUser = {
      name: user.firstname,
      email: user.email,
    };
    userData.push(thisUser);
    console.log(userData);
  });
}

// CHECK IF USER HAS USED PAGE BEFORE
//      CHECK localSTORAGE
function checkLocalStorage() {
  if (localStorage.getItem("auth")) {
    return true;
  }
  return false;
}

// IF USER IS REGISTERED
//      SEND USER TO ASSET PAGE
//          (MAYBE SHOW MODAL FIRST SAYING WELCOME BACK??)

// IF USER ISN'T REGISTERED
//      HIDE PRELOADER AND SHOW PAGE

// HANDLE FORM DATA

//      CHECK FORM ENTRIES VALIDITY

const formIsValid = form.checkValidity();
if (formIsValid) {
  console.log("Submit ready");
} else {
  if (!form.elements.firstname.checkValidity()) {
    console.log("First name is invalid");
  }
}

//      SPLIT NAME INTO FIRST AND LAST NAME

//      CHECK EMAIL INPUTS ENDING TO GUESS IF IT'S WORK EMAIL OR NOT
//          IF EMAIL LOOKS TO BE PRIVATE DISPLAY "WARNING" MESSAGE
//      CHECK EMAIL INPUT ON WHETHER IT'S PRESENT IN DATABASE
function prepareEmailInput() {
  document
    .querySelector("[type=email")
    .addEventListener("input", checkEmailInput);
}

function checkEmailInput(thisEmail) {
  console.log(thisEmail.target.value);
  let isPresent = userData.find((e) => e.email === thisEmail.target.value);
  console.log(isPresent);
  if (isPresent) {
    setLocalStorageAuth();
    console.log("Email exists in database");
    // INSERT FUNCTION THE SEND WELCOME USER BACK
    console.log(`Welcome back ${isPresent.name}`);
  }
}
//      CREATE AN OBJECT MATCHING OUR DATABASE TO STORE THE FORM DATA

function storeData() {
  const payload = {
    fullname: form.elements.fullname.value,
    email: form.elements.email.value,
    company: form.elements.company.value,
    jobtitle: form.elements.jobtitle.value,
    country: form.elements.country.value,
  };
}

document.querySelector("[type=submit]").addEventListener("click", storeData);

//      SEND THAT DATA TO DATABASE

async function postUsers(payload) {
  const postData = JSON.stringify(payload);
  const data = await fetch(endpoint, {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": apiKey,
      "cache-control": "no-cache",
    },
    body: postData,
  });
  const response = await data.json();
  console.log(response);
  console.log(payload);
}

//      SHOW LOADER
//      AFTER DATA IS SUBMITTED SEND USER TO ASSET PAGE

function sendToAssetPage() {
  console.log("Send to asset page");
}

function setLocalStorageAuth() {
  localStorage.setItem("auth", "true");
}
