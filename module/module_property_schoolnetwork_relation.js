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

const fields = { id,property_id,school_network_id };

function select_property_schoolnetwork_relation(cb){
		 // select * from property_schoolnetwork_relation
 	knex('property_schoolnetwork_relation').select().then(function(result){
		cb(result);
	});
}
function create_property_schoolnetwork_relation(data, cb){ 
		 // insert into property_schoolnetwork_relation() values(................)
 	knex('property_schoolnetwork_relation').insert({
		//waiting to write 
	}).then(function(id){
		cb(id);
	}).catch(function(err){
		cb(err)
	});
}
function update_property_schoolnetwork_relation(id,property_id,school_network_id,cb){
		 // update property_schoolnetwork_relation set where id = id 
 	knex('property_schoolnetwork_relation').update({/* Need Input fields */}).where({id:id}).then(function(){
		cb(true);
	}).catch(function(){
		cb(false);
	});
}

function delete_property_schoolnetwork_relation(id, cb){
		 // delete from property_schoolnetwork_relation where id = id 
 	knex('property_schoolnetwork_relation').where({id:id}).then(function(){
		cb(true);
	}).catch(function(){
		cb(false);
	});
}
module.exports = {
	select_property_schoolnetwork_relation: select_property_schoolnetwork_relation,
	create_property_schoolnetwork_relation: create_property_schoolnetwork_relation,
	update_property_schoolnetwork_relation: update_property_schoolnetwork_relation,
	delete_property_schoolnetwork_relation: delete_property_schoolnetwork_relation
}