let axios = require('axios');
let domain = 'lupn.co';
let KEY = '6f4c435764ce159e8c1148cba2183cff27c10cf1';
let searchUrl = `https://api.hunter.io/v2/domain-search?domain=${domain}&api_key=${KEY}`;

axios.get(searchUrl)
  .then(function (response) {
    console.log(response.data.data);
  })
  .catch(function (error) {
    console.log(error);
  })