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
        res.render('../views/branch_listing', ret);
    });
});
app.get('/branch/:branchcode', function(req, res){
    var branchcode = req.params.branchcode;
    
    var ret = {
        pageTitle: 'hkproperty: branch',
        title: "Branch"
    };
    var branch_module = require('../module/module_branch');
    var promise = new Promise(function(resolve, reject){
        branch_module.select_branch_by_code(branchcode,function(result){
            ret.branches = result;
            resolve(result);
        });
    });

    promise.then(function(result){
        var branch_id = result[0].id;
        var b_a_module = require('../module/module_branch_agent_relation');
        return new Promise(function(resolve, reject){
            b_a_module.select_agent_by_branch_id(branch_id, function(result){
                ret.agents = result;
                resolve(result);
            });
        }).then(function(result){
            ret.branch_agent = result;
            if(req.session.is_login){
                ret.agent = req.session.agent.agent_name_en;
                ret.agent_details = req.session.agent;
            }
            res.render('../views/branch_agent_listing', ret);
        });
    });
});

app.get('/NewProperty', function(req, res){
    if(!req.session || !req.session.is_login){
        res.redirect('/webapp');
    }
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
    if(!req.session || !req.session.is_login){
        res.redirect('/webapp');
    }
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
        }).then(function(result){
            var prop_owner =require("../module/module_property_owner_relation");
            prop_owner.select_property_owner_relation_by_property_id(req.params.property_id, function(property_owner){
                result.owners = property_owner;
                resolve(result);
            });
        });
    }).then(function(result){
        
        var ret = {
            pageTitle: 'hkproperty: ' +result.property.estate_name_en,
            title: "( Ref:"+result.property.ref_no+") "+result.property.estate_name_en,
            properties: result.property,
            owners: result.owners,//result.owners,
            distrcit: result.district
        };
        if(req.session.is_login) {
            ret.agent = req.session.agent.agent_name_en;
            ret.agent_details = req.session.agent;
        }
        console.log(ret);
        res.render('../views/property_details_edit', ret);
    });
});
app.get('/searchproperty', function(req, res){
    if(!req.session || !req.session.is_login){
        res.redirect('/webapp');
    }else {
        var ret = {
            pageTitle: 'hkproperty',
            title: "Search Property",
            properties: []
        };
        
        if(req.session.is_login) {
            ret.agent = req.session.agent.agent_name_en;
            ret.agent_details = req.session.agent;
        }
        console.log(ret);
        res.render('../views/property_search', ret);
    }
});
app.post('/searchproperty',function(req, res){
    if(!req.session || !req.session.is_login){
        res.redirect('/webapp');
    }else {
        var ret = {
            pageTitle: 'hkproperty',
            title: "Search Property",
            properties: []
        };
        console.log(req.body);
        var estate_name = req.body.estate_name;
        var sales_type = req.body.salestype;
        var low_range= req.body.low_range;
        var high_range=req.body.hight_range;
        console.log(estate_name);
        if(!estate_name){
            console.log('estate_name is null');
        }
        var module_property = require('../module/module_property');
        module_property.search_property(estate_name, sales_type, low_range, high_range,function(cb){
            if(cb.length > 0){
                ret.properties = cb;
            }
            if(req.session.is_login) {
                ret.agent = req.session.agent.agent_name_en;
                ret.agent_details = req.session.agent;
            }
            res.render('../views/property_search', ret);
        });
    }
});



app.get('/salesreport', function(req, res){
    if(!req.session || !req.session.is_login){
        res.redirect('/webapp');
    }else {
        var ret = {
            pageTitle: 'hkproperty',
            title: "Sales Report",
        }
        var branch = require('../module/module_branch');
        var promise = new Promise(function(resolve, reject){
            branch.select_branch(function(result){
                ret.branches = result;
                resolve(ret);
            });
        });
        promise.then(function(result){
            var temp = [];
            var transection = require('../module/module_transection');
            ret.branches.forEach(function(element, index) {
                var temp1 = element;
                transection.get_salling_report_by_branch_id(element.id, function(selling_report){
                    temp1.selling_report = selling_report;
                    temp.push(temp1);
                    
                    if(temp.length == ret.branches.length){
                        console.log(ret);
                        if(req.session.is_login) {
                            ret.agent = req.session.agent.agent_name_en;
                            ret.agent_details = req.session.agent;
                        }
                        res.render('../views/salereport', ret);
                    }
                });
            }, this);
        });
    }
    
});

app.get('/rentalreport', function(req, res){
    if(!req.session || !req.session.is_login){
        res.redirect('/webapp');
    }else {
        var ret = {
            pageTitle: 'hkproperty',
            title: "Rental Report",
        }
        var branch = require('../module/module_branch');
        var promise = new Promise(function(resolve, reject){
            branch.select_branch(function(result){
                ret.branches = result;
                resolve(ret);
            });
        });
        promise.then(function(result){
            var temp = [];
            var transection = require('../module/module_transection');
            ret.branches.forEach(function(element, index) {
                var temp1 = element;
                transection.get_rental_report_by_branch_id(element.id, function(selling_report){
                    temp1.selling_report = selling_report;
                    temp.push(temp1);
                    
                    if(temp.length == ret.branches.length){
                        console.log(ret);
                        if(req.session.is_login) {
                            ret.agent = req.session.agent.agent_name_en;
                            ret.agent_details = req.session.agent;
                        }
                        res.render('../views/rentreport', ret);
                    }
                });
            }, this);
        });
    }
    
});

module.exports = app;