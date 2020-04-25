window.addEventListener("load", init);

function init() {
  getUserinfo();
}

function postUsers(payload) {
  const postData = JSON.stringify(payload);
  fetch("https://spring20-14d2.restdb.io/rest/userinformation?max=100", {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5e957ac5436377171a0c2343",
      "cache-control": "no-cache",
    },
    body: postData,
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      showUserinfo(data);
    });
}

function getUserinfo() {
  fetch("https://spring20-14d2.restdb.io/rest/userinformation?max=100", {
    method: "get",
    headers: {
      accept: "application/json;",
      "x-apikey": "5e957ac5436377171a0c2343",
      "cache-control": "no-cache",
    },
  })
    .then((res) => res.json())
    .then((data) => data.forEach(showUserinfo));
}

const template = document.querySelector("template").content;
function showUserinfo(user) {
  const clone = template.cloneNode(true);
  clone.querySelector("h2").textContent = user.firstname;
}
