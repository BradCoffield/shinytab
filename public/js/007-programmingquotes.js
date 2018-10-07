//quotes.stormconsultancy.co.uk/random.json

http: (function() {
  function reqListener() {
    var data = JSON.parse(this.responseText);
    console.log("programming", data);
    var d1 = document.getElementById("programming-quote");
    d1.insertAdjacentHTML(
      "beforeend",
      `<div class="programming-quote-quote">${data.quote}</div><div class="programming-quote-person smallish">--${
        data.author
      }</div>`
    );
  }
  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", reqListener);
  oReq.open("GET", "http://quotes.stormconsultancy.co.uk/random.json");
  oReq.send();
})();
