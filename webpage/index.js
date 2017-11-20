"use static"
const mp = require("../module/module_property");
const express = require("express");
const config = require("config");
const session = require('express-session');
var jade = require('jade');
var fs = require('fs');
var path = require('path');
app = express.Router();

app.use(session({
    secret: 'edwjrbplpjsttdhjenytwqhfbaifbfpwfvqkfyxknvwiznywtksccbxguxtfoermvccixielfnjkubhigkcvydcxmkevpupjtvumphunoksocdbfqbxzockphvgymihw', // 建议使用 128 个字符的随机字符串
    cookie: { maxAge: 60 * 1000 * 60 }
  }));
app.use(function(req, res, next) {
    var sess = req.session;
    if (sess.views) {
        sess.views++;
        console.log("sess: ",sess.views);
        console.log("sess: ",sess);
        next()
    } else {
        sess.views = 1
        res.end('welcome to the session demo. refresh!')
    }
});
app.get('/', function(req, res){
    mp.select_random_property(function(result){
        if(req.session.is_login) {
            res.render('../views/index',
            {
                pageTitle: 'hkproperty',
                agent: req.session.agent,
                title:'Featured Property',
                properties: result
            });
        } else {
            res.render('../views/index',
            {
                pageTitle: 'hkproperty',
                title:'Featured Property',
                properties: result
            });
        }
    });
});

app.get('/selling', function(req,res){
    mp.select_selling_property(function(result){
        res.render('../views/index',
        {
            pageTitle: 'hkproperty',
            title:'Selling',
            properties: result
        })});
});
app.get('/rent', function(req,res){
    mp.select_rent_property(function(result){
        res.render('../views/index',
        {
            pageTitle: 'hkproperty',
            title:'Rental',
            properties: result
        })});
});
app.get('/property/details/:ref_no', function(req,res){
    var promise = new Promise(function (resolve,reject){
        mp.select_property_id_by_ref_no(req.params.ref_no,function(result){
            console.log(result);
            if(result.length == 0){
                reject('error, result not found');
            }
            resolve(result);
        })
    });
    promise.then(function(result){
        return new Promise(function(resolve, reject){
            mp.select_property_full_details_by_property_id(result[0].id, function(result){
                console.log(result[0].id);
                console.log(result);
                resolve(result);
            });
        });
    }).then(function(result){
        console.log(result);
        res.render('../views/property_details', {
            pageTitle: 'hkproperty: ' +result[0].estate_name_en,
            title: result[0].estate_name_en,
            properties: result
        });
    });
});

module.exports = app;