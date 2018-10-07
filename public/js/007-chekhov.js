(function() {
  function reqListener() {
    var data = this.responseText;
    // var data = JSON.parse(this.responseText);
    // console.log("basho", data);
    //     console.log(data.quotes[2]);

    var d1 = document.getElementById("chekhov-quote");
    d1.insertAdjacentHTML("beforeend", `${data}<br><div class="smallish">--Chekhov</div>`);
  }
  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", reqListener);
  oReq.open("GET", "https://shinytab.herokuapp.com/quotes/chekhov");
  oReq.send();
})();
