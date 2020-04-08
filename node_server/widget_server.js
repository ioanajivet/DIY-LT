var express = require('express');
var app = express();

var MongoClient = require('mongodb').MongoClient;
var mongo_url = 'mongodb://localhost:27017/';

var db_name = 'course_x_db';
var coll_goal_data = 'goal_data';
var coll_user_data = 'user_data';
var coll_widget_configuration = 'widget_configuration';


//TODO return proper headers in the reply to allow CORS only from coursera
//TODO set propoer headers for the Content-Security-Policy as requested by Coursera

//TODO add checks for "null" after searching the database

app.use(function(req, res, next) {
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello CEL-Research!');
}); 

app.get('/learner_data/:hashed_user_id/:course_branch_id/:course_week', (req,res) => {
    //getting call parameters
    var hashed_user_id = req.params.hashed_user_id;
    var course_branch_id = req.params.course_branch_id;
    var course_week = req.params.course_week;

    var return_json = {};

    get_user_data(course_branch_id, hashed_user_id, function(err, learner_values) {
        if(err) {
            console.log(err);   //TODO: add error handling;
        }
        else {              
            
            if(learner_values == null) {
                console.log("could not find user " + hashed_user_id);
                res.json({});
            }
            else {
                get_widget_configuration(course_branch_id, course_week, hashed_user_id, function (err, widget_config) {
                    if(err) 
                        console.log(err);   //TODO: add error handling;
                    else {
                        //TODO: compose reply: to send back to browser

                        return_json['hashed_user_id'] = learner_values.hashed_user_id;
                        return_json['goal'] = learner_values.goal;
                        return_json['metrics'] = learner_values.metrics;
                        return_json['selected_metrics'] = widget_config.selected_metrics;
                        return_json['open_to_configure'] = widget_config.open_to_configure;
                        
                        res.json(return_json);
                    }
                });     
            }  
        }
    });
});    


app.post('/learner_data/widget/:hashed_user_id/:course_branch_id/:course_week', function(req, res) {
    //getting call parameters
    var hashed_user_id = req.params.hashed_user_id;
    var course_branch_id = req.params.course_branch_id;
    var course_week = req.params.course_week;
    var selected_metrics = req.body.selected_metrics;

    var return_json = {};

    console.log("received POST request for user " + hashed_user_id + " to configure the widget with metrics " + selected_metrics);

    update_learner_selected_metrics(course_branch_id, hashed_user_id, course_week, selected_metrics, function (err) {
        if (err) {
            console.log(err); //TODO: add error handling;
            res.json( { 'success' : false } );
        }
        else {
            console.log("updated learner " + hashed_user_id + " metrics to: " + selected_metrics);
            get_user_data(course_branch_id, hashed_user_id, function(err, learner_values) {
                if(err) {
                    console.log(err);   //TODO: add error handling;

                    res.json( { 'success' : false } );
                }
                else {
                        return_json['success'] = true;
                        return_json['hashed_user_id'] = hashed_user_id;
                        return_json['goal'] = learner_values.goal;
                        return_json['metrics'] = learner_values.metrics;
                        return_json['selected_metrics'] = selected_metrics;
                        
                        res.json(return_json);
                    }
                });
                
        }
    }); 
});     

//configuring a goal
app.post('/learner_data/goal/:hashed_user_id/:course_branch_id/:course_week', function(req, res) {
    //getting call parameters
    var hashed_user_id = req.params.hashed_user_id;
    var course_branch_id = req.params.course_branch_id;
    var course_week = req.params.course_week;
    var learner_goal = req.body.goal;

    console.log("received POST request for user " + hashed_user_id + " with the goal to \'" + learner_goal + "\'");

    update_learner_goal(course_branch_id, hashed_user_id, learner_goal, function (err) {
        if (err) {
            console.log(err);   //TODO: add error handling;

            res.json( { 'success' : false } );
        }
        else {
            console.log("updated learner " + hashed_user_id + " goal to: " + learner_goal);
            
            res.json({ 'success' : true });
                        
        }
    }); 
});


