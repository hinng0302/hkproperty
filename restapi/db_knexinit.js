'use static';

const express = require("express");
const config = require('config');
const bodyParser = require('body-parser');
const init = require("./../module/module_init");
var fs = require('fs');
const db_knex = express.Router();

function print_table(table_name){
    if(table_name != null){
    var filename = "module_"+table_name+".js";
    init.select_fields_from_table(table_name, function(fields){
        console.log(table_name,filename, fields);
        var pk_id;
        
        fields.forEach(function(element) {
            if(element=='id' || element==table_name+'_id'){
                pk_id = element;
            }
        }, this);
        console.log(pk_id);
        
        fs.writeFile('module/'+filename, "\'use static\';\nconst mysql = require(\'mysql\')\;\n"+
        "const config = require(\'config\');\n"+
        "const ENV = config.get(\'ENV\');\n"+
        "const options = {\n"+
            "\tuser: config.get(ENV).get(\"MYSQL\").get(\"user\"),\n"+
            "\tpassword: config.get(ENV).get(\"MYSQL\").get(\"password\"),\n"+
            "\tdatabase: config.get(ENV).get(\"MYSQL\").get(\"database\"),\n"+
        "};\n\n"+
        "const knex = require('knex')({\n"+
            "\tclient: 'mysql',\n"+
            "\tconnection: options\n"+
        "});\n\n"+
        "const fields = { "+fields+" };\n\n"+
        "function select_"+table_name+"(cb){\n"+
        "\t\t // select * from "+table_name+"\n "+
            "\tknex(\'"+table_name+"\').select().then(function(result){\n"+
            "\t\tcb(result);\n"+
            "\t});\n"+
        "}\n"+
        "function create_"+table_name+"(data, cb){ \n"+
        "\t\t // insert into "+table_name+"() values(................)\n "+
            "\tknex('"+table_name+"').insert({\n"+
                "\t\t//waiting to write \n"+
            "\t}).then(function("+pk_id+"){\n"+
                "\t\tcb("+pk_id+");\n"+
            "\t}).catch(function(err){\n"+
            "\t\tcb(err)\n"+
            "\t});\n"+
        "}\n"+
        "function update_"+table_name+"("+fields+",cb){\n"+
        "\t\t // update "+table_name+" set where "+pk_id+" = "+pk_id+" \n "+
            "\tknex('"+table_name+"').update({/* Need Input fields */}).where({"+pk_id+":"+pk_id+"}).then(function(){\n"+
                "\t\tcb(true);\n"+
            "\t}).catch(function(){\n"+
                "\t\tcb(false);\n"+
            "\t});\n"+
        "}\n\n"+
        "function delete_"+table_name+"("+pk_id+", cb){\n"+
        "\t\t // delete from "+table_name+" where "+pk_id+" = "+pk_id+" \n "+
        "\tknex('"+table_name+"').where({"+pk_id+":"+pk_id+"}).then(function(){\n"+
        "\t\tcb(true);\n"+
        "\t}).catch(function(){\n"+
        "\t\tcb(false);\n"+
        "\t});\n"+
        "}\n"+
        "module.exports = {\n"+
        "\tselect_"+table_name+": select_"+table_name+",\n"+
        "\tcreate_"+table_name+": create_"+table_name+",\n"+
        "\tupdate_"+table_name+": update_"+table_name+",\n"+
        "\tdelete_"+table_name+": "+"delete_"+table_name+"\n"+ 
        "}"
        , function(err){
            if(err) {
                throw Error('something wrong');
            }
        });
    });
    }
}

db_knex.use(function(req, res, next){
    res.set('Content-Type', 'application/json');
    next();
});


db_knex.get('/init', function(req, res){
    init.select_tablesname_from_database(
        function(result){
        for(var i = 0; i<result.length; i++){
            (function(i){
                print_table(result[i].TABLE_NAME);
        })(i);
    }
    res.status(200).json({
        header: new Date,
        content:'success!'
    });
    });
}
);
module.exports = db_knex;