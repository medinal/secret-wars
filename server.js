var express = require('express'),
    app = express();

app.use(express.static('controllers'));
app.use(express.static('views'));
app.use(express.static('public'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function homepage(req, res) {
   res.sendFile(__dirname + '/views/index.html');
});

app.get('*', function homepage(req, res) {
   res.sendFile(__dirname + '/views/index.html');
});

app.listen(process.env.PORT || 3000, function () {
   console.log('Express server is up and running on http://localhost:3000/');
});
