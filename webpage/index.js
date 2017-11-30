"use static"
const mp = require("../module/module_property");
const express = require("express");
const config = require("config");
const session = require('express-session');
var jade = require('jade');
var fs = require('fs');
var path = require('path');
app = express.Router();

app.route('/').all(function(req, res, next){
    next();
}).get(function(req, res){
    mp.select_random_property(function(result){
        if(req.session.is_login) {
            res.render('../views/index',
            {
                pageTitle: 'hkproperty',
                agent: req.session.agent.agent_name_en,
                agent_details: req.session.agent,
                title:'Featured Property',
                properties: result
            });
        } else {
            res.render('../views/index',
            {
                pageTitle: 'hkproperty',
                title:'Featured Property',
                properties: result
            });
        }
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
                console.log(result);
                result.agents= agents;
                resolve(result);
            });
        });
    }).then(function(result){
        console.log(ret);
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
        console.log(ret);
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
        console.log("restt: "+req.session.is_login);
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
    console.log(page);
    var promise = new Promise(function(resolve, reject){
        mp.select_count_rent_property(function(result){
            var ret = {total: result};
            resolve(ret);
        });
    });
    promise.then(function(result){
        console.log('result',result);
        return new Promise(function(resolve, reject){
            mp.select_rent_property(offset, function(property_data){
                result.property= property_data;
                resolve(result);
            });
        });
    }).then(function(result){
        console.log(result.property);
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
        console.log("restt: "+req.session.is_login);
        res.render('../views/index', ret);
    });
});
app.get('/property/details/:ref_no', function(req,res){
    var promise = new Promise(function (resolve,reject){
        mp.select_property_id_by_ref_no(req.params.ref_no,function(result){
            if(result.length == 0){
                reject('error, result not found');
            }
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
        console.log("select property_owner: ");
        console.log(result);
        return new Promise(function(resolve, reject){
            var prop_owner =require("../module/module_property_owner_relation");
            prop_owner.select_property_owner_relation_by_property_id(result.id, function(property_owner){
                console.log(property_owner);
                result.owners = property_owner;
                resolve(result);
            });
        });
    }).then(function(result){
        console.log("result:");
        console.log(result);
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
        console.log(result);
        var ret = {
            pageTitle: 'hkproperty: branch',
            title: "Branch",
            branches: result
        }
        res.render('branch_listing', ret);
    });
});

module.exports = app;