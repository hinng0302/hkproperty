//SELECT TABLE_NAME,TABLE_TYPE 
//FROM INFORMATION_SCHEMA.TABLES
//WHERE TABLE_SCHEMA='hkproperties' ;
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

function select_tablesname_from_database(cb){
    knex('INFORMATION_SCHEMA.TABLES').select(['TABLE_NAME']).where({TABLE_SCHEMA: 'hkproperties'}).then(function(TABLE_NAME){
        cb(TABLE_NAME);
    });
}

function select_fields_from_table(table, cb){
    //select column_name from information_schema.columns where table_name='tableName';
    knex('information_schema.columns').select(['column_name']).where({table_name: table}).then(function(result){
        var field_name = [];
        for(var i = 0; i< result.length; i++){
            field_name.push(result[i].column_name);
        }
        cb(field_name);
    });
}

module.exports = {
    select_tablesname_from_database: select_tablesname_from_database,
    select_fields_from_table: select_fields_from_table
};