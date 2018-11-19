const axios = require("axios");
const NodeCache = require("node-cache");
const myCache = new NodeCache();

const recentPostsUrl = "https://api.pinboard.in/v1/posts/recent";
const updateTimeUrl = "https://api.pinboard.in/v1/posts/update";

let talkToPinboard = url => {
  return axios.get(url, {
    params: {
      auth_token: process.env.PINBOARD_API_TOKEN,
      format: "json"
    }
  });
};

let getPinboard = function(callback) {
  talkToPinboard(updateTimeUrl)
    .then(res => {
      //Lets see if our cache is the same as the current, or if its outdated.
      console.log("hey!!!", res.data.update_time);
      if (myCache.get("updateTime") != res.data.update_time) {
        //Our cache is out of date. So run send the results of getLatestPosts to the callback which will res.send it
        myCache.set(`updateTime`, res.data.update_time, 900000, function(
          err,
          success
        ) {
          if (!err && success) {
            console.log("Setting the cache of the last update time.", success);
          }
        });
        talkToPinboard(recentPostsUrl)
          .then(res => {
            console.log("Hey, made a fresh request");
            myCache.set(`latestPosts`, res.data, 900000, function(
              err,
              success
            ) {
              if (!err && success) {
                console.log("Setting the cache of the latest posts.", success);
              }
            });
            return res.data;
          })
          .then(res => callback(null, res));
      } else {
         
        myCache.get(`latestPosts`, function(err, value) {
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
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    });
};

module.exports.getPinboard = getPinboard;
