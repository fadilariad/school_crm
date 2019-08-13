const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const serverConf = require('./conf/server-conf')
const init = require('./src/bootstrap/init');
const dao = require('./src/dao/index');
const dbConf = require('./conf/db-conf')
const routes = require('./src/routes/index');

//connect to the db
MongoClient.connect('mongodb://localhost:27017/test', (err, client) => {
    if(err) {
        console.log('Error connecting to DB');
        throw err;
    };

    dao(client.db(dbConf.dbName));
    console.log('connected to DB');
    //start the server
    let server = app.listen(serverConf.port, function () {
        routes(app);
        let host = server.address().address;
        let port = server.address().port;
        console.log("App listening at http://%s:%s", host, port);
    });

});

init(app, express);
