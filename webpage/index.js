"use static"
const mp = require("../module/module_property");
const express = require("express");
const config = require("config");
const session = require('express-session');
var jade = require('jade');
var fs = require('fs');
var path = require('path');
app = express.Router();

app.route('/').all(function(req, res, next){
    console.log(req.method);
    console.log(req.session);
    next();
}).get(function(req, res){
    mp.select_random_property(function(result){
        if(req.session.is_login) {
            res.render('../views/index',
            {
                pageTitle: 'hkproperty',
                agent: req.session.agent.agent_name_en,
                agent_details: req.session.agent,
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
}).post(function(req, res){
    res.send("not implemented");
});

app.get('/selling', function(req,res){
    mp.select_selling_property(function(result){
        if(req.session.is_login){
            res.render('../views/index',
            {
                pageTitle: 'hkproperty',
                title:'Selling',
                agent: req.session.agent.agent_name_en,
                agent_details: req.session.agent,
                properties: result
            });
        }else {
            res.render('../views/index',
            {
                pageTitle: 'hkproperty',
                title:'Selling',
                properties: result
            });
        }
    });
});
app.get('/rent', function(req,res){
    mp.select_rent_property(function(result){
        if(req.session.is_login){
            res.render('../views/index',
            {
                pageTitle: 'hkproperty',
                title:'Rental',
                agent: req.session.agent.agent_name_en,
                agent_details: req.session.agent,
                properties: result
            });
        }else {
            res.render('../views/index',
            {
                pageTitle: 'hkproperty',
                title:'Rental',
                properties: result
            });
        }
        
    });
});
app.get('/property/details/:ref_no', function(req,res){
    var promise = new Promise(function (resolve,reject){
        mp.select_property_id_by_ref_no(req.params.ref_no,function(result){
            if(result.length == 0){
                reject('error, result not found');
            }
            var ret ={id: result[0].id};
            resolve(ret);
        })
    });
    promise.then(function(result){
        return new Promise(function(resolve, reject){
            var id = result.id;
            mp.select_property_full_details_by_property_id(id, function(result_property){
                // console.log(result[0].id);
                // console.log(result_property);
                result.property = result_property[0];
                resolve(result);
            });
        });
    }).then(function(result){
        console.log("select property_owner: ");
        console.log(result);
        return new Promise(function(resolve, reject){
            var prop_owner =require("../module/module_property_owner_relation");
            prop_owner.select_property_owner_relation_by_property_id(result.id, function(property_owner){
                console.log(property_owner);
                result.owners = property_owner;
                resolve(result);
            });
        });
    }).then(function(result){
        console.log("result:");
        console.log(result);
        if(req.session.is_login){
            res.render('../views/property_details', {
                pageTitle: 'hkproperty: ' +result.property.estate_name_en,
                title: "( Ref:"+result.property.ref_no+") "+result.property.estate_name_en,
                agent: req.session.agent.agent_name_en,
                agent_details: req.session.agent,
                properties: result.property,
                owners: result.owners
            });
        }else {
            res.render('../views/property_details', {
                pageTitle: 'hkproperty: ' +result.property.estate_name_en,
                title: "( Ref:"+result.property.ref_no+") "+result.property.estate_name_en,
                properties: result.property,
                owners: result.owners
            });
        }
    });
});

module.exports = app;