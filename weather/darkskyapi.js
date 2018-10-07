const axios = require("axios");
const NodeCache = require("node-cache");
const myCache = new NodeCache();

//'https://api.darksky.net/forecast/5d9492d5ec883a80128c67e7b8aac399/40.297884,-79.673926'

let fetchWeather = function(callback) {
  if (myCache.get(`weather_token_key`) == undefined) {
    axios
      .get(`https://api.darksky.net/forecast/5d9492d5ec883a80128c67e7b8aac399/45.7782,-108.5231`)
      .then(response => {
        callback(null, response.data);
        return response.data;
      })
      .then(function(response) {
        myCache.set(`weather_token_key`, response, 900000, function(err, success) {
          if (!err && success) {
            console.log("Setting the cache of the response.", success);
          }
        });
      })
      .catch(error => {
        callback(error);
      });
  } else {
    myCache.get(`weather_token_key`, function(err, value) {
      if (!err) {
        if (value == undefined) {
          callback("key not found", null);
        } else {
          console.log("Sending the cached version of the full response.");
          callback(null, value);
        }
      }
    });
  }
};

module.exports.fetchWeather = fetchWeather;
