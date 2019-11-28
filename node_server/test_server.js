var express = require('express');
var app = express();

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/';

var db_name = 'course_x_db';
var coll_standard_data = 'standard_data';
var coll_user_data = 'user_data';
var coll_widget_configuration = 'widget_configuration';


//TODO return proper headers in the reply to allow CORS only from coursera

app.use(function(req, res, next) {
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res) => {
    res.send('Hello CEL-Research!');
}); 

app.route('/get_learner_data/:hashed_user_id/:course_branch_id/:course_week').get(function(req,res)
{

    //getting call parameters
    var hashed_user_id = req.params.hashed_user_id;
    var course_branch_id = req.params.course_branch_id;
    var course_week = req.params.course_week;

    get_user_data(course_branch_id, hashed_user_id, function(err, learner_values) {
        if(err) {
            console.log(err);   //TODO: update error message;
        }
        else {
            var standard = learner_values['standard'];
            console.log("standard: " + standard);
            get_standard_data(course_branch_id, course_week, standard, function (err, standard_values) {
                if(err) {
                    console.log(err); //TODO: update error message;
                }
                else {
                    get_widget_configuration(course_branch_id, course_week, hashed_user_id, function (err, widget_config) {
                        if(err) 
                            console.log(err);
                        else {
                            //TODO: compose reply: to send back to browser
                            var return_json = {};

                            return_json['hashed_user_id'] = learner_values.hashed_user_id;
                            return_json['metric_names'] = learner_values.metric_names;
                            return_json['metric_values'] = learner_values.metric_values;
                            return_json['scaled_metric_values'] = learner_values.scaled_metric_values;
                            return_json['standard_metric_values'] = standard_values.metric_values;
                            return_json['scaled_standard_metric_values'] = standard_values.scaled_metric_values;
                            return_json['selected_metrics'] = widget_config.selected_metrics;
                            
                            res.json(return_json);
                        }
                    });       
                }
            });
            
        }
    });
});

//getting data from user_data collection with keys: course_branch_id and hashed_user_id
function get_user_data (course_branch_id, hashed_user_id, callback ) {

    console.log("getting user data");
    MongoClient.connect(url, 
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
                                if(!err)
                                    callback(null, doc);
                                else
                                    callback("error with finding item");
                                
                        });
                    });                    
                }
                
                else
                    callback("error with connecting to db");
            })
    };

//getting data from standard_data collection with keys: course_branch_id, course_week and standard
function get_standard_data (course_branch_id, course_week, standard, callback ) {

    console.log("getting standard data");
    MongoClient.connect(url, 
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, function(err, client) {
                if(!err) {
                    var db = client.db(db_name);
                    db.collection(coll_standard_data, function(err, collection_standard_data) {
                        collection_standard_data.findOne(
                            {
                                $and: [
                                    {'course_branch_id': course_branch_id}, 
                                    {'course_week' : course_week},
                                    {'standard' : standard}
                                ]
                            },
                            function(err, doc) {
                                if(!err)
                                    callback(null, doc);
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

    console.log("getting widget configuration");
    MongoClient.connect(url, 
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
                                if(!err)
                                    callback(null, doc);
                                else
                                    callback("error with finding item");
                                
                        });
                    });                    
                }
                
                else
                    callback("error with connecting to db");
            })
    };

var server = app.listen(8000, function() {});
