'use strict';

var https = require('https'),
    fs = require('fs'),
    path = require('path'),
    express = require('express');

var app = express(),
    port = process.env.PORT || 443,
    BASE_DIR = path.join(__dirname, '.'),
    DOCS_DIR = path.join(BASE_DIR, 'www'),
    TLS_DIR = path.join(__dirname, 'tls'),
    DOCS_PATH = path.join(DOCS_DIR, 'index.html');

app.set('port', port);

app.get('/', function (req, res) {
  console.log('GET /');
  res.sendFile(DOCS_PATH);
});

// Start server
if (require.main === module) {
  var options = {
    key: fs.readFileSync(path.join(TLS_DIR, 'flightplan_gree-dev_net.key')),
    cert: fs.readFileSync(path.join(TLS_DIR, 'flightplan_gree-dev_net.crt')),
    ca: [
      fs.readFileSync(path.join(TLS_DIR, 'CrossTrustOVCA3.crt')),
      fs.readFileSync(path.join(TLS_DIR, 'SecurityCommunicationRootCA2.crt'))
    ]
  };

  https.createServer(options, app).listen(app.get('port'), function () {
    console.log('Express started in ' + app.get('env') + ' mode on port ' + app.get('port') + '.');
  });
}

module.exports = app;

