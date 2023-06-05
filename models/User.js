"use strict";
//class user để đại diện cho thông tin người dùng
class User {
  constructor(
    firstname,
    lastname,
    username,
    password,
    pageSize = 5,
    category = "General"
  ) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.username = username;
    this.password = password;
    this.pageSize = pageSize;
    this.category = category;
  }
}
//class task để chứa các thông tin về trang todo list
class Task {
  constructor(task, owner, isDone) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
}
