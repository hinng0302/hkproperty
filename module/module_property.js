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

const fields = { id,district,estate_name,block_number,floor_number,flat_number,gross_building_area,practical_building_area,num_room,num_livingrm,car_park,selling_price,rental_price,description,lat,lng,ref_no,status,created_at,modified_at };

function select_property(cb){
		 // select * from property
 	knex('property').select().then(function(result){
		cb(result);
	});
}
function create_property(data, cb){ 
		 // insert into property() values(................)
 	knex('property').insert({
		//waiting to write 
	}).then(function(id){
		cb(id);
	}).catch(function(err){
		cb(err)
	});
}
function update_property(id,district,estate_name,block_number,floor_number,flat_number,gross_building_area,practical_building_area,num_room,num_livingrm,car_park,selling_price,rental_price,description,lat,lng,ref_no,status,created_at,modified_at,cb){
		 // update property set where id = id 
 	knex('property').update({/* Need Input fields */}).where({id:id}).then(function(){
		cb(true);
	}).catch(function(){
		cb(false);
	});
}

function delete_property(id, cb){
		 // delete from property where id = id 
 	knex('property').where({id:id}).then(function(){
		cb(true);
	}).catch(function(){
		cb(false);
	});
}
module.exports = {
	select_property: select_property,
	create_property: create_property,
	update_property: update_property,
	delete_property: delete_property
}