'use static';
const mysql = require('mysql');
const config = require('config');
const ENV = config.get('ENV');
const options = {
	user: config.get(ENV).get("MYSQL").get("user"),
	password: config.get(ENV).get("MYSQL").get("password"),
	database: config.get(ENV).get("MYSQL").get("database"),
};

const knex = require('knex')({
	client: 'mysql',
	connection: options
});

const fields = { id,sn_name_zh,sn_name_en,district_id };

function select_school_network(cb){
		 // select * from school_network
 	knex('school_network').select().then(function(result){
		cb(result);
	});
}
function create_school_network(data, cb){ 
		 // insert into school_network() values(................)
 	knex('school_network').insert({
		//waiting to write 
	}).then(function(id){
		cb(id);
	}).catch(function(err){
		cb(err)
	});
}
function update_school_network(id,sn_name_zh,sn_name_en,district_id,cb){
		 // update school_network set where id = id 
 	knex('school_network').update({/* Need Input fields */}).where({id:id}).then(function(){
		cb(true);
	}).catch(function(){
		cb(false);
	});
}

function delete_school_network(id, cb){
		 // delete from school_network where id = id 
 	knex('school_network').where({id:id}).then(function(){
		cb(true);
	}).catch(function(){
		cb(false);
	});
}
module.exports = {
	select_school_network: select_school_network,
	create_school_network: create_school_network,
	update_school_network: update_school_network,
	delete_school_network: delete_school_network
}