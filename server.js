// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

app.get("/api/timestamp/:date?", (req, res) => {
  var json;
  var date;
  if (req.params.date !== void(0)){
    let unixTimestamp = Number(req.params.date);
    if (isNaN(unixTimestamp)){
      date = new Date(req.params.date);
    }
    else {
      date = new Date(unixTimestamp);
    }
  } else {
    date = new Date(Date.now());
  }
  
  if(date == "Invalid Date") {
    json = {error: "Invalid Date"}
  } else{
    json = { unix: date.getTime(), utc: date.toUTCString() }
  }
  res.json(json);
})

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});