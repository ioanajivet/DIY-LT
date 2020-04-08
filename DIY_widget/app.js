
var indicator_descriptions = [
    {
        metric_id: 'metric_1',
        name: 'Content revision',
        description: 'The percentage of already completed learning activities that you are revising. This is an indicator of how much you are combining starting new learning activities and revising already completed learning activities in this course.',
		unit: '%',
		tooltip: 'On average, XXX % of the content you access in your learning sessions is already completed content.'
    },
    {
        metric_id: 'metric_2',
        name: 'Engagement in discussions',
        description: 'An indicator of how active you are in course discussions on the forum by answering discussion prompts, posting questions and replying to open threads.',
		unit: '',
		tooltip: 'Your engagement score is XXX out of 10.'
    },
    {
        metric_id: 'metric_3',
        name: 'Productivity',
        description: 'An average of the percentage of activities that you completed on the same day that you started them.',
		unit: '%',
		tooltip: 'On average, you complete XXX of the activities that you start in the same day.'
    },
    {
        metric_id: 'metric_4',
        name: 'Online presence',
        description: 'The amount of time that you have spent so far on the pages of this course.',
		unit: 'hours',
		tooltip: 'So far, you have spent XXX hours on this course since its beginning.'
    },
    {
        metric_id: 'metric_5',
        name: 'Timeliness of starting activities',
        description: 'The average number of days between starting an activity and the start of the course week that the activity is assigned to. This is an indicator of how early, on average, you start working on the weekly learning activities.',
		unit: 'days',
		tooltip: 'On average, you start activities XXX days after the beginning of the learning week under which the activities are published.'
    },
    {
        metric_id: 'metric_6',
        name: 'Timeliness of completing activities',
        description: 'The average number of days between completing an activity and the end of the course week that the activity is assigned to. This is an indicator of how close to the deadline, on average, you complete the learning activities.',
		unit: 'days',
		tooltip: 'On average, you complete activities XXX days before the end of the learning week under which the activities are published.'
    },
    {
        metric_id: 'metric_7',
        name: 'Completed course activities',
        description: 'The percentage of course activitites from all the material avialable that you have completed so far. For example, if there are 40 learning activities in the whole course and you have completed 20, the indicator shows 50%.',
		unit: '%',
		tooltip: 'You have completed XXX % of the course activities. There are 89 learning activities in this course.'
    },
    {
        metric_id: 'metric_8',
        name: 'Submitted discussion prompts',
        description: 'The percentage of discussions prompts that you submitted so far. For example, if there are 10 discussion prompts in the whole course and you have submitted 5, the indicator shows 50%.',
		unit: '%',
		tooltip: 'You have submitted XXX % of the dicussion prompts. There are 10 discussion prompts in this course.'
    },
    {
        metric_id: 'metric_9',
        name: 'Completed graded assignments',
        description: 'The percentage of peer graded assignments that you have submitted and graded so far. For example, if there are 6 peer-graded assignments in the whole course and you have submitted 3, the indicator shows 50%.',
		unit: '%',
		tooltip: 'You have completed XXX % of the graded assignments. There are 3 peer-graded assignments and 1 final quiz that count for your final grade.'
    },
    {
        metric_id: 'metric_10',
        name: 'Completed reading activitites',
        description: 'The percentage of reading activities that you have completed so far. For example, if there are 20 reading activities in the whole course and you have completed 10, the indicator shows 50%.',
		unit: '%',
		tooltip: 'You have completed XXX % of the reading assignments. There are 33 readings activities in this course.'
    },
    {
        metric_id: 'metric_11',
        name: 'Completed videos',
        description: 'The percentage of videos that you have completed so far. For example, if there are 20 videos in the whole course and you have completed 10, the indicator shows 50%.',
		unit: '%',
		tooltip: 'You have watched XXX % of the videos. There are 39 readings activities in this course.'
    },
    {
        metric_id: 'metric_12',
        name: 'Current course grade',
        description: 'Your current course grade is calculated using a weighted sum of the grades obtained so far on the peer-graded assignments and the final quiz (explained on Grades page).',
		unit: '',
		tooltip: 'Your current course grade is XXX %.'
    }
];

