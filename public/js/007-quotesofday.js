/**
 * So, I want to create an array with all the params i might want, like for the endpoints
 * and randomly select one and make the call to that
 */

//returns a random number from a range
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

heyEndpoints = ["inspire", "art", "life"];
// heyEndpoints = ["inspire", "art", "management", "life", "funny", "love", "students"];

fetch(
  `http://shinytab.herokuapp.com/quotes/of-day/${heyEndpoints[getRandomIntInclusive(0, heyEndpoints.length - 1)]}`,
  {
    method: "GET"
  }
)
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    var d1 = document.getElementById("quote-of-day");
    d1.insertAdjacentHTML(
      "beforeend",
      `<div class="quote-of-day-quote">${json.quote}</div><div class="quote-of-day-person smallish">--${
        json.author
      }</div>`
    );

    console.log(json);
  });
