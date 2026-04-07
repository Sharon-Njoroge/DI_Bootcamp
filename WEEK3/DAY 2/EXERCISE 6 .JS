<<<<<<< HEAD
const nav = document.getElementById("navBar");
nav.setAttribute("id", "socialNetworkNavigation");

const ul = nav.querySelector("ul");
const newLi = document.createElement("li");
const logoutText = document.createTextNode("Logout");
newLi.appendChild(logoutText);
ul.appendChild(newLi);

console.log("First:", ul.firstElementChild.textContent);
=======
const nav = document.getElementById("navBar");
nav.setAttribute("id", "socialNetworkNavigation");

const ul = nav.querySelector("ul");
const newLi = document.createElement("li");
const logoutText = document.createTextNode("Logout");
newLi.appendChild(logoutText);
ul.appendChild(newLi);

console.log("First:", ul.firstElementChild.textContent);
>>>>>>> 82d3e1755fe372e9b124fe1d640fa3296d675904
console.log("Last:", ul.lastElementChild.textContent);