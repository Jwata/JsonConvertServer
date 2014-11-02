var express = require('express')
var bodyParser = require('body-parser')
var request = require('request');

var app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(function (req, res) {
  // TODO: validate from host

  res.setHeader('Content-Type', 'application/json')
  var json = req.body;
  if (typeof json.Message === 'undefined' || typeof json.Subject === 'undefined') {
    // TODO: json format error
  }

  // set required property for Hall
  json.title = json.Subject
  json.message = json.Message

  var options = {
    uri: 'Some uri', // set uri to send request
    form: json,
    json: true
  };

  request.post(options, function(error, response, body){
    var code = response.statusCode
    if (!error && code >= 200 && code < 300) {
      console.log(body);
    } else {
      console.log('[error] request failed. StatusCode: '+ response.statusCode);
    }
  });

  res.end(JSON.stringify(json))
})

app.listen(1337)
