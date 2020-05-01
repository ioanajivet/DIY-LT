const express = require('express');
const app = express();
const {logger, config} = require('./config');


const { db: { host, port, name, db_name, collection_learners, collection_widget, 
    collection_emails, collection_SRL, collection_log } } = config;
const mongo_url = `mongodb://${host}:${port}/${name}`;
const MongoClient = require('mongodb').MongoClient;


//TODO return proper headers in the reply to allow CORS only from coursera
//TODO set proper headers for the Content-Security-Policy as requested by Coursera
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

app.get('/learner_data/:hashed_user_id/:course_branch_id', (req,res) => {
    //getting call parameters
    var hashed_user_id = req.params.hashed_user_id;
    var course_branch_id = req.params.course_branch_id;

    var failed_request_response = {};

    logger.info({
        hashed_user_id: hashed_user_id,
        course_branch_id: course_branch_id,
        message: 'load widget'
    });

    log_interaction(course_branch_id, hashed_user_id, "load widget", function(err, entry) {
        if (err) logger.error('app.get(learner): error thrown by log_interaction()', err);
    });
    
    get_user_data(course_branch_id, hashed_user_id, function(err, learner_data) {
        if(err) {
            logger.error('app.get(learner): error thrown by get_user_data()', err);
            res.json(failed_request_response);
        }
        else if(learner_data == null) {  //there is no data for this learner => new enrolment
                logger.info({
                    hashed_user_id: hashed_user_id,
                    course_branch_id: course_branch_id,
                    message: '>> adding new learner'
                });
                initialize_new_learner(course_branch_id, hashed_user_id, function (err, new_learner) {
                    if (err) {
                        logger.error('app.get(learner): error thrown by initialize_new_learner()', err);
                        res.json(failed_request_response);
                    } else 
                        res.json(new_learner);
                });
                
            } else {
                get_widget_settings(course_branch_id, hashed_user_id, function(err, widget_settings) {
                    if (err) {
                        logger.error('app.get(learner): error thrown by get_widget_settings()', err);
                        res.json(failed_request_response);
                    } else if (widget_settings == null) {   //the learner is the database, but not initilized the widget
                                add_new_widget_settings(course_branch_id, hashed_user_id, function(err, new_widget_settings) {
                                    if (err) logger.error('app.get(learner): error thrown by add_new_widget_settings()', err);
                                    delete new_widget_settings.timestamp;
                                    res.json(Object.assign(learner_data, new_widget_settings));
                                });
                            } else {
                                delete widget_settings.timestamp;
                                res.json(Object.assign(learner_data, widget_settings));
                            }
                });
            }
                
 
    });
});    

app.post('/learner_data/consent/:hashed_user_id/:course_branch_id', function(req, res) {
    //getting call parameters
    var hashed_user_id = req.params.hashed_user_id;
    var course_branch_id = req.params.course_branch_id;
    var consent = req.body.consent;
    var follow_up = req.body.follow_up;
    var email = req.body.email;

    logger.info({
        hashed_user_id: hashed_user_id,
        course_branch_id: course_branch_id,
        message: 'consent update: ' + consent
    });

    log_interaction(course_branch_id, hashed_user_id, "consent: " + consent, function(err, entry) {
        if (err) logger.error('app.post(consent): error thrown by log_interaction()', err);
    });

    update_consent(course_branch_id, hashed_user_id, consent, function (err, widget_settings) {
        if (err) {
            logger.error('app.post(consent): error thrown by update_consent()', err);
            res.json( { 'success' : false } );
        }
        else {
            if(follow_up)
                save_email(course_branch_id, hashed_user_id, email, function (err) {
                    if (err) logger.error('app.post(consent): error thrown by save_email()', err);
                    else {
                        logger.info({
                            hashed_user_id: hashed_user_id,
                            course_branch_id: course_branch_id,
                            message: 'save email: success'
                        });
                    } 
                });
            
            res.json( { 'success' : true } );
        }               
    });
});   

