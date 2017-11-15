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

// const fields = { id,owner_id,property_id,created_time };

function select_property_owner_relation(cb){
		 // select * from property_owner_relation
 	knex('property_owner_relation').select().then(function(result){
		cb(result);
	});
}
function select_property_owner_relation_by_property_id(property_id,cb){
	// select * from property_owner_relation
knex('property_owner_relation').where('property_id', property_id).where('status','enable').then(function(result){
   cb(result);
});
}
function create_property_owner_relation(data, cb){ 
		 // insert into property_owner_relation() values(................)
 	knex('property_owner_relation').insert({
		//waiting to write 
	}).then(function(id){
		cb(id);
	}).catch(function(err){
		cb(err)
	});
}
function update_property_owner_relation(id,owner_id,property_id,created_time,cb){
		 // update property_owner_relation set where id = id 
 	knex('property_owner_relation').update({/* Need Input fields */}).where({id:id}).then(function(){
		cb(true);
	}).catch(function(){
		cb(false);
	});
}

function delete_property_owner_relation(id, cb){
		 // delete from property_owner_relation where id = id 
 	knex('property_owner_relation').where({id:id}).then(function(){
		cb(true);
	}).catch(function(){
		cb(false);
	});
}
module.exports = {
	select_property_owner_relation: select_property_owner_relation,
	select_property_owner_relation_by_property_id: select_property_owner_relation_by_property_id,
	create_property_owner_relation: create_property_owner_relation,
	update_property_owner_relation: update_property_owner_relation,
	delete_property_owner_relation: delete_property_owner_relation
}