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

// const fields = { id,ref_no,branch_id,agent_id,customer_id,created_at,modified_at };

function select_transection(cb){
		 // select * from transection
 	knex('transection').select().then(function(result){
		cb(result);
	});
}

function get_salling_report_by_branch_id(branch_id, cb){
	// SELECT transection.ref_no,  agent.agent_name_zh , agent.agent_name_en,selling_price, commission,
	// (selling_price * commission) as total, transection.created_at
	// FROM hkproperties.transection
	// left join transection_item on transection_item.transection_id = transection.id
	// left join agent on agent.id = transection.agent_id
	// where transection.branch_id = {branch_id} and selling_price is not null;
	knex('transection').select(knex.raw('transection.ref_no,  agent.agent_name_zh , agent.agent_name_en,selling_price, commission, (`selling_price` * `commission`) as `total`, transection.created_at'))
	.leftJoin('transection_item', 'transection_item.transection_id' , 'transection.id')
	.leftJoin('agent','agent.id','transection.agent_id')
	.where('transection.branch_id', branch_id).whereNotNull('selling_price').then(function(result){
		console.log(result);
		cb(result);
	});
}

function get_rental_report_by_branch_id(branch_id, cb){
	// SELECT  transection.ref_no,  agent.agent_name_zh , agent.agent_name_en, rental_price as total, transection.created_at
	// FROM hkproperties.transection
	// left join transection_item on transection_item.transection_id = transection.id
	// left join agent on agent.id = transection.agent_id
	// where transection.branch_id = {branch_id} and rental_price is not null;
	knex('transection').select(knex.raw('transection.ref_no,  agent.agent_name_zh , agent.agent_name_en,  rental_price, commission, rental_price as total, transection.created_at'))
	.leftJoin('transection_item', 'transection_item.transection_id' , 'transection.id')
	.leftJoin('agent','agent.id','transection.agent_id')
	.where('transection.branch_id', branch_id).whereNotNull('rental_price').then(function(result){
		cb(result);
	});
}

function create_transection(data, cb){ 
		 // insert into transection() values(................)
 	knex('transection').insert({
		//waiting to write 
	}).then(function(id){
		cb(id);
	}).catch(function(err){
		cb(err)
	});
}
function update_transection(id,ref_no,branch_id,agent_id,customer_id,created_at,modified_at,cb){
		 // update transection set where id = id 
 	knex('transection').update({/* Need Input fields */}).where({id:id}).then(function(){
		cb(true);
	}).catch(function(){
		cb(false);
	});
}

function delete_transection(id, cb){
		 // delete from transection where id = id 
 	knex('transection').where({id:id}).then(function(){
		cb(true);
	}).catch(function(){
		cb(false);
	});
}
module.exports = {
	select_transection: select_transection,
	get_salling_report_by_branch_id: get_salling_report_by_branch_id,
	get_rental_report_by_branch_id: get_rental_report_by_branch_id,
	create_transection: create_transection,
	update_transection: update_transection,
	delete_transection: delete_transection
}