'use static';

const express = require("express");
const config = require('config');
const bodyParser = require('body-parser');
const mp = require("./../module/module_property");
const Promise = require('promise');
const db_mp = express.Router();

db_mp.use(function(req, res, next){
    res.set('Content-Type', 'application/json');
    next();
});

db_mp.use(bodyParser.urlencoded({ extended: true }));
db_mp.use(bodyParser.json());

db_mp.get('/pingselling', function(req, res){
    mp.select_selling_property(function(data){
        res.status(200).json({
            header: new Date,
            content: data
        });
    });
});

db_mp.get('/pingrental', function(req, res){
    mp.select_rent_property(function(data){
        res.status(200).json({
            header: new Date,
            content: data
        });
    });
});

db_mp.get('/pingrandom', function(req,res){
    mp.select_random_property(function(data){
        res.status(200).json({
            header: new Date,
            content: data
        });
    });
})

db_mp.get('/ping/:ref_no', function(req,res){
    mp.select_property_by_ref_no(req.param('ref_no'),function(data){
        res.status(200).json({
            header: new Date,
            content: data
        });
    });
});

module.exports = db_mp;