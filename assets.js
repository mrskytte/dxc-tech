"use strict";
import "@babel/polyfill";
const endpoint = "https://spring20-14d2.restdb.io/rest/userinformation";
const apiKey = "5e957ac5436377171a0c2343";

window.addEventListener("load", init);

function init() {
  //   if (!checkLocalStorage()) {
  // showModal();
  //     return;
  //   }
  createIntersectionObserver();
}

function checkLocalStorage() {
  if (localStorage.getItem("auth")) {
    return true;
  }
  return false;
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
  navPoints.forEach((navpoint) => {
    navpoint.style.color = "#fff";
  });
}
