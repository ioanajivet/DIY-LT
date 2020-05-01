let indicator_descriptions = [
    {
        metric_id: 'metric_1',
        name: 'Content revision',
        description: 'The percentage of already completed learning activities that you are revising. This is an indicator of how much you are combining learning new material and revising already learned content in this course.',
		unit: '%',
		tooltip: 'On average, XXX % of the content you access in your learning sessions is already completed content.'
    },
    {
        metric_id: 'metric_2',
        name: 'Engagement in discussions',
        description: 'An indicator of how active you are in course discussions on the forum by answering discussion prompts, posting questions, and replying to open threads.',
		unit: '',
		tooltip: 'Your engagement score is XXX out of 10.'
    },
    {
        metric_id: 'metric_3',
        name: 'Productivity',
        description: 'An average of the percentage of activities that you completed on the same day that you started them.',
		unit: '%',
		tooltip: 'On average, you complete XXX % of the activities that you start in the same day.'
    },
    {
        metric_id: 'metric_4',
        name: 'Online presence',
        description: 'The amount of time that you have spent so far on the pages of this course.',
		unit: 'hours',
		tooltip: 'So far, you have spent XXX hours on this course since its beginning. The estimated time needed to complete this course is 18 hours.'
    },
    {
        metric_id: 'metric_5',
        name: 'Timing of starting activities',
        description: 'The average number of days between starting an activity and the start of the course week that the activity is assigned to. This is an indicator of how early in the week, on average, you start working on the weekly learning activities.',
		unit: 'days',
		tooltip: 'On average, you start activities XXX days after the beginning of the learning week under which the activities are published. The earlier in the week you start, the higher this indicator value is. '
    },
    {
        metric_id: 'metric_6',
        name: 'Timing of completing activities',
        description: 'The average number of days between completing an activity and the end of the course week that the activity is assigned to. This is an indicator of how close to the end of the learning week, on average, you complete the learning activities.',
		unit: 'days',
		tooltip: 'On average, you complete activities XXX days before the end of the learning week under which the activities are published. The earlier in the week you complete activities, the higher this indicator value is.'
    },
    {
        metric_id: 'metric_7',
        name: 'Completed course activities',
        description: 'The percentage of course activities from all the material available that you have completed so far. For example, there are 89 learning activities in this course and if you completed 44, the indicator would show 50%.',
		unit: '%',
		tooltip: 'You have completed YYY out of 89 (XXX %) learning activities available in this course.'
    },
    {
        metric_id: 'metric_8',
        name: 'Submitted discussion prompts',
        description: 'The percentage of discussion prompts that you submitted so far. For example, there are 10 discussion prompts in this course and you submitted 5, the indicator would show 50%.',
		unit: '%',
		tooltip: 'You have submitted YYY out of 10 (XXX %) discussion prompts available in this course.'
    },
    {
        metric_id: 'metric_9',
        name: 'Completed graded assignments',
        description: 'The percentage of peer-graded assignments that you have submitted and graded so far. For example, there are 4 graded assignments in this course and if you submitted 3, the indicator would show 75%.',
		unit: '%',
		tooltip: 'You have completed YYY out of 4 (XXX %) graded assignments in this course. There are 3 peer-graded assignments and 1 final quiz that count for your final grade.'
    },
    {
        metric_id: 'metric_10',
        name: 'Completed reading assignments',
        description: 'The percentage of reading activities that you have completed so far. For example, there are 33 reading assignments in this course and if you completed 10, the indicator would show 32%.',
		unit: '%',
		tooltip: 'You have completed YYY out of 33 (XXX %) reading assignments available in this course.'
    },
    {
        metric_id: 'metric_11',
        name: 'Completed videos',
        description: 'The percentage of videos that you have completed so far. For example, there are 39 videos in this course and if you watched 10, the indicator would show 25%.',
		unit: '%',
		tooltip: 'You have watched YYY out of 39 (XXX %) videos available in this course.'
    },
    {
        metric_id: 'metric_12',
        name: 'Current course grade',
        description: 'Your current course grade is calculated using a weighted sum of the grades obtained so far on the peer-graded assignments and the final quiz (explained on Grades page).',
		unit: '',
		tooltip: 'Your current course grade is XXX %.'
    }
];

