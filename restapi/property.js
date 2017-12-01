'use static';

const express = require("express");
const config = require('config');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
var fs = require('fs');
const module_property = require("./../module/module_property");
const Promise = require('promise');
const db_p = express.Router();

db_p.use(fileUpload());
db_p.use(bodyParser.urlencoded({ extended: true }));
db_p.use(bodyParser.json());

db_p.post('/add', function(req,res){
    if(  !req.body.estate_name ||
         !req.body.estate_name_en ||
         !req.body.block_number ||
         !req.body.flat_number ||
         !req.body.gross_building_area ||
         !req.body.practical_building_area || 
         !req.body.num_room || 
         !req.body.num_livingrm|| 
         !req.body.car_park||
         !req.body.ref_no|| 
         !req.body.district||
         !req.body.lat||
         !req.body.lng||
         !req.body.description ){
        res.status(400).json({header: new Date(),error: 'paramamter missing'});
    }else if(!req.files){
        res.status(400).json({header: new Date(),error: 'no files were uploaded'});
    }else {
        var sample = req.files.image_page;
        var promise = new Promise(function(resolve, reject){
            console.log(req.body.ref_no);
            module_property.select_property_by_ref_no(req.body.ref_no, function(result){
                console.log(result);
                if(result.length != 0 ) reject('Ref. no already exists.');
                resolve(0);
            });
        });
        promise.then(function(result){
            return new Promise(function(resolve, reject){
                if(!fs.existsSync('./images/property')){
                    fs.mkdirSync('./images/property');
                }
                var newLocation = './images/property/'+sample.name;
                sample.mv(newLocation, function(err){
                    if(err) reject(err);
                    resolve(newLocation);
                });
            });
        });
        promise.then(function(result){
            return new Promise(function(resolve, reject){
                var input = req.body;
                input.image_page = '/images/property/'+sample.name;
                module_property.create_property(input, function(result){
                    console.log(result);
                    resolve(result);
                });
            });
        }).then(function(result){
            res.status(200).json({
                header: new Date(),
                content: result
            });
        }).catch(function(err){
            res.status(400).json({header: new Date(),error:err});
        });
    }
});



module.exports = db_p;