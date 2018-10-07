(function() {
  function reqListener() {
    var data = JSON.parse(this.responseText);
    console.log(data);

    let alerttt = "";

    if (data.alerts != undefined) {
      alerttt = data.alerts.title;
    }
    var d1 = document.getElementById("dark-sky");
    // d1.insertAdjacentHTML("beforeend", `${timeConverter(data.currently.time)}`);

    d1.insertAdjacentHTML(
      "beforeend",
      `<li><span class="bold">Now: </span>${data.currently.summary}, ${Math.floor(
        data.currently.temperature
      )}</li>`
    );

    // d1.insertAdjacentHTML("beforeend", `<li>Forecast: <ul><li>${data.hourly.summary}</li>`);

    d1.insertAdjacentHTML(
      "beforeend",
      `<li><span class="bold">Today: </span>${data.daily.data[0].summary} ${Math.floor(
        data.daily.data[0].temperatureHigh
      )}/${Math.floor(data.daily.data[0].temperatureLow)}</li>

        <li><span class="bold">Tomorrow: </span>${data.daily.data[1].summary} ${Math.floor(
        data.daily.data[1].temperatureHigh
      )}/${Math.floor(data.daily.data[1].temperatureLow)}</li>
        `
    );

    if (alerttt) {
      d1.insertAdjacentHTML("beforeend", `${alerttt}`);
    }
  }
  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", reqListener);
  oReq.open("GET", "https://shinytab.herokuapp.com/weather");
  oReq.send();
})();