let SRL_items = [
	{
		item_id: 'srl_item_1',
		item_text: 'I think about what I really need to learn before I begin a task in this online course.'
	},
	{
		item_id: 'srl_item_2',
		item_text: 'I ask myself questions about what I am to study before I begin to learn for this online course.'
	},
	{
		item_id: 'srl_item_3',
		item_text: 'I set short-term (daily or weekly) goals as well as long-term goals (monthly or for the whole online course).'
	},
	{
		item_id: 'srl_item_4',
		item_text: 'I set goals to help me manage my studying time for this online course.'
	},
	{
		item_id: 'srl_item_5',
		item_text: 'I set specific goals before I begin a task in this online course.'
	},
	{
		item_id: 'srl_item_6',
		item_text: 'I think of alternative ways to solve a problem and choose the best one in this online course.'
	},
	{
		item_id: 'srl_item_7',
		item_text: 'At the start of a task I think about the study strategies I will use.'
	},
	{
		item_id: 'srl_item_8',
		item_text: 'I think about what I have learned after I finish working on this online course.'
	},
	{
		item_id: 'srl_item_9',
		item_text: 'I ask myself how well I accomplished my goals once I’m finished working on this online course.'
	},
	{
		item_id: 'srl_item_10',
		item_text: 'After studying for this online course I reflect on what I have learned.'
	},
	{
		item_id: 'srl_item_11',
		item_text: 'I find myself analyzing the usefulness of strategies after I studied for this online course.'
	},
	{
		item_id: 'srl_item_12',
		item_text: 'I ask myself if there were other ways to do things after I finish learning for this online course.'
	},
	{
		item_id: 'srl_item_13',
		item_text: 'After learning for this online course, I think about study strategies I used.'
	},
	{
		item_id: 'srl_item_14',
		item_text: 'I make good use of my study time for this online course.'
	},
	{
		item_id: 'srl_item_15',
		item_text: 'I find it hard to stick to a study schedule for this online course.'
	},
	{
		item_id: 'srl_item_16',
		item_text: 'I make sure I keep up with the weekly readings and assignments for this online course. '
	},
	{
		item_id: 'srl_item_17',
		item_text: 'I often find that I don’t spend very much time on this online course because of other activities.'
	},
	{
		item_id: 'srl_item_18',
		item_text: 'I allocate studying time for this online course.'
	},
	{
		item_id: 'srl_item_19',
		item_text: 'When I do not fully understand something, I ask other course members in this online course for ideas.'
	},
	{
		item_id: 'srl_item_20',
		item_text: 'I share my problems with my classmates in this online course so we know what we are struggling with and how to solve our problems.'
	},
	{
		item_id: 'srl_item_21',
		item_text: 'I am persistent in getting help from the instructor of this online course.'
	},
	{
		item_id: 'srl_item_22',
		item_text: 'When I am not sure about some material in this online course, I check with other people.'
	},
	{
		item_id: 'srl_item_23',
		item_text: 'I communicate with my classmates to find out how I am doing in this online course.'
	},
	{
		item_id: 'srl_item_24',
		item_text: 'When I have trouble learning, I ask for help.'
	}

];

