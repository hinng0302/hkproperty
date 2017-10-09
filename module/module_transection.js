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

const fields = { id,ref_no,branch_id,agent_id,customer_id,created_at,modified_at };

function select_transection(cb){
		 // select * from transection
 	knex('transection').select().then(function(result){
		cb(result);
	});
}
function create_transection(data, cb){ 
		 // insert into transection() values(................)
 	knex('transection').insert({
		//waiting to write 
	}).then(function(id){
		cb(id);
	}).catch(function(err){
		cb(err)
	});
}
function update_transection(id,ref_no,branch_id,agent_id,customer_id,created_at,modified_at,cb){
		 // update transection set where id = id 
 	knex('transection').update({/* Need Input fields */}).where({id:id}).then(function(){
		cb(true);
	}).catch(function(){
		cb(false);
	});
}

function delete_transection(id, cb){
		 // delete from transection where id = id 
 	knex('transection').where({id:id}).then(function(){
		cb(true);
	}).catch(function(){
		cb(false);
	});
}
module.exports = {
	select_transection: select_transection,
	create_transection: create_transection,
	update_transection: update_transection,
	delete_transection: delete_transection
}