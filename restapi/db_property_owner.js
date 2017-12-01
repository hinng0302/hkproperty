'use static';

const express = require("express");
const config = require('config');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mp = require("./../module/module_property_owner_relation");
const mo = require("./../module/module_property_owner");
const Promise = require('promise');
const db_property_owner = express.Router();

db_property_owner.use(fileUpload());
db_property_owner.use(bodyParser.urlencoded({ extended: true }));
db_property_owner.use(bodyParser.json());

db_property_owner.post('/create', function(req,res){
    var ret = {};
    var promise = new Promise(function(resolve, reject){
        var property = require('./../module/module_property');
        property.select_property_by_ref_no(req.body.ref_no, function(property){
            ret.property_id = property[0].id;
            resolve(property);
        });
    });
    promise.then(function(result){
        return new Promise(function(resolve, reject){
            var owner = {
                owner_name: req.body.owner_name,
                owner_phone_number: req.body.owner_phone_number
            };
            console.log('owner:');
            console.log(owner);
            mo.create_property_owner(owner, function(owner_id){
                console.log('_owner = result_');
                console.log(owner_id)
                ret.owner_id = owner_id[0];
                console.log(ret);
                resolve(owner_id[0]);
            });
        }).then(function(result){
            var owner_relation = {
                owner_id: ret.owner_id,
                property_id: ret.property_id
            };
            console.log(owner_relation);
            return new Promise(function(resolve, reject){
                mp.create_property_owner_relation(owner_relation, function(result){
                    console.log(result);
                    resolve(result);
                });
            }).then(function(result){
                res.status(200).json({
                    header: new Date(),
                    content: true
                })
            });
        });
    });
    // promise.then(function(result){
    //     console.log('ret.....start!!!');
    //     console.log(ret);
        
        
        
    // }).then(function(result){
    //     // console.log(result);
    //     res.status(200).json({
            
    //     });
    // });
    
});

module.exports = db_property_owner;