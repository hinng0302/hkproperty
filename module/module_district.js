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


function selectall(cb){
		 // select * from district
 	knex('district').select().then(function(result){
		cb(result);
	});
}

function select_district_by_id(id,cb){
	// select * from district where id = id
	knex('district').select().where({id: id}).then(function(result){
	   cb(result);
   });
}

function select_district_by_area(area,cb){
	// select * from district where area = id
	knex('district').select().where({area: area}).then(function(result){
	   cb(result);
   });
}

function create_district(data, cb){ 
		 // insert into district() values(................)
 	knex('district').insert({
		//waiting to write 
	}).then(function(id){
		cb(id);
	}).catch(function(err){
		cb(err)
	});
}
function update_district(id,name_zh,name_en,area,cb){
		 // update district set where id = id 
 	knex('district').update({/* Need Input fields */}).where({id:id}).then(function(){
		cb(true);
	}).catch(function(){
		cb(false);
	});
}

function delete_district(id, cb){
		 // delete from district where id = id 
 	knex('district').where({id:id}).then(function(){
		cb(true);
	}).catch(function(){
		cb(false);
	});
}

module.exports = {
	selectall: selectall,
	select_district_by_id: select_district_by_id,
	create_district: create_district,
	update_district: update_district,
	delete_district: delete_district
}