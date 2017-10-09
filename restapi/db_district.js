'use static';

const express = require("express");
const config = require('config');
const bodyParser = require('body-parser');
const dt = require("./../module/module_district");
const db_distict = express.Router();

db_distict.use(function(req, res, next){
    res.set('Content-Type', 'application/json');
    next();
});

db_distict.use(bodyParser.urlencoded({ extended: true }));
db_distict.use(bodyParser.json());

db_distict.get('/ping', function(req, res){
    dt.selectall(function(data){
        res.status(200).json({
            header: new Date,
            content: data
        });
    });
});

db_distict.get('/select_by_area/:area', function(req, res){
    var area = req.params.area;
    dt.selectarea(area, function(data){
        res.status(200).json({
            header: new Date,
            content: data
        });
    });
});

db_distict.get('/select_by_name/:name', function(req, res){
    var name = req.params.name;
    dt.selectname(name, function(data){
        res.status(200).json({
            header: new Date,
            content: data
        });
    });
});

db_distict.get('/create/name_zh/:name_zh/nema_en/:name_en/area/:area',function(req, res){
    var name_zh = req.params.name_zh
    var name_en = req.params.name_en
    var area = req.params.area
    dt.adddistrict(name_zh, name_en, area, function(data){
        res.status(200).json(
            {
                header: new Date,
                content: data
            }
        );
    })
});



db_distict.post('/create',function(req, res){
    var name_en = req.body.name_en;
    var name_zh = req.body.name_zh;
    var area = req.body.area;

    if(req.body.name_en == undefined || req.body.name_zh == undefined || req.body.area == undefined){
        throw Error('Invalid Input');
    } else {
        dt.adddistrict(name_zh,name_en, area, function(return_id){
            res.status(200).json(
                {
                    header: new Date,
                    content: return_id
                }
            );
        })
    }
});

db_distict.post('/update',function(req, res){
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
        dt.update(col, id, function(data){
            res.status(200).json(
                {
                    header: new Date,
                    content: data
                }
            );
        })
    }
});

db_distict.get('/delete/id/:id', function(req, res){
    var id= req.params.id;
    dt.delete(id, function(data){
        res.status(200).json({
            header: new Date,
            content: data
        });
    });
});

db_distict.use(function(err, req, res, next){
    err.response = err.message;
    next(err);
});
module.exports = db_distict;