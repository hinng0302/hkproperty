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

// const fields = { id,owner_name,owner_phone_number,created_at,modified_at };

function select_property_owner(cb){
		 // select * from property_owner
 	knex('property_owner').select().then(function(result){
		cb(result);
	});
}
function create_property_owner(data, cb){ 
		 // insert into property_owner() values(................)
 	knex('property_owner').insert(data).then(function(id){
		cb(id);
	}).catch(function(err){
		cb(err)
	});
}
function update_property_owner(id,owner_name,owner_phone_number,created_at,modified_at,cb){
		 // update property_owner set where id = id 
 	knex('property_owner').update({/* Need Input fields */}).where({id:id}).then(function(){
		cb(true);
	}).catch(function(){
		cb(false);
	});
}

function delete_property_owner(id, cb){
		 // delete from property_owner where id = id 
 	knex('property_owner').where({id:id}).then(function(){
		cb(true);
	}).catch(function(){
		cb(false);
	});
}
module.exports = {
	select_property_owner: select_property_owner,
	create_property_owner: create_property_owner,
	update_property_owner: update_property_owner,
	delete_property_owner: delete_property_owner
}