//getting data from user_data collection with keys: course_branch_id and hashed_user_id
function get_user_data (course_branch_id, hashed_user_id, callback ) {

    console.log("getting user data");
    MongoClient.connect(mongo_url, 
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, function(err, client) {
                if(!err) {
                    var db = client.db(db_name);
                    db.collection(coll_user_data, function(err, collection_user_data) {
                        
                        collection_user_data.findOne(
                            {
                                $and: [
                                    {'course_branch_id': course_branch_id}, 
                                    {'hashed_user_id' : hashed_user_id}
                                ]
                            },
                            function(err, doc) {
                                if(!err) {
                                    client.close();
                                    callback(null, doc);
                                }
                                else
                                    callback("error with finding item");
                                
                        });
                    });        

                }
                
                else
                    callback("error with connecting to db");
            })
    };

//getting data from goal_data collection with keys: course_branch_id, course_week and goal
function get_goal_data (course_branch_id, course_week, goal, callback ) {

    console.log("getting goal data");
    MongoClient.connect(mongo_url, 
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, function(err, client) {
                if(!err) {
                    var db = client.db(db_name);
                    db.collection(coll_goal_data, function(err, collection_goal_data) {
                        collection_goal_data.findOne(
                            {
                                $and: [
                                    {'course_branch_id': course_branch_id}, 
                                    {'course_week' : course_week},
                                    {'goal' : goal}
                                ]
                            },
                            function(err, doc) {
                                if(!err) {
                                    client.close();
                                    callback(null, doc);
                                }
                                else
                                    callback("error with finding item");
                                
                        });
                    });        

                }
                
                else
                    callback("error with connecting to db");
            })
    };

//getting configuration of the widget from widget_configuration collection with keys: course_branch_id, course_week and hashed_user_id
function get_widget_configuration (course_branch_id, course_week, hashed_user_id, callback ) {

    console.log("getting widget configuration for user " + hashed_user_id);
    MongoClient.connect(mongo_url, 
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, function(err, client) {
                if(!err) {
                    var db = client.db(db_name);
                    db.collection(coll_widget_configuration, function(err, collection_widget_configuration) {
                        collection_widget_configuration.findOne(
                            {
                                $and: [
                                    {'course_branch_id': course_branch_id}, 
                                    {'course_week' : course_week},
                                    {'hashed_user_id' : hashed_user_id}
                                ]
                            },
                            function(err, doc) {
                                if(!err) {
                                    client.close();
                                    callback(null, doc);
                                }
                                else
                                    callback("error with finding item");
                                
                        });
                    });                    
                }
                else
                    callback("error with connecting to db");
            })
    };

function update_learner_goal (course_branch_id, hashed_user_id, goal, callback ) {

        console.log("updating learner goal");
        MongoClient.connect(mongo_url, 
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }, function(err, client) {
                    if(!err) {
                        var db = client.db(db_name);
                        db.collection(coll_user_data, function(err, collection_user_data) {
                            collection_user_data.updateOne(
                                {
                                    $and: [
                                        {'course_branch_id': course_branch_id}, 
                                        {'hashed_user_id' : hashed_user_id}
                                    ]
                                },
                                {
                                    $set: {
                                        'goal': goal
                                    }
                                },
                                function(err, doc) {
                                    if(!err) {
                                        client.close();
                                        callback(null, doc);
                                    }
                                    else
                                        callback("error with updating goal");
                                    
                            });
                        });        
                    }
                    else
                        callback("error with connecting to db");
                })
        };

function update_learner_selected_metrics(course_branch_id, hashed_user_id, course_week, selected_metrics, callback ) {

    console.log("updating learner selected metrics");
    MongoClient.connect(mongo_url, 
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, function(err, client) {
                if(!err) {
                    var db = client.db(db_name);
                    db.collection(coll_widget_configuration, function(err, collection_widget_configuration) {
                        collection_widget_configuration.updateOne(
                            {
                                $and: [
                                    {'course_branch_id': course_branch_id}, 
                                    {'hashed_user_id' : hashed_user_id},
                                    {'course_week' : course_week}
                                ]
                            },
                            {
                                $set: {
                                    'selected_metrics': selected_metrics
                                }
                            },
                            function(err, doc) {
                                if(!err) {
                                    client.close();
                                    callback(null, doc);
                                }
                                else
                                    callback("error with updating selected metrics");
                                
                        });
                    });                    
                
                }
                else
                    callback("error with connecting to db");
            })
    };

var server = app.listen(8000, function() {});
