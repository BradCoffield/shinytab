const axios = require("axios");

let onDesign = callback => {
  axios
    .get("http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1")
    .then(function(response) {
      // console.log(response);
      let designQuote = {
        quote: response.data[0].content,
        author: response.data[0].title,
        link: response.data[0].link
      };
      callback(null, designQuote);
    })
    .catch(function(error) {
      callback(error, null);
    });
};

module.exports.onDesign = onDesign;
