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

const fields = { id,branch_id,agent_id,status,created_at,modified_at };

function select_branch_agent_relation(cb){
		 // select * from branch_agent_relation
 	knex('branch_agent_relation').select().then(function(result){
		cb(result);
	});
}
function create_branch_agent_relation(data, cb){ 
		 // insert into branch_agent_relation() values(................)
 	knex('branch_agent_relation').insert({
		//waiting to write 
	}).then(function(id){
		cb(id);
	}).catch(function(err){
		cb(err)
	});
}
function update_branch_agent_relation(id,branch_id,agent_id,status,created_at,modified_at,cb){
		 // update branch_agent_relation set where id = id 
 	knex('branch_agent_relation').update({/* Need Input fields */}).where({id:id}).then(function(){
		cb(true);
	}).catch(function(){
		cb(false);
	});
}

function delete_branch_agent_relation(id, cb){
		 // delete from branch_agent_relation where id = id 
 	knex('branch_agent_relation').where({id:id}).then(function(){
		cb(true);
	}).catch(function(){
		cb(false);
	});
}
module.exports = {
	select_branch_agent_relation: select_branch_agent_relation,
	create_branch_agent_relation: create_branch_agent_relation,
	update_branch_agent_relation: update_branch_agent_relation,
	delete_branch_agent_relation: delete_branch_agent_relation
}