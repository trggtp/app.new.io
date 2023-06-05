"use strict";
//
if (currentUser) {
  const inputPageSize = document.getElementById("input-page-size");
  const inputCategory = document.getElementById("input-category");
  const btnSubmit = document.getElementById("btn-submit");
  //
  function validate() {
    let isValidate = true;
    if (inputPageSize.value === "") {
      alert("Please enter the number!");
      isValidate = false;
    }
    if (inputCategory.value.trim().length === 0) {
      alert("Please Selector the category!");
      isValidate = false;
    }
    return isValidate;
  }
  //
  //
  btnSubmit.addEventListener("click", function () {
    if (validate()) {
      currentUser.pageSize = Number.parseInt(inputPageSize.value);
      currentUser.category = inputCategory.value;
      saveToStorage("currentUser", currentUser);
      const index = userArr.findIndex(
        (item) => item.username === currentUser.username
      );
      userArr[index] = currentUser;
      saveToStorage("userArr", userArr);
      alert("successful installation");
      inputPageSize.value = "";
      inputCategory.value = "General";
    }
  });
} else {
  alert("Please login, register");
  window.location.href = "../index.html";
}
