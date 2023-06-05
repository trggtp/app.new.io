"use strict";
//
if (currentUser) {
  //
  const navPageNum = document.getElementById("nav-page-num");
  const inputQuery = document.getElementById("input-query");
  const btnNext = document.getElementById("btn-next");
  const pageNum = document.getElementById("page-num");
  const btnPrev = document.getElementById("btn-prev");
  const newContainer = document.getElementById("news-container");
  const btnSubmit = document.getElementById("btn-submit");
  //
  let totalresults = 0;
  let keywords = "";
  navPageNum.style.display = "none";
  //
  btnSubmit.addEventListener("click", function () {
    pageNum.textContent = "1";
    newContainer.innerHTML = "";
    if (inputQuery.value.trim().length === 0) {
      navPageNum.style.display = "none";
      alert("Please enter keyword to find");
    } else {
      keywords = inputQuery.value;
      getDataKeywords(keywords, 1);
    }
  });
  //
  //
  async function getDataKeywords(keywords, page) {
    try {
      const res = await fetch(
        `https://newsapi.org/v2/everything?q=${keywords}&sortBy=relevancy&pageSize=${currentUser.pageSize}&page=${page}&apiKey=c3de73fc591346feae56aa0ba5f58f41`
      );
      const data = await res.json();
      if (data.totalresults === 0) {
        navPageNum.style.display = " none";
        throw new Error("There are no valid posts by keyword");
      }
      //   if (data.code === "corsNotAllowed") {
      //     throw new Error(data.message);
      //   }
      navPageNum.style.display = "block";
      displayNewList(data);
    } catch (err) {
      alert(err);
    }
  }
  //
  function checkBtnPrev() {
    if (pageNum.textContent == 1) {
      btnPrev.style.display = "none";
    } else {
      btnPrev.style.display = "block";
    }
  }
  /////////////////////////////////////
  function checkBtnNext() {
    if (pageNum.textContent == Math.ceil(totalresults / currentUser.pageSize)) {
      btnNext.style.display = "none";
    } else {
      btnNext.style.display = "block";
    }
  }
  //
  btnPrev.addEventListener("click", function () {
    getDataKeywords(keywords, --pageNum.textContent);
  });
  btnNext.addEventListener("click", function () {
    getDataKeywords(keywords, ++pageNum.textContent);
  });
  //
  function displayNewList(data) {
    totalresults = data.totalResults;
    let html = "";
    data.articles.forEach(function (articles) {
      checkBtnPrev();
      checkBtnNext();
      html += `
      <div class = 'new-content'>
          <div class='img-banner'>
              <img src=${
                articles.urlToImage
                  ? articles.urlToImage
                  : "no_image_available.jpg"
              } alt = 'img'/>
              </div>
              <div class='content'>
              <h4>${articles.title}</h4>
          
              <button><a href=${articles.url}target='_blank'>View</button>
          </div>
       </div>    `;
    });
    newContainer.innerHTML = html;
  }
} else {
  alert("Please login, register");
  window.location.href = "../index.html";
}
