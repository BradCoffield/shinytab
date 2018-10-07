(function() {
  let howManyFeeds = [0, 3, 2, 1];
  howManyFeeds.forEach(num => {
    function reqListener() {
      var data = JSON.parse(this.responseText);

      if (data.site == "xkcd.com") {
        let xk = document.getElementById("xkcd");
        xk.insertAdjacentHTML(
          "beforeend",
          `<a href="#xkcd-big"><span>${data.description}</span></a>
        
    <div class="lightbox" id="xkcd-big">
    <div class="box">
        <a class="close" href="#">X</a>
        <p class="title">${data.title}</p>
        <div class="content">
        <a href="${data.link}" target="_blank">
         
        ${data.description}</a>
            <!-- Your content here -->
        </div>
    </div>
</div>
        `
        );
      } else {
        var d1 = document.getElementById("rss-feeds");
        d1.insertAdjacentHTML(
          "beforeend",
          `<div class="rss-feed-group"><div class="rss-feed-link"><a href="${data.link}" target="_blank">${
            // `<div class="rss-feed-group sub-container"><div class="rss-feed-link"><a href="${data.link}" target="_blank">${
            data.title
          }</a></div><div class="rss-feed-feedname smallish">${data.site}</div></div>`
        );
      }
    }
    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", reqListener);
    oReq.open("GET", `https://shinytab.herokuapp.com/rss/${num}`);
    oReq.send();
  });
})();