//configuring a goal
app.post('/learner_data/goal/:hashed_user_id/:course_branch_id', function(req, res) {
    //getting call parameters
    var hashed_user_id = req.params.hashed_user_id;
    var course_branch_id = req.params.course_branch_id;
    var learner_goal = req.body.goal;

    logger.info({
        hashed_user_id: hashed_user_id,
        course_branch_id: course_branch_id,
        message: 'goal update: ' + learner_goal
    });

    log_interaction(course_branch_id, hashed_user_id, "set goal: " + learner_goal, function(err, entry) {
        if (err) logger.error('app.post(goal): error thrown by log_interaction()', err);
    });

    update_learner_goal(course_branch_id, hashed_user_id, learner_goal, function (err, added_widget_settings) {
        if (err) {
            logger.error('app.post(goal): error thrown by update_learner_goal()', err);
            res.json( { 'success' : false } );
        }
        else {
            res.json({ 'success' : true });           
        }
    }); 
});

//configuring the widget
app.post('/learner_data/widget/:hashed_user_id/:course_branch_id', function(req, res) {
    //getting call parameters
    var hashed_user_id = req.params.hashed_user_id;
    var course_branch_id = req.params.course_branch_id;
    var selected_metrics = req.body.selected_metrics;

    logger.info({
        hashed_user_id: hashed_user_id,
        course_branch_id: course_branch_id,
        message: 'request to configure widget'
    });

    log_interaction(course_branch_id, hashed_user_id, "set indicators: " + selected_metrics, function(err, entry) {
        if (err) logger.error('app.post(widget): error thrown by log_interaction()', err);
    });

    update_learner_selected_metrics(course_branch_id, hashed_user_id, selected_metrics, function (err) {
        if (err) {
            logger.error('app.post(widget): error thrown by update_learner_selected_metrics()', err);
            res.json( { 'success' : false } );
        }
        else {
            res.json( { 'success' : true } );                
        }
    }); 
});   

//saving the SRL answers
app.post('/learner_data/SRL/:hashed_user_id/:course_branch_id', function(req, res) {
    //getting call parameters
    var hashed_user_id = req.params.hashed_user_id;
    var course_branch_id = req.params.course_branch_id;
    var SRL_answers = req.body.SRL_answers;

    console.log("INFO: received POST request for user " + hashed_user_id + " to save SRL answers");

    log_interaction(course_branch_id, hashed_user_id, "SRL: " + SRL_answers, function(err, entry) {
        if (err) logger.error('app.post(SRL): error thrown by log_interaction()', err);
    });

    save_SRL_answers(course_branch_id, hashed_user_id, SRL_answers, function (err, entry) {
        if (err) {
            logger.error('app.post(SRL): error thrown by save_SRL_answers()', err);
            res.json( { 'success' : false } );
        }
        else {
            check_SRL_field(course_branch_id, hashed_user_id, function (err, saved_entry) {
                if (err) { 
                    logger.error('app.post(SRL): error thrown by check_SRL_field()', err);
                    res.json( { 'success' : false } );
                } 
                res.json( { 'success' : true } );
            });
                          
        }
    }); 
});  

//getting data from user_data collection with keys: course_branch_id and hashed_user_id
function get_user_data (course_branch_id, hashed_user_id, callback ) {

    var filter = {
            $and: [
                {'course_branch_id': course_branch_id}, 
                {'hashed_user_id' : hashed_user_id}
            ]
        };

    MongoClient.connect(mongo_url, 
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, function(err, client) {
                if(err) logger.error('get_user_data(): error connecting to the database', err);
                var db = client.db(db_name);
                db.collection(collection_learners).find(filter, {projection:{_id : 0}}).sort({timestamp : -1}).toArray(function (err, result) {
                    if(err) logger.error('get_user_data(): error finding items', err);
                    client.close();
                    callback(null, result[0]);
                });    
            });
    };

//getting configuration of the widget from widget_configuration collection with keys: course_branch_id and hashed_user_id
function get_widget_settings(course_branch_id, hashed_user_id, callback ) {

    var filter = {
        $and: [
            {'course_branch_id': course_branch_id}, 
            {'hashed_user_id' : hashed_user_id}
        ]
    };

    MongoClient.connect(mongo_url, 
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, function(err, client) {
                if(err) logger.error('get_widget_settings(): error connecting to the database', err);
                var db = client.db(db_name);
                db.collection(collection_widget).find(filter, {projection:{_id : 0}}).sort({ timestamp : -1}).toArray(function(err, result) {
                    if(err) logger.error('get_widget_settings(): error finding items', err);
                    client.close();
                    callback(null, result[0]);    
                });
            });                        
    };

