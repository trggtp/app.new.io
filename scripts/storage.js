"use strict";
/////////////////////////////////////////////
/**get data from storage */
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
/**save data to storage  */
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
//get dataArr form localStorage
const users = getFromStorage("userArr") ? getFromStorage("userArr") : [];
const userArr = users.map((user) => parseUser(user));
//
//get data user login
let currentUser = getFromStorage("currentUser")
  ? parseUser(getFromStorage("currentUser"))
  : null;
//
const todos = getFromStorage("todoArr") ? getFromStorage("todoArr") : [];
const todoArr = todos.map((todo) => parseTask(todo));
//
///////////////////////////////////////
/**Exchange Object data to Class Instance */
function parseUser(userData) {
  const user = new User(
    userData.firstname,
    userData.lastname,
    userData.username,
    userData.password,
    //
    userData.pageSize,
    userData.category
  );
  return user;
}
function parseTask(taskData) {
  const task = new Task(taskData.task, taskData.owner, taskData.isDone);
  return task;
}
