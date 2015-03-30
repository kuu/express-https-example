# express-https-example
Checking if https: works on the actual server.

##Instructions
```
$ git clone git@github.com:airoffline/express-https-example.git
$ cd express-https-example
$ npm install
$ mkdir tls
$ cp {your server's private key and certs} tls/
$ vi config/defalut.yaml  # Change the filenames in the tls/ dir if needed.
$ sudo npm start
```
Then go https://flightplan.gree-dev.net:8080.