function initialize_new_learner(course_branch_id, hashed_user_id, callback) {

    add_new_user_data(course_branch_id, hashed_user_id, function(err, new_learner_data) {
        if (err) logger.error('initialize_new_learner(): error thrown by add_new_user_data()', err);

        add_new_widget_settings(course_branch_id, hashed_user_id, function(err, new_widget_settings) {
            if (err) logger.error('initialize_new_learner(): error thrown by add_new_widget_settings()', err);
            callback(null, Object.assign(new_learner_data, new_widget_settings));
        });
        
        });

};

function add_new_user_data(course_branch_id, hashed_user_id, callback) {

    var new_learner_data = {
        course_branch_id: course_branch_id,
        hashed_user_id: hashed_user_id,
        metrics: initializeMetrics()
    };

    new_learner_data.timestamp = new Date();

    MongoClient.connect(mongo_url, 
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, function(err, client) {
                if (err) logger.error('add_new_user_data(): error with connecting to the database', err);
                var db = client.db(db_name);
                db.collection(collection_learners).insertOne(new_learner_data, function (err, result) {
                    if (err) logger.error('add_new_user_data(): error with inserting new widget settings', err);
                    client.close();
                    delete new_learner_data._id;
                    callback(null, new_learner_data);
                });    
            });
    };

function add_new_widget_settings(course_branch_id, hashed_user_id, callback) {

    var new_widget_settings = {
        course_branch_id: course_branch_id,
        hashed_user_id: hashed_user_id,
        consent: null,
        SRL_quest: false,
        goal: null,
        selected_metrics: [],
        update_goal_flag: false,
        update_indicators_flag: false,
    };

    new_widget_settings.timestamp = new Date();

    MongoClient.connect(mongo_url, 
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, function(err, client) {
                if (err) logger.error('add_new_widget_settings(): error with connecting to the database', err);
                var db = client.db(db_name);
                db.collection(collection_widget).insertOne(new_widget_settings, function (err, result) {
                    if (err) logger.error('add_new_widget_settings(): error with inserting new widget settings', err);
                    client.close();
                    delete new_widget_settings._id;
                    callback(null, new_widget_settings);
                });    
            });
};

function add_widget_settings(widget_settings, callback) {

    MongoClient.connect(mongo_url, 
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, function(err, client) {
                if (err) logger.error('add_widget_settings(): error with connecting to the database', err);
                var db = client.db(db_name);
                db.collection(collection_widget).insertOne(widget_settings, function (err, result) {
                    if (err) logger.error('add_widget_settings(): error with inserting widget settings', err);
                    client.close();
                    callback(null, widget_settings);
                });    
            });
};

function update_learner_goal (course_branch_id, hashed_user_id, goal, callback ) {
    //1. retrieve most recent widget_settings from database
    //2. copy to new object with the new goal, new goal flag and new timestamp
    //3. put into the database

    get_widget_settings(course_branch_id, hashed_user_id, function(err, widget_settings) {
        if (err) logger.error('update_learner_goal(): error thrown by get_widget_settings()', err);

        widget_settings.timestamp = new Date();
        widget_settings.goal = goal;
        widget_settings.update_goal_flag = false;

        add_widget_settings(widget_settings, function(err, added_widget_settings) {
            if (err) logger.error('update_learner_goal(): error thrown by add_widget_settings()', err);
            callback(null, added_widget_settings);
        });
        
    });

    };

function update_learner_selected_metrics(course_branch_id, hashed_user_id, selected_metrics, callback ) {
    //1. retrieve most recent widget_settings from database
    //2. copy to new object with the new goal, new goal flag and new timestamp
    //3. put into the database

    get_widget_settings(course_branch_id, hashed_user_id, function(err, widget_settings) {
        if (err) logger.error('update_learner_selected_metrics(): error thrown by get_widget_settings()', err);
        
        widget_settings.timestamp = new Date();
        widget_settings.selected_metrics = selected_metrics;
        widget_settings.update_indicators_flag = false;

        add_widget_settings(widget_settings, function(err, added_widget_settings) {
            if (err) logger.error('update_learner_selected_metrics(): error thrown by add_widget_settings()', err);
            callback(null, added_widget_settings);
        });
        
    });

    };

