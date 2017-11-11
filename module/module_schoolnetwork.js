'use static';
const mysql = require('mysql');
const config = require('config');
const ENV = config.get('ENV');
const options = {
    user: config.get(ENV).get("MYSQL").get("user"),
    password: config.get(ENV).get("MYSQL").get("password"),
    database: config.get(ENV).get("MYSQL").get("database"),
}

const knex = require('knex')({
    client: 'mysql',
    connection: options
});

function selectall(cb){
    knex.select().from('school_network').then(function(row){
        cb(row);
    });
}

function select_sn_by_district_name(en, cb){
    //select * from school_network left join district on district_id = district.id;
    //['district_id', 'school_network.sn_name_zh', 'school_network.sn_name_en', 'district.name_zh', 'district.name_en']
    knex.select(['district_id', 'school_network.sn_name_zh', 'school_network.sn_name_en', 'district.name_zh', 'district.name_en'])
    .from('school_network').join('district', function(){
        this.on('district_id' ,'=' ,'district.id').onIn('area',en);
    }).then(function(result){
        cb(result);
    });
}

function select_by_district(district_id , cb){
    knex('school_network').where({district_id: district_id}).then(function(result){
        cb(result);
    });
}

function addschoolNetwork(sn_name_zh, sn_name_en, district_id,cb){
    knex.insert({sn_name_zh: sn_name_zh, sn_name_en: sn_name_en, district_id: district_id}).into('school_network').then(function(id) {
        cb(id)
    }).catch(function(err){
        cb(err);
    });
}

function update(data, id, cb){
    knex('school_network').update(data).where({id :id}).then(function(id){
        cb(id);
    });
}

function remove(id, cb){
    knex('school_network').where({id: id}).then(function(){
        cb(ture);
    }).catch(function(){
        cb(false);
    });
}

module.exports = {
    selectall: selectall,
    select_by_district: select_by_district,
    select_sn_by_district_name: select_sn_by_district_name,
    addschoolNetwork: addschoolNetwork,
    update: update,
    delete: remove
}