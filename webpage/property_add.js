'use static';

const express = require("express");
const config = require('config');
const bodyParser = require('body-parser');
const session = require('express-session');
var jade = require('jade');
const property_add = express.Router();

property_add.use(function(req, res, next){
    res.set('Content-Type', 'application/json');
    next();
});

property_add.use(bodyParser.urlencoded({ extended: true }));
property_add.use(bodyParser.json());

property_add.get('/', function(req, res){
    if(!req.session || !req.session.is_login){
        res.redirect('/webapp');
    }
    var ret = {
        title: 'New Property',
        pageTitle: 'Add New Property'
    }
    if(req.session.is_login){
        ret.agent = req.session.agent.agent_name_en;
        ret.agent_details = req.session.agent;
    }
    var district = require('../module/module_district');
    var promise = new Promise(function(resolve, reject){
        district.selectall(function(result){
            resolve(result);
        });
    });
    promise.then(function(result){
        ret.districts = result;
        res.render('new_property', ret);
    });
});

property_add.get('/add', function(req, res){
    res.send('send function!');
});
property_add.post('/', function(req, res){
    res.send('propert_y_add');
});

module.exports = property_add;