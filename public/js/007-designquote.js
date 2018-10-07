(function() {
  function reqListener() {
    var data = JSON.parse(this.responseText);
    console.log(data);
    var d1 = document.getElementById("design-quote");
    d1.insertAdjacentHTML(
      "beforeend",
      `<div class="design-quote-quote">${data.quote}</div><div class="design-quote-person smallish">--${
        data.author
      }</div>`
    );
  }
  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", reqListener);
  oReq.open("GET", "https://shinytab.herokuapp.com/quotes/on-design");
  oReq.send();
})();
