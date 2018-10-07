(function() {
  function reqListener() {
    var data = JSON.parse(this.responseText);
    console.log("philo", data);
    var d1 = document.getElementById("custom-philosophy-quote");
    d1.insertAdjacentHTML(
      "beforeend",
      `<div class="philosophy-quote-quote">${data.quote}</div><div class="philosophy-quote-person smallish">--${
        data.author
      }</div>`
    );
  }
  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", reqListener);
  oReq.open("GET", "https://shinytab.herokuapp.com/quotes/philosophy");
  oReq.send();
})();
