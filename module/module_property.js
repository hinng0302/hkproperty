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

// const fields = { id,district,estate_name,block_number,floor_number,flat_number,gross_building_area,practical_building_area,num_room,num_livingrm,car_park,selling_price,rental_price,description,lat,lng,ref_no,status,created_at,modified_at };
function select_property_by_id(id, cb) {
	knex('property').where('id',id).then(function(result){
		cb(result);
	});
}
function search_property(estate_name, sale_type, low_range, high_range , cb){
	if(!estate_name && !low_range &&!high_range){
		knex('property').whereNotNull(sale_type).then(function(result){
			console.log(result);
			cb(result);
		});
	}else if(!estate_name){
		knex('property').whereNotNull(sale_type).whereBetween(sale_type, [low_range, high_range]).then(function(result){
			console.log(result);
			cb(result);
		});
	} else {
		knex('property').whereBetween(sale_type, [low_range, high_range])
		.where('estate_name', 'like',  '%'+estate_name+'%', )
		.orWhere('estate_name_en', 'like','%'+estate_name+'%' )
		.whereNotNull(sale_type)
		.then(function(result){
			console.log(result);
			cb(result);
		});
	}

}
function select_selling_property(offset,cb){
	// select * from property where status ='enable' and selling_price is not null limit 10 offset {offset};
	knex('property').where('status', 'enable').whereNotNull('selling_price').limit(10).offset(offset).orderBy('created_at', 'desc').then(function(result){
		cb(result);
	});
}

function select_count_selling_property(cb){
	// select count(*) as a from property where status = 'enable' and selling_price is not null;
	knex('property').count('id as a').where('status', 'enable').whereNotNull('selling_price').then(function(result){
		// console.log(result);
		cb(result[0].a)
	});
}
function select_count_rent_property(cb){
	// select count(*) as a from property where status = 'enable' and rental_price is not null;
	knex('property').count('id as a').where('status', 'enable').whereNotNull('rental_price').then(function(result){
		// console.log(result);
		cb(result[0].a)
	});
}

function select_rent_property(offset,cb){
	// select * from property where status ='enable' and rental_price is not null limit 10 offset {offset};
	knex('property').where('status', 'enable').whereNotNull('rental_price').limit(10).offset(offset).orderBy('created_at', 'desc').then(function(result){
		cb(result);
	});
}

function select_random_property(cb){
	// select * from property order by rand() limit 9;
	knex('property').orderByRaw('rand()').limit(9).then(function(result){
		cb(result);
	});
}

function select_property_by_ref_no(ref_no, cb){
	knex('property').where(
		'ref_no', ref_no
	).then(function(result){
		cb(result);
	});
}

function select_property_id_by_ref_no(ref_no, cb){
	knex('property').select('id').where(
		'ref_no', ref_no
	).then(function(result){
		cb(result);
	});
}

function select_property_full_details_by_property_id(property_id,cb){
	knex.select('*').from('property').leftJoin('district', 'district.id', 'property.district')
	.where('property.id', property_id).then(function(result){
		cb(result);
	});
}

function create_property(data, cb){ 
		 // insert into property() values(................)
 	knex('property').insert(data).then(function(id){
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
	select_property_by_id: select_property_by_id,
	search_property:search_property,
	select_selling_property: select_selling_property,
	select_count_selling_property: select_count_selling_property,
	select_count_rent_property: select_count_rent_property,
	select_rent_property: select_rent_property,
	select_random_property: select_random_property,
	select_property_by_ref_no: select_property_by_ref_no,
	select_property_id_by_ref_no:select_property_id_by_ref_no,
	select_property_full_details_by_property_id: select_property_full_details_by_property_id,
	create_property: create_property,
	update_property: update_property,
	delete_property: delete_property
}