//this is the initial configuration of the widget: goals + indicators. 
$(function () {

	//********************************************************
	//	Fetching learner data and widget configurations
	//		- data to load on the widget
	//		- show/hide containers
	//		- enable/disable "change goal or indicators"/SRL/consent buttons 
	//********************************************************


	var url = 'https://cel-research.ewi.tudelft.nl/learner_data/';
	//var url = 'http://localhost:8080/learner_data/';

	//TODO: read the parameters of the course
	var hashed_user_id = 'user_123';
	var course_branch_id = 'branch_A';

	var consent;					//status of the consent: null, true, false;
	var SRL_quest;					//status of completing the SRL survey: true, false;
	var update_goal_flag;			//flag for enabling/disabling the "update goal" button
	var update_indicators_flag;		//flag for enabling/disabling the "update indicators" button

	var learner_metrics = null;

	var learner_goal = null;
	var previous_learner_goal = null;
	
	var selected_metrics = [];
	var previous_selected_metrics = [];

	//TODO: check for empty json replies from the server whenever there is a "fetch" and show message with "error communicating with the server"
	//TODO: manage error when connecting to the server: connection refused or serevr is down (in the "catch" of the fetch)
	
	get_learner_data(url, hashed_user_id, course_branch_id)
		.then(learner_data => {
			//TODO: handle an empty json reply => the user is not in the database = the user is not in the study yet.
				
			console.log(learner_data);

			consent = learner_data.consent;
			SRL_quest = learner_data.SRL_quest;	
			update_goal_flag = learner_data.update_goal_flag;
			update_indicators_flag = learner_data.update_indicators_flag;

			learner_metrics = learner_data.metrics;
			learner_goal = learner_data.goal;
			selected_metrics = learner_data.selected_metrics;
			

			//check for consent
			if(consent == null)	{									//consent: learner hasn't made a decision on study participation
				$('#consentContainer').show();
				$(document).tooltip({ show: { delay: 500 }});
			} else if (!consent) {									//consent: learner is not participating in the study
						$('#container').hide();
					} else {										//consent: learner is participating in the study
						$(document).tooltip({ show: { delay: 500 }});

						$('#introContainer').show();
						$('#goalsContainer').show();

						//show/hide goals section
						if(learner_goal == null) { 					//goal: there is no goal
							$('#goalPrompt').show();
							$('#goalButtonContainer').show();
							update_goal_flag = false;
						}
						else {										//goal: learner has set a goal already
							$('.goalQuote').text(learner_goal);
							$('#goalDisplay').show();	
						}

						//show/hide indicators and widget sections
						if(selected_metrics.length == 0) { 			//indicators: no indicators selected
							populate_indicator_list();
							$('#indicatorsContainer').show();
							update_indicators_flag = false;
						}
						else {										//indicators: indicators selected
							$('#widgetSection').show();
							load_widget(learner_metrics, selected_metrics);
							populate_explained_indicators(selected_metrics);
						}

						if(update_goal_flag) {						//update goal: learner can update the goal
							$('#updateGoalButton').removeClass("disabledButton");
							$('#updateGoalButton').removeAttr("title");
						}
					
						if(update_indicators_flag) {				//update indicators: learner can update the indicators
							$('#updateIndicatorsButton').removeClass("disabledButton");
							$('#updateIndicatorsButton').removeAttr("title");
							populate_indicator_list();
						}

						//show/hide SRL survey section
						if(SRL_quest == false) {
							populate_srl_survey();
							$('#surveySection').show();
						}
					}
	});

	//**************
	//Goal definition
	//**************

	$('#textLearnerGoal').on("change keyup paste", function() {
		if($.trim($("#textLearnerGoal").val())) {	
			//text area is not empty
			learner_goal = $.trim($("#textLearnerGoal").val());
			$('#goalButton').prop("disabled", false);
		} else {
			//text area is empty or only white spaces
			$('#goalButton').prop("disabled", true);
		}
	});

	$('#goalButton').on('click', function(){

		configure_goal(url, hashed_user_id, course_branch_id, learner_goal)
			.then(success_response => {
				if(success_response.success) {
					//switch to goalDisplay panel
					$('#goalPrompt').hide();
					$('#goalButtonContainer').hide();
					$('.goalQuote').text(learner_goal);
					$('#goalDisplay').show();

					update_goal_flag = false;
				}
				else {
					//TODO: what to do when error here? i.e. error on the server side. 
				}
			});
	});

	$('#updateGoalButton').on('click', function(){

		if(update_goal_flag) {			//check if learner can update goal
			//save the previous goal in case the user clicks "cancel"
			previous_learner_goal = learner_goal;

			//fill the textarea with the current goal
			$('#textLearnerGoal').val(learner_goal);

			//display the appropriate containers
			$('#goalDisplay').hide();
			$('#goalPrompt').show();
			$('#updateGoalButtonContainer').show();
		}
	});

	$('#saveNewGoalButton').on('click', function(){

		configure_goal(url, hashed_user_id, course_branch_id, learner_goal)
		.then(success_response => {
			
			if(success_response) {
				console.log(success_response);
				
				$('#goalPrompt').hide('fast');
				$('#updateGoalButtonContainer').hide('fast');
				$('.goalQuote').text(learner_goal);
				$('#goalDisplay').show('fast');	

				$('#updateGoalButton').addClass("disabledButton");
				$('#updateGoalButton').prop("title", "You can change your goal again next week.");
				
				update_goal_flag = false;		
			} else {
				//TODO: what to do here??? i.e. error on the server side. 
			}
			
		});
	});

	$('#cancelNewGoalButton').on('click', function(){
		//discard any changes to the goal
		learner_goal = previous_learner_goal;

		$('#goalPrompt').hide('fast');
		$('#updateGoalButtonContainer').hide('fast');
		$('.goalQuote').text(learner_goal);
		$('#goalDisplay').show('fast');
	});

	//*******************
	//Indicator selection
	//*******************

	$('#indicatorList').on("change", "input:checkbox", function () {
		var lower_limit = 3;
		var upper_limit = 6;
		
		var checked_indicator = $(this).prop("id");

		//select an indicator
		if ($(this).prop('checked')) { 
			if (selected_metrics && selected_metrics.length == upper_limit) {
				this.checked = false;
				
				$('#indicatorsMessage').text("You can select maximum 6 indicators!");
				$('#indicatorsMessageBox').show();
			}
			else {
				selected_metrics.push(checked_indicator);	

				if(selected_metrics.length >= lower_limit) {
					//enable the button
					$('#indicatorsButton').removeClass("disabledButton");
					$('#indicatorsButton').removeAttr("title");
					$('#indicatorsMessageBox').hide();
				}
			}
		}
		//deselect an indicator
		else if (selected_metrics.length <= lower_limit) {	
			this.checked = true;
			//alert user of the number of indicators to be chosen
			$('#indicatorsMessage').text("You can select minimum 3 indicators!");
			$('#indicatorsMessageBox').show();
		} else {
			//remove this changed indicator from the list
			const index = selected_metrics.indexOf(checked_indicator);
			if (index > -1) {
  				selected_metrics.splice(index, 1);
			}
			$('#indicatorsMessageBox').hide();
		}		
		
	});

	$('#indicatorsButton').on('click', function(){
		if(selected_metrics.length >= 3) {
			configure_widget(url, hashed_user_id, course_branch_id, selected_metrics)
				.then(success_response => {
					if(success_response.success) {
						//switch to widget_view panel
						load_widget(learner_metrics, selected_metrics);
						populate_explained_indicators(selected_metrics);

						$('#indicatorsContainer').hide('fast');
						$('#widgetSection').show('fast');

						$('#introConfigure').hide('fast');
						$('#introDisplay').show('fast');
					} else {
						//TODO: what to do when error here? i.e. error on the server side. 
					}

				});
			}
	});

	$('#updateIndicatorsButton').on('click', function(){

		if(update_indicators_flag) {
			//save the previous configuration in case the user clicks "cancel"
			previous_selected_metrics = selected_metrics.slice();

			//check the checkboxes of the indicators already selected
			selected_metrics.forEach( function(metric_id) {
				$('#' + metric_id).prop('checked', true);
			});

			$('#indicatorButtonContainer').hide();
			$('#updateIndicatorsButtonContainer').show();

			$('#widgetSection').hide('fast');
			$('#indicatorsContainer').show('fast');
		}
	});

	$('#saveNewIndicatorsButton').on('click', function(){

		configure_widget(url, hashed_user_id, course_branch_id, selected_metrics)
			.then(success_response => {
				if(success_response.success) {
					load_widget(learner_metrics, selected_metrics);
					populate_explained_indicators(selected_metrics);

					$('#indicatorsContainer').hide('fast');
					$('#widgetSection').show('fast');

					$('#updateIndicatorsButton').addClass("disabledButton");
					$('#updateIndicatorsButton').prop("title", "You can change your indicators again next week.");
					update_indicators_flag = false;
				} else {
					//TODO: what to do when error here? i.e. error on the server side. 
				}

			});
	});

	$('#cancelNewIndicatorsButton').on('click', function(){
		//clean selected checkboxes
		selected_metrics.forEach( function(metric_id) {
			$('#' + metric_id).prop('checked', false);
		});

		//revert to the previous configuration
		selected_metrics = previous_selected_metrics.slice();

		load_widget(learner_metrics, selected_metrics);

		$('#widgetSection').show('fast');
		$('#indicatorsContainer').hide('fast');

	});

	//*********************
	//Explanantions
	//*********************

	// 	Widget legend - indicator explanantions

	$('#legendButton').on('click', function(){
		$('#legend').toggle();

		$(this).text(function(i, text){
			return text === "Hide explanations" ? "Show explanations" : "Hide explanations";
		});
	});

	// 	FAQ

	$('#FAQButton').on('click', function(){
		$('#FAQContainer').toggle();

		$(this).text(function(i, text){
			return text === "Open FAQ" ? "Close FAQ" : "Open FAQ";
		});
		
	});

	$('.question').click( function() {
		var answer_id = "#answer_" + $(this).prop("id").split("_")[1];

		if(!$(answer_id).is(":visible"))
			$('.answer').hide();	
		$(answer_id).toggle();
	
	});

	//*****************
	//	Consent form
	//*****************

	$('#followUpForm').on("change", "input:checkbox", function () {	
		if ($(this).prop('checked')) {
			$('#emailBox').show('fast');
		} 
		else {
			$('#email').val('');
			$('#emailBox').hide('fast');
		}
	});

	$('#agreeConsentButton').on('click', function(){

		var email = $('#email').val();
		var follow_up = $('#followUpCheckBox').prop('checked');

		save_consent(url, hashed_user_id, course_branch_id, true, follow_up, email)
			.then(success_response => {

				//hide consent form and show selections
				if(success_response.success) {
					$('#consentContainer').hide('fast');
					$('#introContainer').show('fast');
					$('#goalsContainer').show('fast');
					$('#goalPrompt').show('fast');
					$('#goalButtonContainer').show('fast');
					populate_indicator_list();
					$('#indicatorsContainer').show('fast');
					$('#surveySection').show('fast');
					populate_srl_survey();
				} else {
					//TODO: what to do here?!
				}
			});
	});

	$('#rejectConsentButton').on('click', function(){

		save_consent(url, hashed_user_id, course_branch_id, false)
			.then(success => {

				//hide consent form and show selections
				$('#consentContainer').hide('fast');
				$('#goodByeMessage').show('fast');
		});
	});

	//*****************
	//	SRL survey
	//*****************

	$('#openSRLButton').on('click', function(){
		$('#openSRLSurveyButton').hide('fast');
		$('#surveyContainer').show('fast');
	});

	$('#SRLTable input[type=radio]').on('click', function() {
		$('#SRLMessageBox').hide('fast');
	});

	$('#saveSurveyButton').on('click', function(){
		
		var srl_survey_values = [];
		var srl_survey_checked_items = [];

		$('#SRLTable input[type=radio]:checked').each(function() {
			// iterate through all checked radio buttons
			srl_survey_values.push($(this).val());
			srl_survey_checked_items.push($(this).attr('name'));
		});

		if(srl_survey_values.length == 24) {
			save_SRL_answers(url, hashed_user_id, course_branch_id, srl_survey_values)
				.then(success_response => {
					if(success_response.success) {
						$('#surveyIntro').hide('fast');
						$('#surveyContainer').hide('fast');
						$('#SRLThanksMessage').show('fast');
			
						console.log(srl_survey_values);
					} else {
						//TODO: what to do in this case?
					}
				});

		} else {
			$('#SRLMessage').text("There are " + (24-srl_survey_values.length) + " questions without an answer.");
			$('#SRLMessageBox').show('fast');

			$('#SRLTable tr').each(function() {
				var row_id = $(this).attr('id'); 

				if(!srl_survey_checked_items.includes(row_id) && !(typeof row_id === 'undefined')) {
					var current_bgcolor = $(this).attr('bgcolor');

					$(this).animate( { backgroundColor: '#fab4b5' }, 400)
            			.animate( { backgroundColor: current_bgcolor }, 400);
				}
			});
		}
	});

	$('#cancelSurveyButton').on('click', function(){
		$('#surveyContainer').hide('fast');
		$('#openSRLSurveyButton').show('fast');
	});
});

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
  
