"use strict";
if (currentUser) {
  const newContainer = document.getElementById("news-container");
  const btnPrev = document.getElementById("btn-prev");
  const pageNum = document.getElementById("page-num");
  const btnNext = document.getElementById("btn-next");
  //
  let totalResults = 0;
  getDataNews("us", 1);
  ////////////////////////////////
  async function getDataNews(country, page) {
    try {
      const res = await fetch(
        `https://newsapi.org/v2/top-headlines?country=${country}&category=${currentUser.category}&pageSize=${currentUser.pageSize}&page=${page}&apiKey=c3de73fc591346feae56aa0ba5f58f41`
      );
      const data = await res.json();
      if (data.status === "error" && data.code === "rate.imited") {
        throw new Error(data.message);
      }
      if (data.code === "corsNotAllowed") {
        throw new Error(data.message);
      }
      displayNewList(data);
    } catch (err) {
      alert("Error: " + err.message);
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
    if (pageNum.textContent == Math.ceil(totalResults / currentUser.pageSize)) {
      btnNext.style.display = "none";
    } else {
      btnNext.style.display = "block";
    }
  }
  //
  btnPrev.addEventListener("click", function () {
    getDataNews("us", --pageNum.textContent);
  });
  btnNext.addEventListener("click", function () {
    getDataNews("us", ++pageNum.textContent);
  });

  //
  function displayNewList(data) {
    totalResults = data.totalResults;
    checkBtnPrev();
    checkBtnNext();
    let html = "";
    data.articles.forEach(function (articles) {
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
