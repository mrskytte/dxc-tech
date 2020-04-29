"use strict";
import "@babel/polyfill";

const endpoint = "https://spring20-14d2.restdb.io/rest/userinformation";
const apiKey = "5e957ac5436377171a0c2343";
const userData = [];

window.addEventListener("load", init);

function init() {
  if (checkLocalStorage()) {
    hideModal();
    createIntersectionObserver();
    logUserVisit();
    prepareMenu();
    return;
  }
  getUserData();
  activateModal();
}

async function logUserVisit() {
  const user = await fetch(`${endpoint}/${localStorage.getItem("userID")}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": apiKey,
      "cache-control": "no-cache",
    },
  });
  const response = await user.json();
  response.visits++;
  let postData = JSON.stringify(response);
  const data = await fetch(`${endpoint}/${localStorage.getItem("userID")}`, {
    method: "put",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": apiKey,
      "cache-control": "no-cache",
    },
    body: postData,
  });
}

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

function checkLocalStorage() {
  if (localStorage.getItem("auth")) {
    return true;
  }
  return false;
}

function hideModal() {
  document.querySelector("#modal-bg").style.display = "none";
  document.querySelector("nav").classList.remove("no-access");
  document.querySelector("main").classList.remove("no-access");
}

function activateModal() {
  document.querySelector("button").addEventListener("click", () => {
    document.querySelector("label").classList.remove("not-active");
    document.querySelector("input").focus();
    document
      .querySelector("[type=email")
      .addEventListener("input", checkEmailInput);
  });
}

function checkEmailInput(thisEmail) {
  console.log(thisEmail.target.value);
  let isPresent = userData.find((e) => e.email === thisEmail.target.value);
  console.log(isPresent);
  if (isPresent) {
    setLocalStorageAuth(isPresent._id);
    authorized(isPresent);
  }
}
function setLocalStorageAuth(id) {
  localStorage.setItem("auth", "true");
  localStorage.setItem("userID", id);
}

function authorized(user) {
  document.querySelector("input").style.backgroundColor =
    "rgba(27, 168, 27, 0.5)";

  setTimeout(() => {
    document.querySelector("a").classList.add("not-active");
    document.querySelector("p").textContent = `Welcome back ${user.name}`;
  }, 250);
  setTimeout(() => {
    init();
  }, 750);
}

function createIntersectionObserver() {
  let options = {
    root: document.querySelector("#asset-main"),
    threshold: [1],
  };

  let skillsObserver = new IntersectionObserver(handleIntersect, options);

  let targets = document.querySelectorAll(".sectiontitle");
  targets.forEach((oneTarget) => {
    console.log(oneTarget);
    skillsObserver.observe(oneTarget);
  });

  function handleIntersect(entries, observer) {
    if (entries[0].intersectionRatio <= 0) {
      removeNavHighlight();
    } else {
      console.log("inside");
      removeNavHighlight();
      console.log(entries[0].target);
      document.querySelector(
        `.navpoints[data-name=${entries[0].target.dataset.name}] a`
      ).style.color = "#ffed00";
    }
  }
}

function removeNavHighlight() {
  const navPoints = document.querySelectorAll(".navpoints a");
  const navBtn = document.querySelector("#top-bar button");
  navPoints.forEach((navpoint) => {
    navpoint.style.color = "#fff";
  });
}

function prepareMenu() {
  const nav = document.querySelector("nav");
  const navBtn = document.querySelector("#top-bar button");
  prepareNavBtns();
  navBtn.addEventListener("click", () => {
    if (nav.dataset.status === "closed") {
      openMenu();
    } else {
      closeMenu();
    }
  });

  function prepareNavBtns() {
    nav.querySelectorAll(".navpoints").forEach((navpoint) => {
      navpoint.addEventListener("click", closeMenu);
    });
  }

  function openMenu() {
    console.log(" 🐷");
    nav.classList.toggle("open");
    nav.dataset.status = "open";
    navBtn.classList.toggle("open");
  }
  function closeMenu() {
    console.log(" 🐷");
    nav.classList.toggle("open");
    nav.dataset.status = "closed";
    navBtn.classList.toggle("open");
  }
}
