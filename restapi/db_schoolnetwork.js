'use static';

const express = require("express");
const config = require('config');
const bodyParser = require('body-parser');
const sn = require("./../module/module_schoolnetwork");
const db_sn = express.Router();

db_sn.use(function(req, res, next){
    res.set('Content-Type', 'application/json');
    next();
});

db_sn.use(bodyParser.urlencoded({ extended: true }));
db_sn.use(bodyParser.json());

db_sn.get('/ping', function(req, res){
    sn.selectall(function(data){
        res.status(200).json({
            header: new Date,
            content: data
        });
    });
});

db_sn.get('/select_by_district/:district_id', function(req, res){
    var district_id = req.params.district_id;
    sn.select_by_district(district_id, function(result) {
        console.log(result);
        console.log(result.length);
        if(result.length == 0 ){
            res.status(404).json({
                header: new Date,
                content: "result not found"
            });
        }else {
            res.status(200).json({
                header: new Date,
                content: result
            });
        }
    });
});


db_sn.get('/select_by_district_name/:district_en', function(req, res){
    var district_en = req.params.district_en;
    sn.select_sn_by_district_name(district_en, function(result) {
        console.log(result);
        console.log(result.length);
        if(result.length == 0 ){
            res.status(404).json({
                header: new Date,
                content: "result not found"
            });
        }else {
            res.status(200).json({
                header: new Date,
                content: result
            });
        }
    });
});

db_sn.get('/create/name_zh/:name_zh/nema_en/:name_en/area/:area',function(req, res){
    var name_zh = req.params.name_zh
    var name_en = req.params.name_en
    var area = req.params.area
    sn.addschoolNetwork(name_zh, name_en, area, function(data){
        res.status(200).json(
            {
                header: new Date,
                content: data
            }
        );
    })
});



db_sn.post('/create',function(req, res){
    var sn_name_zh = req.body.sn_name_zh;
    var sn_name_en = req.body.sn_name_en;
    var district_id = req.body.district_id;

    if(req.body.sn_name_zh === undefined || req.body.sn_name_en === undefined || req.body.district_id === undefined){
        throw Error('Invalid Input');
    } else {
        sn.addschoolNetwork(sn_name_zh,sn_name_en, district_id, function(return_id){
            res.status(200).json(
                {
                    header: new Date,
                    content: return_id
                }
            );
        })
    }
});

db_sn.post('/update',function(req, res){
    var id = req.body.id;
    var col = {
        name_en: req.body.name_en,
        name_zh: req.body.name_zh,
        area: req.body.area
    };
    if(req.body.id == undefined){
        throw Error("update id missing");
    } if(JSON.stringify(col) === '{}'){
        throw Error("empty paramtry");
    }else {
        sn.update(col, id, function(data){
            res.status(200).json(
                {
                    header: new Date,
                    content: data
                }
            );
        })
    }
});

db_sn.get('/delete/id/:id', function(req, res){
    var id= req.params.id;
    sn.delete(id, function(data){
        res.status(200).json({
            header: new Date,
            content: data
        });
    });
});

db_sn.use(function(err, req, res, next){
    err.response = err.message;
    next(err);
});
module.exports = db_sn;