'use static';

const express = require("express");
const config = require('config');
const bodyParser = require('body-parser');
const agent = require("./../module/module_agent");
const agent_password = require("./../module/module_agent_password");
const Promise = require('promise');
const db_agent = express.Router();

db_agent.use(function(req, res, next){
    res.set('Content-Type', 'application/json');
    next();
});

db_agent.use(bodyParser.urlencoded({ extended: true }));
db_agent.use(bodyParser.json());

db_agent.post('/login',function(req, res){
    var login=req.body.login;
    var pwd =req.body.password;
    console.log(login,pwd);
    agent_password.select_agent_password(login,pwd, function(result){
        res.status(200).json({
            header: {
                response_at: new Date
            },
            result:result
        }
        );
    });
});

module.exports = db_agent;