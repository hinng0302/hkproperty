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

const fields = { id,transection_id,property_id,commition,rental_price,rentald_per_month,selling_price,transection_item,created_at };

function select_transection_item(cb){
		 // select * from transection_item
 	knex('transection_item').select().then(function(result){
		cb(result);
	});
}
function create_transection_item(data, cb){ 
		 // insert into transection_item() values(................)
 	knex('transection_item').insert({
		//waiting to write 
	}).then(function(id){
		cb(id);
	}).catch(function(err){
		cb(err)
	});
}
function update_transection_item(id,transection_id,property_id,commition,rental_price,rentald_per_month,selling_price,transection_item,created_at,cb){
		 // update transection_item set where id = id 
 	knex('transection_item').update({/* Need Input fields */}).where({id:id}).then(function(){
		cb(true);
	}).catch(function(){
		cb(false);
	});
}

function delete_transection_item(id, cb){
		 // delete from transection_item where id = id 
 	knex('transection_item').where({id:id}).then(function(){
		cb(true);
	}).catch(function(){
		cb(false);
	});
}
module.exports = {
	select_transection_item: select_transection_item,
	create_transection_item: create_transection_item,
	update_transection_item: update_transection_item,
	delete_transection_item: delete_transection_item
}