function populate_indicator_list() {
	shuffle(indicator_descriptions);
	$.each(indicator_descriptions, function (index, value) {
		var next_indicator = '<div class="indicator">' +
			'<div class="pretty p-default p-curve"><input type="checkbox" id="' + value.metric_id + '" title="' + value.description + '"/>' +
			'<div class="state p-primary"><label >' + value.name + '</label></div></div></div>\n';
		$("#indicatorList").append(next_indicator);
	});
}

function populate_explained_indicators(selected_metrics){
	//remove the existing explanations
	$("#selectedExplanations").empty();

	var indicator_list_json = {};

	indicator_descriptions.forEach(indicator => {	
		indicator_list_json[indicator.metric_id] = indicator;
	});

	(selected_metrics).forEach(metric_id => {
		var indicator = indicator_list_json[metric_id];
		var next_indicator = '<div class="explainedIndicator">' +
			'<div class=indicatorTitle>' + indicator.name + '</div>' +
			'<div class="indicatorExplanation">' + indicator.description + '</div></div>\n';
		$("#selectedExplanations").append(next_indicator);
	});
}

function populate_srl_survey(){
	shuffle(SRL_items);

	var row_background_color = 'bgcolor="#f2f2f2"';

	$.each(SRL_items, function (index, item) {
		var options = '';

		for (let i = 1; i < 8; i++) {
			options += 
				'<div class="radio-inline">' +
					'<input name="' + item.item_id + '" value="' + item.item_id + '_' + i + '" type="radio">' +
				'</div>';
		}

		var next_row = '<tr id="' + item.item_id +'" ' + row_background_color + '>\n' +
			'<td class="tc-item">' + item.item_text + '</td>\n' +
			'<td class="tc-scale"><div class="radio-group" >' + options + '</div></td></tr>\n';

		$("#SRLTable").append(next_row);

		//alternate table row grey highlight
		row_background_color = row_background_color === 'bgcolor="#f2f2f2"' ? 'bgcolor="#ffffff"' : 'bgcolor="#f2f2f2"';
	});

	var final_row = 
		'<tr><th class="tc-item"></th>' +
			'<th class="tc-scale-title">' +
				'<div id="srl-scale-min">Not at all true for me</div>' +
				'<div id="srl-scale-max">Very true for me</div></th></tr>';

	$("#SRLTable").append(final_row);
}

