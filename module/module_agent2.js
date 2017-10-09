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

function create_agent(agent_name_zh, agent_name_en, agent_phone, agent_reg_no, cb){
    knex('agent').insert(
        {
            agent_name_en: agent_name_en,
            agent_name_zh: agent_name_zh,
            agent_phone: agent_phone,
            agent_reg_no: agent_reg_no,
            status: 'enable'
        }).then(function(id){
            cb(id);
        }).catch(function(err){
            cb(err);
        });
}

function select_agent_by_agent_id(id, cb){
    knex('agent').where({id: id}).andWhere({status: 'enable'}).then(function(result){
        cb(result);
    }).catch(function(err){
        cb(err);
    });
}

function select_agent_by_agent_phone(agent_phone, cb){
    knex('agent').where({agent_phone: agent_phone}).andWhere({status: 'enable'}).then(function(result){
        cb(result);
    }).catch(function(err){
        cb(err);
    });
}

function update_agent_by_id(data,id, cb){
    knex('agent').where({agent_phone: agent_phone}).then(function(result){
        cb(result);
    }).catch(function(err){
        cb(err);
    });
}

function delete_agent_by_id(id, cb){
    
    knex('agent').where({id: id}).del().then(function(data){
            cb(true);
        });
}




module.exports = {
    select_agent_by_agent_id: select_agent_by_agent_id,
    select_agent_by_agent_phone: select_agent_by_agent_phone,
    update_agent_by_id: update_agent_by_id,
    delete_agent_by_id: delete_agent_by_id
};