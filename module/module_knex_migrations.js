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

const fields = { id,name,batch,migration_time };

function select_knex_migrations(cb){
		 // select * from knex_migrations
 	knex('knex_migrations').select().then(function(result){
		cb(result);
	});
}
function create_knex_migrations(data, cb){ 
		 // insert into knex_migrations() values(................)
 	knex('knex_migrations').insert({
		//waiting to write 
	}).then(function(id){
		cb(id);
	}).catch(function(err){
		cb(err)
	});
}
function update_knex_migrations(id,name,batch,migration_time,cb){
		 // update knex_migrations set where id = id 
 	knex('knex_migrations').update({/* Need Input fields */}).where({id:id}).then(function(){
		cb(true);
	}).catch(function(){
		cb(false);
	});
}

function delete_knex_migrations(id, cb){
		 // delete from knex_migrations where id = id 
 	knex('knex_migrations').where({id:id}).then(function(){
		cb(true);
	}).catch(function(){
		cb(false);
	});
}
module.exports = {
	select_knex_migrations: select_knex_migrations,
	create_knex_migrations: create_knex_migrations,
	update_knex_migrations: update_knex_migrations,
	delete_knex_migrations: delete_knex_migrations
}