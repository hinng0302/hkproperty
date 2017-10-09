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

const fields = { id,agent_id,agent_password };

function select_agent_password(cb){
		 // select * from agent_password
 	knex('agent_password').select().then(function(result){
		cb(result);
	});
}
function create_agent_password(data, cb){ 
		 // insert into agent_password() values(................)
 	knex('agent_password').insert({
		//waiting to write 
	}).then(function(id){
		cb(id);
	}).catch(function(err){
		cb(err)
	});
}
function update_agent_password(id,agent_id,agent_password,cb){
		 // update agent_password set where id = id 
 	knex('agent_password').update({/* Need Input fields */}).where({id:id}).then(function(){
		cb(true);
	}).catch(function(){
		cb(false);
	});
}

function delete_agent_password(id, cb){
		 // delete from agent_password where id = id 
 	knex('agent_password').where({id:id}).then(function(){
		cb(true);
	}).catch(function(){
		cb(false);
	});
}
module.exports = {
	select_agent_password: select_agent_password,
	create_agent_password: create_agent_password,
	update_agent_password: update_agent_password,
	delete_agent_password: delete_agent_password
}