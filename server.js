const express = require("express");
const fs = require("fs");
const cors = require("cors");

const port = process.env.PORT || 3000;
var app = express();
app.use(express.static(__dirname + "/public"));

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomCustomQuote(contentArr) {
  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  let zz = contentArr.length;
  var quotesLength = zz - 1;
  let getRandomQuote = getRandomIntInclusive(0, quotesLength);
  return getRandomQuote;
}

app.use(
  cors({
    credentials: true,
    origin: true
  })
); //https://stackoverflow.com/questions/7067966/how-to-allow-cors#21622564

/*** LOGGING */
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile(`server.log`, log + "\n", err => {
    if (err) {
      console.log(`Unable to append to server.log`);
    }
  });
  next();
});

app.get("/", function(req, res) {
  res.send("/index.html");
});
app.get("/kitchen-sink", function(req, res) {
  res.send("/kitchen-sink.html");
});

/*************************************************
 * THEY SAID SO QUOTES OF THE DAY *
 ***********************************************/

app.get("/quotes/of-day/:category", (req, res, next) => {
  const quotesOfDay = require("./quotes/quotes-of-day");
  let theCategory = req.params.category;
  let generous = (error, quoteObject) => {
    if (error) {
      console.log(error);
      return res.send({
        error: "There has been an error. Please check your request or try again later."
      });
    }
    console.log(quoteObject);
    res.send(quoteObject);
  };
  quotesOfDay.ofDay(theCategory, generous);
});

/**
 * QUOTES ON DESIGN
 */

app.get("/quotes/on-design", (req, res, next) => {
  const designGetter = require("./quotes/quotes-on-design");
  let generous = (error, quoteObject) => {
    if (error) {
      return res.send({
        error: "There has been an error. Please check your request or try again later."
      });
    }
    res.send(quoteObject);
  };
  designGetter.onDesign(generous);
});

/**
 * RSS feeds
 */
/* 
Feeds to integrade here and in 007-rssfeeds
https://apod.nasa.gov/apod.rss
https://vuejsdevelopers.com/feed.xml
https://vuejsfeed.com/feed
http://feeds.feedburner.com/SitepointFeed
http://feeds2.feedburner.com/webdesignerdepot
http://feeds.feedburner.com/CssTricks
http://webdesignledger.com/feed
http://feeds.feedburner.com/speckboy-design-magazine
http://feeds2.feedburner.com/tympanus
http://feeds.feedburner.com/Bludice


*/
app.get("/rss/:which", function(req, res) {
  const rssing = require("./rss/feedparsing");
  const feedsIWant = [
    "https://xkcd.com/rss.xml",
    "https://news.risingstack.com/rss",
    "https://alistapart.com/main/feed",
    "https://www.smashingmagazine.com/feed/",
    "https://vuejsdevelopers.com/feed.xml",
    "https://vuejsfeed.com/feed",
    "http://feeds.feedburner.com/SitepointFeed",
    "http://feeds2.feedburner.com/webdesignerdepot",
    "http://feeds.feedburner.com/CssTricks",
    "http://webdesignledger.com/feed",
    "http://feeds.feedburner.com/speckboy-design-magazine",
    "http://feeds2.feedburner.com/tympanus",
    "http://feeds.feedburner.com/Bludice","http://feeds.feedburner.com/brainpickings/rss"
  ];

  let sendFeeds = (err, feedItems) => {
    if (err) {
      console.log(err);
      return res.send({
        error: "There has been an error. Please check your request or try again later."
      });
    } else {
      console.log(feedItems[0]);
      res.send({
        title: feedItems[0].title,
        link: feedItems[0].link,
        site: feedItems[0].meta.title,
        description: feedItems[0].description
      });
    }
  };
  rssing.getFeed(feedsIWant[req.params.which], sendFeeds);
});

/**
 * Custom quotes
 */

app.get("/quotes/basho", function(req, res) {
  let bashoComplete = require("./quotes/json/bashoComplete.json");
  // let zz = bashoComplete["quotes"].length;
  // var quotesLength = zz - 1;
  // let getRandomQuote = getRandomIntInclusive(0, quotesLength);
  // res.send(bashoComplete.quotes[getRandomQuote]);

  res.send(bashoComplete.quotes[getRandomCustomQuote(bashoComplete.quotes)]);
});
app.get("/quotes/chekhov", function(req, res) {
  let chekhovComplete = require("./quotes/json/chekhovComplete.json");
  // let zz = bashoComplete["quotes"].length;
  // var quotesLength = zz - 1;
  // let getRandomQuote = getRandomIntInclusive(0, quotesLength);
  // res.send(bashoComplete.quotes[getRandomQuote]);

  res.send(chekhovComplete.quotes[getRandomCustomQuote(chekhovComplete.quotes)]);
});
app.get("/quotes/writing", (req, res, next) => {
  let writingQuotes = require("./quotes/quotes-writing.json");

  var zz = writingQuotes.results.result.length;
  var quotesLength = zz - 1;
  let getRandomQuote = getRandomIntInclusive(0, quotesLength);

  res.send(writingQuotes.results.result[getRandomQuote]);
});

app.get("/quotes/philosophy", (req, res, next) => {
  let philosophyQuotes = require("./quotes/quotes-philosophy.json");
  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  var zz = philosophyQuotes.results.result.length;
  var quotesLength = zz - 1;
  let getRandomQuote = getRandomIntInclusive(0, quotesLength);

  res.send(philosophyQuotes.results.result[getRandomQuote]);
});

/**
 * Weather for home
 */

app.get("/weather", (req, res, next) => {
  const weatherGetter = require("./weather/darkskyapi");
  let generous = (error, theWeather) => {
    if (error) {
      return res.send({
        error: "There has been an error. Please check your request or try again later."
      });
    }
    res.send(theWeather);
  };
  weatherGetter.fetchWeather(generous);
});

app.get("/pinboard", (req,res,next)=>{
  console.log('lets get some pinboard, shall we');
  const pinboardGetter = require("./pinboardApi");
  let generous = (error, pinboardResults)=>{    if (error) {
    return res.send({
      error: "There has been an error. Please check your request or try again later."
    });
  } else { 
    console.log('We herePINBOARDREG?');
    res.send(pinboardResults); }
  
  };
  pinboardGetter.getPinboard(generous)
})

app.get("/pinboardAll", (req,res,next)=>{
  console.log('lets get some pinboard, shall we');
  const pinboardGetter = require("./pinboardApi");
  let generous = (error, pinboardResults)=>{    if (error) {
    return res.send({
      error: "There has been an error. Please check your request or try again later."
    });
  } else { 
    console.log('We here?');
    res.send(pinboardResults); }
  
  };
  pinboardGetter.getPinboardAll(generous)
})

app.listen(port, () => {
  console.log(`Server is ready on port ${port}.`);
});

