const axios = require('axios');

axios.get('https://api.pinboard.in/v1/posts/update?auth_token=bcoffield:D6D12E049001D41D8792')
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })