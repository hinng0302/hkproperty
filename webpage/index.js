"use static"
const mp = require("../module/module_property");
const express = require("express");
const config = require("config");
const bodyParser = require('body-parser');
const session = require('express-session');
var jade = require('jade');
var fs = require('fs');
var path = require('path');
app = express.Router();

app.use( bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
// app.use(express.bodyParser());
app.route('/').all(function(req, res, next){
    next();
}).get(function(req, res){
    mp.select_random_property(function(result){
        var ret = {
            pageTitle: 'hkproperty',
            title:'Featured Property',
            properties: result
        }
        if(req.session.is_login) {
            ret.agent = req.session.agent.agent_name_en;
            ret.agent_details = req.session.agent;
        }
        res.render('../views/index', ret);
    });
}).post(function(req, res){
    res.send("not implemented");
});
app.get('/agent', function(req, res){
    var ret = {};
    var agent = require('../module/module_agent');
    var promise = new Promise(function(resolve, reject){
        agent.select_count_agent(function(count){
            ret = {
                pageTitle: 'hkproperty',
                title: 'Agent',
                count: count
            }
            resolve(ret);
        });
    });
    promise.then(function(result){
        return new Promise(function(resolve, reject){
            agent.select_agent(function(agents){
                
                result.agents= agents;
                resolve(result);
            });
        });
    }).then(function(result){
        
        if(req.session.is_login == 1){
            ret.agent = req.session.agent.agent_name_en;
            ret.agent_details = req.session.agent;
        }
        res.render('../views/agent_listing', ret);
    });
});


app.get('/agent/details/:reg_no', function(req, res){
    var reg_no = req.params.reg_no;
    var ret = {};
    var agent = require('../module/module_agent');
    var parmise = new Promise(function(resolve, reject){
        agent.select_agent_by_reg_no(reg_no, function(id){
            resolve(id);
        });
    });
    parmise.then(function(id){
        return new Promise(function (resolve, reject){
            // select agent by id
            agent.select_agent_by_id(id, function(result){
                resolve(result);
            });
        })
    }).then(function(result){
        ret = {
            title: 'Agent Details',
            pageTitle: 'Agent Details',
            agent_details: result[0]
        }
        if(req.session.is_login){
            ret.agent = req.session.agent.agent_name_en;
            ret.agent_details = req.session.agent;
        }
        
        res.render('../views/agent_page', ret)
    });
});

app.get('/selling', function(req,res){
    var parmise = new Promise(function(resolve,reject){
        mp.select_count_selling_property(function(result){
            var ret = {total: result};
            resolve(ret);
        });
    });
    parmise.then(function(result){
        return new Promise(function(resolve, reject){
            mp.select_selling_property(0, function(property_data){
                result.property= property_data;
                resolve(result);
            });
        });
    }).then(function(result){
        var ret = {
            maxpage: Math.ceil(result.total/10),
            pageTitle: 'hkproperty',
            title: 'Selling',
            properties: result.property
        };
        if(req.session.is_login){
            ret.agent = req.session.agent.agent_name_en;
            ret.agent_details = req.session.agent;
        }
        res.render('../views/index', ret);
    });
});
app.get('/selling/page/:page', function(req,res){
    var page = req.params.page;
    var offset = 0;
    page = page -1;
    if(page < 0){
        offset = 0;
    }else {
        offset = page * 10;
    }
    var parmise = new Promise(function(resolve,reject){
        mp.select_count_selling_property(function(result){
            var ret = {total: result};
            resolve(ret);
        });
    });
    parmise.then(function(result){
        return new Promise(function(resolve, reject){
            mp.select_selling_property(offset, function(property_data){
                result.property= property_data;
                resolve(result);
            });
        });
    }).then(function(result){
        var ret = {
            maxpage: Math.ceil(result.total/10),
            pageTitle: 'hkproperty',
            title: 'Selling',
            properties: result.property
        };
        if(req.session.is_login == 1){
            ret.agent = req.session.agent_name_en;
            ret.agent_details = req.session.agent;
        }
        
        res.render('../views/index', ret);
    });
});

app.get('/rent', function(req,res){
    var promise = new Promise(function(resolve, reject){
        mp.select_count_rent_property(function(result){
            var ret = {total: result};
            resolve(ret);
        });
    });
    promise.then(function(result){
        return new Promise(function(resolve, reject){
            mp.select_rent_property(0, function(property_data){
                result.property = property_data;
                resolve(result);
            });
        });
    }).then(function(result){
        var ret = {
            maxpage: Math.ceil(result.total/10),
            pageTitle: 'hkproperty',
            title: 'rent',
            properties: result.property
        };
        if(req.session){
            if(req.session.is_login){
                ret.agent = req.session.agent.agent_name_en;
                ret.agent_details= req.session.agent;
            }
        }
        
        res.render('../views/index', ret);
    });
});

app.get('/rent/page/:page', function(req,res){
    var page = req.params.page;
    var offset = 0;
    page = page -1;
    if(page < 0){
        offset = 0;
    }else {
        offset = page * 10;
    }
    
    var promise = new Promise(function(resolve, reject){
        mp.select_count_rent_property(function(result){
            var ret = {total: result};
            resolve(ret);
        });
    });
    promise.then(function(result){
        return new Promise(function(resolve, reject){
            mp.select_rent_property(offset, function(property_data){
                result.property= property_data;
                resolve(result);
            });
        });
    }).then(function(result){
        
        var ret = {
            maxpage: Math.ceil(result.total/10),
            pageTitle: 'hkproperty',
            title: 'rent',
            properties: result.property
        };
        if(req.session.is_login == 1){
            ret.agent = req.session.agent_name_en;
            ret.agent_details = req.session.agent;
        }
        
        res.render('../views/index', ret);
    });
});
app.get('/property/details/:ref_no', function(req,res){
    var promise = new Promise(function (resolve,reject){
        mp.select_property_id_by_ref_no(req.params.ref_no,function(result){
            if(result.length == 0){
                reject('error, result not found');
            }
            if(!result[0].id)
                reject('error, result not found');
            var ret ={id: result[0].id};
            resolve(ret);
        })
    });
    promise.then(function(result){
        return new Promise(function(resolve, reject){
            var id = result.id;
            mp.select_property_full_details_by_property_id(id, function(result_property){
                result.property = result_property[0];
                resolve(result);
            });
        });
    }).then(function(result){
        
        return new Promise(function(resolve, reject){
            var prop_owner =require("../module/module_property_owner_relation");
            prop_owner.select_property_owner_relation_by_property_id(result.id, function(property_owner){
                console.log(result.id);
                console.log(property_owner);
                result.owners = property_owner;
                resolve(result);
            });
        });
    }).then(function(result){
        
        var ret = {
            pageTitle: 'hkproperty: ' +result.property.estate_name_en,
            title: "( Ref:"+result.property.ref_no+") "+result.property.estate_name_en,
            properties: result.property,
            owners: result.owners
        }
        if(req.session.is_login){
            ret.agent = req.session.agent.agent_name_en;
            ret.agent_details = req.session.agent;
        }
        res.render('../views/property_details', ret)
    });
});

app.get('/branch', function(req, res){
    var branch_module = require('../module/module_branch');
    branch_module.select_branch(function(result){
        
        var ret = {
            pageTitle: 'hkproperty: branch',
            title: "Branch",
            branches: result
        }
        if(req.session.is_login){
            ret.agent = req.session.agent.agent_name_en;
            ret.agent_details = req.session.agent;
        }
        res.render('branch_listing', ret);
    });
});

app.get('/NewProperty', function(req, res){
    // if(!req.session || !req.session.is_login){
    //     res.redirect('/webapp');
    // }
    var ret = {
        title: 'New Property',
        pageTitle: 'Add New Property'
    }
    if(req.session.is_login){
        ret.agent = req.session.agent.agent_name_en;
        ret.agent_details = req.session.agent;
    }
    var district = require('../module/module_district');
    var promise = new Promise(function(resolve, reject){
        district.selectall(function(result){
            resolve(result);
        });
    });
    promise.then(function(result){
        ret.districts = result;
        res.render('new_property', ret);
    });
});

app.get('/newproperty/property_owner/:property_id', function(req, res){
    // if(!req.session || !req.session.is_login){
    //     res.redirect('/webapp');
    // }
    var id = req.params.property_id;
    var ret = {};
    var promise = new Promise(function(resolve, reject){
        mp.select_property_full_details_by_property_id(id, function(result_property){
            ret.property = result_property[0];
            resolve(ret);
        });
    });

    promise.then(function(result){
        var district = require('../module/module_district');
        return new Promise(function(resolve, reject){
            district.selectall(function(districts){
                result.districts;
                ret.district = districts;
                resolve(result);
            });
        });
    }).then(function(result){
        
        var ret = {
            pageTitle: 'hkproperty: ' +result.property.estate_name_en,
            title: "( Ref:"+result.property.ref_no+") "+result.property.estate_name_en,
            properties: result.property,
            owners: [],//result.owners,
            distrcit: result.district
        };
        if(req.session.is_login) {
            ret.agent = req.session.agent.agent_name_en;
            ret.agent_details = req.session.agent;
        }
        // console.log(ret);
        res.render('../views/property_details_edit', ret);
    });
});

app.get('/property/details/:ref_no/edit', function(req, res){
    var ref_no = req.params.ref_no;
    res.send('asdf');
});

module.exports = app;