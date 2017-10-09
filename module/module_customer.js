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

const fields = { id,gender,name,phone,p_district,p_school_network,p_estate };

function select_customer(cb){
		 // select * from customer
 	knex('customer').select().then(function(result){
		cb(result);
	});
}
function create_customer(data, cb){ 
		 // insert into customer() values(................)
 	knex('customer').insert({
		//waiting to write 
	}).then(function(id){
		cb(id);
	}).catch(function(err){
		cb(err)
	});
}
function update_customer(id,gender,name,phone,p_district,p_school_network,p_estate,cb){
		 // update customer set where id = id 
 	knex('customer').update({/* Need Input fields */}).where({id:id}).then(function(){
		cb(true);
	}).catch(function(){
		cb(false);
	});
}

function delete_customer(id, cb){
		 // delete from customer where id = id 
 	knex('customer').where({id:id}).then(function(){
		cb(true);
	}).catch(function(){
		cb(false);
	});
}
module.exports = {
	select_customer: select_customer,
	create_customer: create_customer,
	update_customer: update_customer,
	delete_customer: delete_customer
}