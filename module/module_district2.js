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

const fields = { id,name_zh,name_en,area,created_at,updated_at };

function select_district2(cb){
		 // select * from district2
 	knex('district2').select().then(function(result){
		cb(result);
	});
}
function create_district2(data, cb){ 
		 // insert into district2() values(................)
 	knex('district2').insert({
		//waiting to write 
	}).then(function(id){
		cb(id);
	}).catch(function(err){
		cb(err)
	});
}
function update_district2(id,name_zh,name_en,area,created_at,updated_at,cb){
		 // update district2 set where id = id 
 	knex('district2').update({/* Need Input fields */}).where({id:id}).then(function(){
		cb(true);
	}).catch(function(){
		cb(false);
	});
}

function delete_district2(id, cb){
		 // delete from district2 where id = id 
 	knex('district2').where({id:id}).then(function(){
		cb(true);
	}).catch(function(){
		cb(false);
	});
}
module.exports = {
	select_district2: select_district2,
	create_district2: create_district2,
	update_district2: update_district2,
	delete_district2: delete_district2
}