function load_widget(learner_metrics, selected_metrics) {
	var metricIDs = [];
	var metricNames = [];
	var metricTooltipText = [];
	var seriesLearnerAbsolute = [];
	var seriesLearner = [];
	var seriesLearnerScaled = [];

	//create the series based on the selected metrics
	(selected_metrics).forEach(metric => {
		var metric_id = learner_metrics[metric].name;

		metricIDs.push(metric_id);

		//TODO: replace with a loop and break
		indicator_descriptions.forEach(indicator => {
			if(indicator.metric_id == metric_id) {
				metricNames.push(indicator.name);
				metricTooltipText.push(indicator.tooltip);
			}
		});

		seriesLearnerAbsolute.push(learner_metrics[metric].absolute_value);
		seriesLearner.push(learner_metrics[metric].value);
		seriesLearnerScaled.push(learner_metrics[metric].scaled_value);
	});

	var number_of_selected_metrics = Object.keys(selected_metrics).length;
	var pointInterval = Math.round(360 / number_of_selected_metrics);

	var chartOptions = {
		chart: {
			polar: true,
			spacingLeft:60,
			spacingRight:60
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
					enabled: true,
					symbol: 'circle'
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
				var tooltip_text = '<b>' + metricNames[index] + '</b><br/>' 
					+ metricTooltipText[index];
				
				//replace the learner values in the tooltip
				tooltip_text = tooltip_text.replace('XXX', '<b>' + seriesLearner[index] + '</b>');
				tooltip_text = tooltip_text.replace('YYY', '<b>' + seriesLearnerAbsolute[index] + '</b>');

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

async function get_learner_data(url, hashed_user_id, course_branch_id) {
	url += hashed_user_id + "/" + course_branch_id;

	console.log(url);

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

async function save_consent(url, hashed_user_id, course_branch_id, consent, follow_up, email) {
	url += "consent/" + hashed_user_id + "/" + course_branch_id;
	
	var selected_consent = {
		'consent': consent,
		'follow_up': follow_up,
		'email': email
	};

	return fetch(url, {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(selected_consent)
	})
		.then(response => {
			return response.json();
		})
		.catch(function (error) {
			console.log('There was a problem posting data to the server: \n', error);
			//TODO: hide the "#container" in production
		});

}

async function configure_goal(url, hashed_user_id, course_branch_id, goal) {
	url += "goal/" + hashed_user_id + "/" + course_branch_id;
	
	var selected_goal = {
		'goal': goal
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

async function configure_widget(url, hashed_user_id, course_branch_id, selected_metrics) {
	url += "widget/" + hashed_user_id + "/" + course_branch_id;
	
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
		//TODO: handle error - hide the "#container" in production?
		console.log('There was a problem posting data to the server: \n', error);
	}

}

async function save_SRL_answers(url, hashed_user_id, course_branch_id, SRL_answers) {
	url += "SRL/" + hashed_user_id + "/" + course_branch_id;
	
	var selected_SRL_answers = {
		'SRL_answers': SRL_answers
	};

	try {
		const response = await fetch(url, {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(selected_SRL_answers)
		});
		return response.json();
	}
	catch (error) {
		//TODO: handle error - hide the "#container" in production?
		console.log('There was a problem posting data to the server: \n', error);
	}

}

//transforms the URL parameters from JSON format to URL parameters to be used to fetch user's data for the course
function encodeData(data) {
	//TODO: redo - do I need it?
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
