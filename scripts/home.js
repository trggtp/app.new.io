"use strict";
const loginModal = document.getElementById("login-modal");
const mainContent = document.getElementById("main-content");
const welcomeMsg = document.getElementById("welcome-message");
const btnLogout = document.getElementById("btn-logout");
///////////////////////
displayHome();
/** show current page*/
function displayHome() {
  //currently have users
  if (currentUser) {
    loginModal.style.display = "none";
    mainContent.style.display = "block";
    welcomeMsg.textContent = `Welcome ${currentUser.firstname}`;
  }
  //currently no users
  else {
    loginModal.style.display = "block";
    mainContent.style.display = "none";
  }
}
////////////////////////////////////
//start event log out
btnLogout.addEventListener("click", function () {
  const Logout = confirm("Are you sure want to logout?");
  if (Logout) {
    //reset currentUser and save to localStorega
    currentUser = null;
    saveToStorage("currentUser", currentUser);
    displayHome();
  }
});