function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;
  
	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
  
	  // Pick a remaining element...
	  randomIndex = Math.floor(Math.random() * currentIndex);
	  currentIndex -= 1;
  
	  // And swap it with the current element.
	  temporaryValue = array[currentIndex];
	  array[currentIndex] = array[randomIndex];
	  array[randomIndex] = temporaryValue;
	}
  
	return array;
  }

//this is the initial configuration of the widget: goals + indicators. 
$(function () {

	//TODO: read the parameters of the course: 

	//var url = 'https://cel-research.ewi.tudelft.nl/learner_data/';
	var url = 'http://localhost:8000/learner_data/';
	var hashed_user_id = 'user_789';
	var course_branch_id = 'branch_A';
	var course_week = '1';
	var learner_goal = null;
	var selected_metrics = [];

	//********************************************************
	//		Fetching learner data and widget configurations
	//********************************************************

	get_learner_data(url, hashed_user_id, course_branch_id, course_week)
		.then(learner_data => {
			//TODO: handle an empty json reply => the user is not in the database = the user is not in the study yet.

			populate_indicator_list();

			//show/hide goals section
			if(learner_data.goal == null) { //no goal has been set so far
				$('#goalInput').show('slow');
				$('#goalButtonContainer').show('slow');
				$('#goalDisplay').hide('slow');				
			}
			else {		//learner has set a goal already
				$('#goalInput').hide('slow');
				$('#goalButtonContainer').hide('slow');
				$('#goalDisplay').show('fast');
				
				learner_goal = learner_data.goal;
				$('#goalDisplay').text('Your goal: ' + learner_goal);
				console.log(learner_goal);
			}

			//show/hide indicators and widget sections
			if(learner_data.selected_metrics == null) { //no indicators have been selected so far

				$('#indicatorsContainer').show('slow');
				$('#widgetContainer').hide('slow');
			}
			else {	
				$('#indicatorsContainer').hide('slow');
				$('#widgetContainer').show('fast');
				
				selected_metrics = learner_data.selected_metrics;
				load_widget(learner_data);
			}
	});

	//**************
	//Goal definition
	//**************

	$('#textLearnerGoal').on("change keyup paste", function() {
		if($.trim($("#textLearnerGoal").val())) {	
			//text area is not empty
			learner_goal = $.trim($("#textLearnerGoal").val());
			$('.goalButton').addClass('selectedGoalButton');
			$('.goalButton').prop("disabled", false);
		} else {
			//text area is empty or only white spaces
			$('.goalButton').removeClass('selectedGoalButton');
			$('.goalButton').prop("disabled", true);
		}
	});

	$('.goalButton').on('click', function(){
		//TODO: store goal in database
		//TODO: save configuration on the server
		configure_goal(url, hashed_user_id, course_branch_id, course_week, learner_goal)
			.then(success_response => {
				//TODO: error handling on success or on error of updating the goal
				console.log(success_response);
				$('#widget_configured').text('Goal was configured. Reply from POST request: ' + JSON.stringify(success_response));
				
				//switch to goalDisplay panel
				//TODO: make this display case pretty
				$('#goalInput').hide('slow');
				$('#goalButtonContainer').hide('slow');
				$('#goalDisplay').text('Your goal: ' + learner_goal);
				$('#goalDisplay').show('slow');
				
			});

	});

	//*******************
	//Indicator selection
	//*******************

	$('#indicatorList').on("change", "input:checkbox", function () {
		var lower_limit = 3;
		var upper_limit = 6;
		
		var checked_indicator = $(this).prop("id");
		console.log("just selected: " + checked_indicator);

		//select an indicator
		if ($(this).prop('checked')) { 
			if (selected_metrics.length == upper_limit) {
				this.checked = false;
				
				$('#message').text("You can select maximum 6 indicators!");
			}
			else {
				selected_metrics.push(checked_indicator);
				//TODO: delete the check-up
				$("#check-up").text(selected_metrics.length + " selected metrics: " + selected_metrics);
					
				console.log("selected_metrics: " + selected_metrics);
				if(selected_metrics.length >= lower_limit) {
					//reset message
					$('#message').text("");

					//activate the "continue" button
					$('.indicatorsButton').addClass('selectedIndicatorsButton');
					$('.indicatorsButton').removeAttr("disabled");
				}
			}
		}
		//deselect an indicator
		else if (selected_metrics.length <= lower_limit) {	
			this.checked = true;
			//alert user of the number of indicators to be chosen
			$('#message').text("You can select minimum 3 indicators!");
		} else {
			//remove this changed indicator from the list
			const index = selected_metrics.indexOf(checked_indicator);
			if (index > -1) {
  				selected_metrics.splice(index, 1);
			}
			$("#check-up").text(selected_metrics.length + " selected metrics: " + selected_metrics);
			console.log("selected_metrics: " + selected_metrics);
			
		}		
		
	});

	$('.indicatorsButton').on('click', function(){
		//TODO: save configuration on the server ->
		configure_widget(url, hashed_user_id, course_branch_id, course_week, selected_metrics)
			.then(learner_data => {
				//TODO: remove the control message
				console.log(learner_data);
				$('#widget_configured').text('Widget is configured. Reply from POST request: ' + JSON.stringify(learner_data));
				//switch to widget_view panel
				$('#indicatorsContainer').hide('slow');
				$('#widgetContainer').show('slow');

				load_widget(learner_data);
			});
	});

	$('.updateIndicatorsButton').on('click', function(){
		//TODO: select the indicators already selected.
		selected_metrics.forEach( function(metric_id) {
			console.log('#' + metric_id);
			$('#' + metric_id).prop('checked', true);
		});

		//activate the "continue" button
		$('.indicatorsButton').addClass('selectedIndicatorsButton');
		$('.indicatorsButton').removeAttr("disabled");

		$('#widgetContainer').hide('fast');
		$('#indicatorsContainer').show('fast');

	});
	
});

