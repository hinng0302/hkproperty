"use static"

const express = require("express");
const config = require("config");
const app = express();
const in_server = config.get("ENV");


app.get('/', function(req,res){
    res.status(200).send('Hello');
});
app.use('/knex', require('./restapi/db_knexinit'));
app.use('/district', require('./restapi/db_district'));
app.use('/sn', require('./restapi/db_schoolnetwork'));
app.use('/agent', require('./restapi/db_agent'));

app.use(function(req, res){
    res.status(404).send("404 Not Found!");
});

app.use(function(err, req, res, next){
    console.error(err);
    res.status(500).json({header:new Date, content: err.response|| 'Something wrong.'});
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