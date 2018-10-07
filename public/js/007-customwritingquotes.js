(function() {
  function reqListener() {
    var data = JSON.parse(this.responseText);
    console.log(data);
    var d1 = document.getElementById("custom-writing-quote");
    d1.insertAdjacentHTML(
      "beforeend",
      `<div class="custom-writing-quote-quote">${
        data.quote
      }</div><div class="smallish custom-writing-quote-person">--${data.author}</div>`
    );
  }
  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", reqListener);
  oReq.open("GET", "https://shinytab.herokuapp.com/quotes/writing");
  oReq.send();
})();

// function getRandomIntInclusive(min, max) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }
// let getGavstitute = function() {
//   fetch("https://shinytab.herokuapp.com/quotes/writing", {
//     method: "GET"
//   })
//     .then(function(response) {
//       response.json();
//     })
//     .then(function(json) {
//       console.log(json);
//       //   //picking a song!
//       //   var zz = json.quotes.length;
//       //   var songsLength = zz - 1;
//       //   let getRandomSong = getRandomIntInclusive(0, songsLength);
//       //   let randomSong = json.quotes[getRandomSong][0];
//       //   //picking a lyric from that song!
//       //   var lyricsLength = randomSong[1].length;
//       //   let getRandomLyric = getRandomIntInclusive(0, lyricsLength);
//       //   let randomLyric = json.quotes[getRandomSong][1][getRandomLyric];
//       //   var theQuoteOnPage = document.getElementById("quote-itself");
//       //   var theSongOnPage = document.getElementById("quote-song");
//       //   theQuoteOnPage.innerHTML = randomLyric;
//       //   theSongOnPage.innerHTML = randomSong;
//     });
// };
// getGavstitute();