function populate_indicator_list() {
	shuffle(indicator_descriptions);
	$.each(indicator_descriptions, function (index, value) {
		var next_indicator = '<div class="indicator">' +
			'<div class="pretty p-default p-curve"><input type="checkbox" id="' + value.metric_id + '" />' +
			'<div class="state p-primary"><label for="metric_12">' + value.name + '</label></div></div>' +
			'<div class="indicatorExplanation">' + value.description + '</div></div>\n';
		$("#indicatorList").append(next_indicator);
	});
}

async function get_learner_data(url, hashed_user_id, course_branch_id, course_week) {
	url += hashed_user_id + "/" + course_branch_id + "/" + course_week;

	return fetch(url, {
		method: 'GET',
		mode: 'cors',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		}
	})
		.then(response => {
			return response.json();
		})
		.catch(function (error) {
			console.log('There was a problem fetching data from the server: \n', error);
			//TODO: hide the "#container" in production
		});
}

async function configure_widget(url, hashed_user_id, course_branch_id, course_week, selected_metrics) {
	url += "widget/" + hashed_user_id + "/" + course_branch_id + "/" + course_week;
	
	var selected_configuration = {
		'selected_metrics': selected_metrics
	};

	try {
		const response = await fetch(url, {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(selected_configuration)
		});
		return response.json();
	}
	catch (error) {
		console.log('There was a problem posting data to the server: \n', error);
	}

}

