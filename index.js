'use strict';

var https = require('https'),
    config = require('config'),
    fs = require('fs'),
    path = require('path'),
    express = require('express');

var app = express(),
    port = process.env.PORT || config.port,
    BASE_DIR = path.join(__dirname, '.'),
    DOCS_DIR = path.join(BASE_DIR, config.dir.docroot),
    TLS_DIR = path.join(BASE_DIR, config.dir.tls),
    DOCS_PATH = path.join(DOCS_DIR, 'index.html');

app.set('port', port);

app.get('/', function (req, res) {
  console.log('GET /');
  res.sendFile(DOCS_PATH);
});

// Start server
if (require.main === module) {
  var caList = config.tls.file.caList.map(function (filepath) {
        return fs.readFileSync(path.join(TLS_DIR, filepath));
      }), options = {
        key: fs.readFileSync(path.join(TLS_DIR, config.tls.file.key)),
        cert: fs.readFileSync(path.join(TLS_DIR, config.tls.file.cert)),
        ca: caList
      };

  https.createServer(options, app).listen(app.get('port'), function () {
    console.log('Express started in ' + app.get('env') + ' mode on port ' + app.get('port') + '.');
  });
}

module.exports = app;

