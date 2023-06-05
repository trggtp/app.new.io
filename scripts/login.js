"use strict";
const inputUsername = document.getElementById("input-username");
const inputPassword = document.getElementById("input-password");
const btnSubmit = document.getElementById("btn-submit");
/////////////
// start eventclick login button
btnSubmit.addEventListener("click", function () {
  const isValidate = validate();
  if (isValidate) {
    const user = userArr.find(
      //check user,pass with data in localStorage
      (item) =>
        item.username === inputUsername.value &&
        item.password === inputPassword.value
    );
    if (user) {
      alert("Logged in successfully");
      //save data userActive to localStorage
      saveToStorage("currentUser", user);
      window.location.href = "../index.html";
    } else {
      alert("Invalid login information, please try again !");
    }
  }
});
/////////////////////////////
//check validate
function validate() {
  let isValidate = true;
  if (inputUsername.value === "") {
    alert("Please enter username !");
    isValidate = false;
  }
  if (inputPassword.value === "") {
    alert("Please enter password !");
    isValidate = false;
  }
  return isValidate;
}