async function configure_goal(url, hashed_user_id, course_branch_id, course_week, goal) {
	url += "goal/" + hashed_user_id + "/" + course_branch_id + "/" + course_week;
	
	var selected_goal = {
		'goal': goal,
	};

	return fetch(url, {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(selected_goal)
	})
		.then(response => {
			return response.json();
		})
		.catch(function (error) {
			console.log('There was a problem posting data to the server: \n', error);
			//TODO: hide the "#container" in production
		});

}

function getSeriesValue(chart, seriesLearner) {

	var chart_subdivision = 360/seriesLearner.length;
	
	return seriesLearner[chart.x/chart_subdivision];
}

function load_widget(learner_data) {
	var metricIDs = [];
	var metricNames = [];
	var metricTooltipText = [];
	var seriesLearner = [];
	var seriesLearnerScaled = [];

	var learner_metrics = learner_data.metrics;
	
	//create the series based on the selected metrics
	(learner_data.selected_metrics).forEach(metric => {
		var metric_id = learner_metrics[metric].name;

		metricIDs.push(metric_id);

		//TODO: replace with a loop and break
		indicator_descriptions.forEach(indicator => {
			if(indicator.metric_id == metric_id) {
				metricNames.push(indicator.name);
				metricTooltipText.push(indicator.tooltip);
				console.log(indicator.tooltip);
			}
		});

		seriesLearner.push(learner_metrics[metric].value);
		seriesLearnerScaled.push(learner_metrics[metric].scaled_value);
	});

	//TODO: get metric units
	console.log("metricNames: " + metricNames);
	console.log("seriesLearner: " + seriesLearner);
	console.log("seriesLearnerScaled: " + seriesLearnerScaled);

	var number_of_selected_metrics = Object.keys(learner_data.selected_metrics).length;
	var pointInterval = Math.round(360 / number_of_selected_metrics);

	var chartOptions = {
		chart: {
			polar: true,
			spacingLeft:50,
			spacingRight:50
		},
		title: {
			text: null
		},
		pane: {
			startAngle: 0,
			endAngle: 360
		},
		credits: {
			enabled: false
		},
		exporting: {
			enabled: false
		},
		xAxis: {
			tickInterval: pointInterval,
			min: 0,
			max: 360,
			labels: {
				formatter: function () {
					return metricNames[this.value / pointInterval];
				}
			},
			gridLineWidth: 1
		},
		yAxis: {
			min: 0,
			max: 10,
			gridLineWidth: 1,
			labels: {
				enabled: false
			}
		},
		plotOptions: {
			series: {
				pointStart: 0,
				pointInterval: pointInterval,
				marker: {
					enabled: false
				}
			},
			column: {
				pointPadding: 0,
				groupPadding: 0
			}
		},

		legend: {
			reversed: true,
			enabled: false
		},

		tooltip: {
			shared: true,
			formatter: function () {
				//this.x = grades of the angle of the line from the vertical
				//this.y = the scaled value of the metric
				var index = this.x/pointInterval;
				var tooltip_text = '<b>' + metricNames[index] + '</b><br/>';
				
				tooltip_text += metricTooltipText[index].replace('XXX', '<b>' + seriesLearner[index] + '</b>');

				return tooltip_text;
			},
		},

		series: [
			{
				type: 'area',
				name: 'You',
				color: 'rgba(111, 168, 220, 1)',
				data: seriesLearnerScaled
			}
		]
	};

	//TODO: check the other option of loading a chart in Highcharts
	var chart = Highcharts.chart('widget', chartOptions);
}

//transforms the URL parameters from JSON format to URL parameters to be used to fetch user's data for the course
function encodeData(data) {
	return Object.keys(data)
		.map(function (key) {
			return [key, data[key]].map(encodeURIComponent).join("=");
		})
		.join("&");
}

function initiateApp(configuration) {
	//print in the console the user id
	console.log("here are some parameters from the config file: " + encodeData(configuration["urlParams"] || {}));
}

courseraApi.callMethod({
	type: "GET_SESSION_CONFIGURATION",
	onSuccess: initiateApp,
	onError: console.log
});
