var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(__dirname + '/dev'));

var id = 1;

app.post('/items', function (req, res) {
  var item = req.body.item;
  item.id = id++;
  res.json({item: item, duration: 300});
});

app.listen(PORT);
