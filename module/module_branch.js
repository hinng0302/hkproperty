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

function select_branch(cb){
		 // select * from branch
 	knex('branch').select().then(function(result){
		cb(result);
	});
}
function select_branch_by_code(branchcode, cb){
	knex('branch').where( {branch_code: branchcode}).then(function(result){
		cb(result);
	});
}

function create_branch(data, cb){ 
		 // insert into branch() values(................)
 	knex('branch').insert({
		//waiting to write 
	}).then(function(id){
		cb(id);
	}).catch(function(err){
		cb(err)
	});
}
function update_branch(id,branch_name,manager_id,location,phone,branch_code,created_at,modified_at,cb){
		 // update branch set where id = id 
 	knex('branch').update({/* Need Input fields */}).where({id:id}).then(function(){
		cb(true);
	}).catch(function(){
		cb(false);
	});
}

function delete_branch(id, cb){
		 // delete from branch where id = id 
 	knex('branch').where({id:id}).then(function(){
		cb(true);
	}).catch(function(){
		cb(false);
	});
}
module.exports = {
	select_branch: select_branch,
	select_branch_by_code: select_branch_by_code,
	create_branch: create_branch,
	update_branch: update_branch,
	delete_branch: delete_branch
}