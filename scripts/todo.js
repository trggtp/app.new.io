"use strict";
if (currentUser) {
  const btnAdd = document.getElementById("btn-add");
  const todoList = document.getElementById("todo-list");
  const inputTask = document.getElementById("input-task");
  //
  displayTodoList();
  /**show Todo List  */
  function displayTodoList() {
    let html = "";
    todoArr
      .filter((todo) => todo.owner === currentUser.username)
      .forEach(function (todo) {
        html += `<li class=${todo.isDone ? "checked" : ""}> ${todo.task}
      <span class="close">×</span></li>`;
      });
    todoList.innerHTML = html;
    eventToggle();
    eventDelete();
  }
  // get data inputTask and save to storage
  btnAdd.addEventListener("click", function () {
    if (inputTask.value.trim().length === 0) {
      alert("Please do not leave it blank !");
    } else {
      //get new data
      const todo = new Task(inputTask.value, currentUser.username, false);
      //add to arr
      todoArr.push(todo);
      //save arr to storage
      saveToStorage("todoArr", todoArr);
      displayTodoList();
      //clean inputtask row
      inputTask.value = "";
    }
  });
  /**event Delete todo list */
  function eventDelete() {
    let closeEl = document.querySelectorAll("#todo-list .close");
    closeEl.forEach(function (close, i) {
      close.addEventListener("click", function (e) {
        e = confirm("Are you sure want to delete ?");
        console.log(todoArr);
        //if e true = delete and save to strage
        if (e) {
          todoArr[i].splice(0, 1);
          saveToStorage("todoArr", todoArr);
          displayTodoList();
        }
      });
    });
  }
  /**event Toggle todo list*/
  function eventToggle() {
    let eventLi = document.querySelectorAll("#todo-list li");
    eventLi.forEach(function (liEL, i) {
      liEL.addEventListener("click", function (e) {
        //avoid event x delete
        if (e.target !== liEL.children[0]) {
          //toggle class
          liEL.classList.toggle("checked");
          // check + switch true false isDone and save to storage
          todoArr[i].isDone = liEL.classList.contains("checked") ? true : false;
          saveToStorage("todoArr", todoArr);
        }
      });
    });
  }
} else {
  alert("Please login, register");
  window.location.href = "../index.html";
}
