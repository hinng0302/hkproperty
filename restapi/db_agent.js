'use static';

const express = require("express");
const config = require('config');
const bodyParser = require('body-parser');
const agent = require("./../module/module_agent");
const agent_password = require("./../module/module_agent_password");
const Promise = require('promise');
var session = require('express-session');
const db_agent = express.Router();

db_agent.use(session({
    secret: 'edwjrbplpjsttdhjenytwqhfbaifbfpwfvqkfyxknvwiznywtksccbxguxtfoermvccixielfnjkubhigkcvydcxmkevpupjtvumphunoksocdbfqbxzockphvgymihw',
    cookie: { maxAge: 60 * 1000 * 60 }
}));


db_agent.use(function(req, res, next){
    res.set('Content-Type', 'application/json');
    next();
});

db_agent.use(bodyParser.urlencoded({ extended: true }));
db_agent.use(bodyParser.json());
db_agent.get('/logout', function(req, res){
    req.session.destroy();
    res.status(200).json({
        header: {
            response_at: new Date
        },
        result: 1
    });
})
db_agent.post('/login',function(req, res) {
    var login=req.body.username;
    var pwd =req.body.password;
    console.log(login,pwd);
    agent_password.select_agent_password(login,pwd, function(result){
        var sess = req.session;
        if(result.length > 0){
            sess.is_login = 1;
            sess.agent = result[0];
            console.log(sess);
            req.session.save();
            res.status(200).json({
                header: {
                    response_at: new Date
                },
                result: 1,
                content: result
            });
        } else {
            res.status(500).json({
                header: {
                    response_at: new Date
                },
                result: 0
            });
        }
    });
});

module.exports = db_agent;