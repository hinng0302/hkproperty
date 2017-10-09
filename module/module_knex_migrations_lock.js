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

const fields = { is_locked };

function select_knex_migrations_lock(cb){
		 // select * from knex_migrations_lock
 	knex('knex_migrations_lock').select().then(function(result){
		cb(result);
	});
}
function create_knex_migrations_lock(data, cb){ 
		 // insert into knex_migrations_lock() values(................)
 	knex('knex_migrations_lock').insert({
		//waiting to write 
	}).then(function(undefined){
		cb(undefined);
	}).catch(function(err){
		cb(err)
	});
}
function update_knex_migrations_lock(is_locked,cb){
		 // update knex_migrations_lock set where undefined = undefined 
 	knex('knex_migrations_lock').update({/* Need Input fields */}).where({undefined:undefined}).then(function(){
		cb(true);
	}).catch(function(){
		cb(false);
	});
}

function delete_knex_migrations_lock(undefined, cb){
		 // delete from knex_migrations_lock where undefined = undefined 
 	knex('knex_migrations_lock').where({undefined:undefined}).then(function(){
		cb(true);
	}).catch(function(){
		cb(false);
	});
}
module.exports = {
	select_knex_migrations_lock: select_knex_migrations_lock,
	create_knex_migrations_lock: create_knex_migrations_lock,
	update_knex_migrations_lock: update_knex_migrations_lock,
	delete_knex_migrations_lock: delete_knex_migrations_lock
}