function update_consent(course_branch_id, hashed_user_id, consent, callback ) {
    //1. retrieve most recent widget_settings from database
    //2. copy to new object with the new consent and new timestamp
    //3. put into the database

    get_widget_settings(course_branch_id, hashed_user_id, function(err, widget_settings) {
        if (err) logger.error('update_consent(): error thrown by get_widget_settings()', err);

        widget_settings.timestamp = new Date();
        widget_settings.consent = consent;

        add_widget_settings(widget_settings, function(err, added_widget_settings) {
            if (err) logger.error('update_consent(): error thrown by add_widget_settings()', err);
            callback(null, added_widget_settings);
        });
        
    });
    };

function save_email(course_branch_id, hashed_user_id, email, callback ) {

    MongoClient.connect(mongo_url, 
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, function(err, client) {
                if(err) logger.error('save_email(): error connecting to the database', err);
                var db = client.db(db_name);
                db.collection(collection_emails).insertOne(
                        {   
                            'course_branch_id': course_branch_id, 
                            'hashed_user_id': hashed_user_id,
                            'email': email
                        }, 
                        function(err, doc) {
                                if(err) logger.error('save_email(): error inserting in database', err);
                                client.close();
                                callback(null, doc);
                                
                        });
                });        
    };

function check_SRL_field(course_branch_id, hashed_user_id, callback ) {

    //1. retrieve most recent widget_settings from database
    //2. copy to new object with the new SRL_field and new timestamp
    //3. put into the database

    get_widget_settings(course_branch_id, hashed_user_id, function(err, widget_settings) {
        if (err) logger.error('check_SRL_field(): error thrown by get_widget_settings()', err);

        widget_settings.timestamp = new Date();
        widget_settings.SRL_quest = true;

        add_widget_settings(widget_settings, function(err, added_widget_settings) {
            if (err) logger.error('check_SRL_field(): error thrown by add_widget_settings()', err);
            callback(null, added_widget_settings);
        });
        
    });

    };
    
function save_SRL_answers(course_branch_id, hashed_user_id, SRL_answers, callback ) {

    MongoClient.connect(mongo_url, 
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, function(err, client) {
                if(err) logger.error('save_SRL_answers(): error with connecting to the database ', err);
                var db = client.db(db_name);
                db.collection(collection_SRL).insertOne(
                        {   
                            'course_branch_id': course_branch_id, 
                            'hashed_user_id': hashed_user_id,
                            'SRL_answers': SRL_answers
                        }, 
                        function(err, doc) {
                            if(err) logger.error('save_SRL_answers(): error with inserting SRL answers ', err);
                            client.close();
                            callback(null, doc);
                        });       
            });
               
    };

function log_interaction(course_branch_id, hashed_user_id, interaction, callback ) {

    var interaction = 
    {   
        'course_branch_id': course_branch_id, 
        'hashed_user_id': hashed_user_id,
        'interaction': interaction
    };
    interaction.timestamp = new Date();

    MongoClient.connect(mongo_url, 
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, function(err, client) {
                if(err) logger.error('log_interaction(): error with connecting to the database ', err);
                var db = client.db(db_name);
                db.collection(collection_log).insertOne(interaction, 
                        function(err, doc) {
                            if(err) logger.error('log_interaction(): error with inserting an interaction', err);
                            client.close();
                            callback(null, doc);
                    });
                });                    
    };

function initializeMetrics() {
    var metrics = {};

    for (let i = 1; i <= 12; i++) {
        var name = "metric_" + i;
        var metric = {};
        metric.name = name;
        metric.absolute_value = 0;
        metric.value = 0;
        metric.scaled_value = 0;
        metrics[name] = metric;
    }

    return metrics;
};

var server = app.listen(config.app.port, function() {});


/*  
===========================================
FUNCTIONS FOR VERSION WITH PREDEFINED GOALS
===========================================

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

*/