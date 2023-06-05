"use strict";
const inputFirstname = document.getElementById("input-firstname");
const inputLastname = document.getElementById("input-lastname");
const inputUsername = document.getElementById("input-username");
const inputPassword = document.getElementById("input-password");
const inputPasswordConfirm = document.getElementById("input-password-confirm");
const btnSubmit = document.getElementById("btn-submit");
//
//start event btn-submit(Register-button)
btnSubmit.addEventListener("click", function () {
  const user = new User(
    inputFirstname.value,
    inputLastname.value,
    inputUsername.value,
    inputPassword.value
  );
  const isValidate = validate(user);
  if (isValidate) {
    //save new user to userArr in Storage
    userArr.push(user);
    saveToStorage("userArr", userArr);
    alert("Sign Up Success !");
    //link page login
    window.location.href = "../pages/login.html";
  }
});
//checked validate
function validate(user) {
  let isValidate = true;
  if (user.firstname.trim().length === 0) {
    alert("Please enter firstname !");
    isValidate = false;
  }
  if (user.lastname.trim().length === 0) {
    alert("Please enter lastname !");
    isValidate = false;
  }
  if (user.username.trim().length === 0) {
    alert("Please enter username");
    isValidate = false;
  }
  if (user.password === "") {
    alert("Please enter password !");
    isValidate = false;
  }
  if (inputPasswordConfirm.value === "") {
    alert("Please enter Confirm Password !");
    isValidate = false;
  }
  if (
    !userArr.every((item) => (item.username !== user.username ? true : false))
  ) {
    alert("Username already exist !");
    isValidate = false;
  }
  if (user.password !== inputPasswordConfirm.value) {
    alert("Password and Confirm Password must be the same !");
  }
  if (user.password.trim().length <= 8) {
    alert("Password longer than 8 characters !");
  }
  return isValidate;
}
