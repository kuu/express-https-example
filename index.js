'use strict';

var https = require('https'),
    fs = require('fs'),
    path = require('path'),
    express = require('express');

var app = express(),
    port = process.env.PORT || 8080,
    BASE_DIR = path.join(__dirname, '.'),
    DOCS_DIR = path.join(BASE_DIR, 'www');

app.set('port', port);

app.get('/', function (req, res) {
  res.sendFile(DOCS_DIR);
});

// Start server
if (require.main === module) {
  var options = {
    key: fs.readFileSync(path.join(__dirname, '/tls/flightplan_gree-dev_net.key')),
    cert: fs.readFileSync(path.join(__dirname, '/tls/flightplan_gree-dev_net.crt'))
  };

  https.createServer(options, app).listen(app.get('port'), function () {
    console.log('Express started in ' + app.get('env') + ' mode on port ' + app.get('port') + '.');
  });
}

module.exports = app;

