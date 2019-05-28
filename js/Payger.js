// Get token
var request = require("request");
var API_KEY = ""; //username
var API_SECRET = ""; //password
var encoded_string = btoa(API_KEY + API_SECRET);
var options = { method: 'POST',
  url: "https://merchants-api.payger.com/api/v1/oauth/token?grant_type=password&username=" + API_KEY + "&password=" + API_SECRET,
  headers:
   { Authorization: "Basic" + " " + encoded_string,
     'Content-Type': 'application/x-www-form-urlencoded'
    }

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});




