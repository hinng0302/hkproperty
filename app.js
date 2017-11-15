"use static"

const express = require("express");
const config = require("config");
const app = express();
var jade = require('jade');
var fs = require('fs');
var path = require('path');

const in_server = config.get("ENV");
app.set('view engine', 'jade');

app.get('/views/front-end.css', function(req,res){
    var options = {
        root: __dirname + '/views',
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
      };
    res.sendFile('./front-end.css', options,function(err){
        if(err) console.log('CSS, error:'+err);
    });
});
app.get('/', function(req,res){
    res.status(200).send('Hello');
});

app.use('/webapp',require('./webpage/index'));

app.use('/knex', require('./restapi/db_knexinit'));
app.use('/district', require('./restapi/db_district'));
app.use('/sn', require('./restapi/db_schoolnetwork'));
app.use('/agent', require('./restapi/db_agent'));
app.use('/property', require('./restapi/db_property'));

app.use(function(req, res){
    res.status(404).send("404 Not Found!");
});

app.use(function(err, req, res, next){
    console.error(err);
    res.status(500).json({header:new Date, content: 'Something wrong: '+ err.response });
});

if(module === require.main){
    const server = app.listen(config.get(in_server).get("SERVER_PORT") || 8080, function(){
        const serv = server.address().address;
        const family = server.address().family;
        const port = server.address().port;
        console.log("App listing ", serv);
        console.log("App listing to family", family);
        console.log("App listing to port", port);
    });
}