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



function select_agent(cb){
		 // select * from agent
		 // where 
 	knex('agent').select().then(function(result){
		cb(result);
	});
}
function create_agent(data, cb){ 
		 // insert into agent() values(................)
 	knex('agent').insert({
		//waiting to write 
	}).then(function(id){
		cb(id);
	}).catch(function(err){
		cb(err)
	});
}
function update_agent(id,agent_name_zh,agent_name_en,agent_phone,agent_reg_no,status,created_at,modified_at,cb){
		 // update agent set where id = id 
 	knex('agent').update({/* Need Input fields */}).where({id:id}).then(function(){
		cb(true);
	}).catch(function(){
		cb(false);
	});
}

function delete_agent(id, cb){
		 // delete from agent where id = id 
 	knex('agent').where({id:id}).then(function(){
		cb(true);
	}).catch(function(){
		cb(false);
	});
}
module.exports = {
	select_agent: select_agent,
	create_agent: create_agent,
	update_agent: update_agent,
	delete_agent: delete_agent
}