
var express = require('express');

var app = express();
app.get('/', function (req, res) {
   res.send('Hello World!');
   });
app.listen(6000, function() {
   console.log('listening on port !6000!')
   console.log('http://localhost:6000');
  });
