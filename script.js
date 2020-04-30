"use strict";

import "@babel/polyfill";

const endpoint = "https://spring20-14d2.restdb.io/rest/userinformation";
const apiKey = "5e957ac5436377171a0c2343";
const userData = [];
const privateEmails = ["hotmail", "gmail", "yahoo", "live", "icloud"];

const form = document.querySelector("form");
window.form = form;
const elements = form.elements;
window.elements = elements;

window.addEventListener("load", init);

function init() {
  if (checkLocalStorage()) {
    sendToAssetPage();
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
      _id: user._id,
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

function prepareEmailInput() {
  document
    .querySelector("#warning button")
    .addEventListener("click", hideMailWarning);
  document
    .querySelector("[type=email")
    .addEventListener("input", checkEmailInput);
}

function checkEmailInput(thisEmail) {
  let email = thisEmail.target.value;
  let emailEnding = email.substring(
    email.indexOf("@") + 1,
    email.lastIndexOf(".")
  );
  if (privateEmails.includes(emailEnding)) {
    displayMailWarning();
  }
  console.log(emailEnding);
  let isPresent = userData.find((e) => e.email === email);
  if (isPresent) {
    setLocalStorageAuth(isPresent._id);
  }
}

function displayMailWarning() {
  if (document.querySelector("#warning").dataset.valid !== "true") {
    document.querySelector("#warning").classList.remove("no-problem");
  }
}
function hideMailWarning() {
  document.querySelector("#warning").classList.add("no-problem");
  document.querySelector("#warning").dataset.valid = "true";
}

document
  .querySelector("[type=submit]")
  .addEventListener("click", checkValidity);

function checkValidity() {
  if (form.checkValidity()) {
    storeData();
  } else {
    console.log("not valid");
  }
}

function storeData() {
  showLoad();
  let fullname = splitName();
  const payload = {
    firstname: fullname[0],
    lastname: fullname[1],
    email: form.elements.email.value,
    company: form.elements.company.value,
    jobtitle: form.elements.jobtitle.value,
    country: form.elements.country.value,
    visits: 0,
  };
  postUsers(payload);
}

function showLoad() {
  document.querySelector("[type=submit]").classList.add("loading");
  document.querySelector("[type=submit]").value = "";
}

function splitName() {
  let name = form.elements.fullname.value;
  let firstname = name.substring(0, name.indexOf(" "));
  let lastname = name.substring(name.indexOf(" ") + 1, name.length);
  if (!firstname) {
    console.log(" 🦈");
    firstname = lastname;
    lastname = "N/A";
  }
  return [firstname, lastname];
}

async function postUsers(payload) {
  console.log("called");
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
  setLocalStorageAuth(response._id);
  sendToAssetPage();
}

function sendToAssetPage() {
  window.location = "assets.html";
}

function setLocalStorageAuth(id) {
  localStorage.setItem("auth", "true");
  localStorage.setItem("userID", id);
}
