const axios = require("axios");
const NodeCache = require("node-cache");
const myCache = new NodeCache();

let ofDay = (category, callback) => {
  if (myCache.get(`${category}_token_key`) == undefined) {
    axios
      .get(`http://quotes.rest/qod.json?category=${category}`)
      .then(function(response) {
        theQuote = {
          quote: response.data.contents.quotes[0].quote,
          author: response.data.contents.quotes[0].author
        };
        callback(null, theQuote);
      })
      .then(function(response) {
        myCache.set(`${category}_token_key`, theQuote, 7200, function(err, success) {
          if (!err && success) {
            console.log("setting the cache", success);
          }
        });
      })
      .catch(function(error) {
        callback(error, null);
      });
  } else {
    myCache.get(`${category}_token_key`, function(err, value) {
      if (!err) {
        if (value == undefined) {
          callback("key not found", null);
        } else {
          console.log("sending the cached version");
          callback(null, value);
        }
      }
    });
  }
};

module.exports.ofDay = ofDay;
