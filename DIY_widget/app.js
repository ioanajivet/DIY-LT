//collect the checkboxes that are checked
function collectCheckedBoxes() {
	var checkboxArray = [];
  
	$("#indicators input[type='checkbox']:checked").each(function() {
	  var id = $(this).prop("id");
	  var value = id.split("_").pop();
	  checkboxArray.push(parseInt(value) - 1);
	});
  
	return checkboxArray;
  }

function get_learner_data(hashed_user_id, course_branch_id,course_week, callback) {
		var url = 'http://localhost:8000/get_learner_data/';
		url += hashed_user_id + "/" + course_branch_id + "/" + course_week;
	  
		return fetch(url, {
			method: 'GET',
			mode: 'cors',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			}
		})
		.then( (response) => response.json())
		.then(function(learner_data) {
			//console.log(learner_data);
			callback(learner_data);

		})
		.catch(function(error) {
			console.log('Looks like there was a problem: \n', error);
		  });
}

$(function() {
  
	var learner_data = {};
	$("#close").click(function(){
	  $("#customization").toggle();
	  });
  
	get_learner_data("user_123", "branch_A", "1", function(fetched_data){
		console.log(fetched_data);
		learner_data = fetched_data;

			/*
	var metricNamesOriginal = [
	  'Online presence',
	  'Connectedness',
	  'Time on platform',
	  'Revisited material',
	  'Timeliness of submissions',
	  'Active learning time',
	  'Practice time',
	  'Practice quiz attempted',
	  'Practice quiz efficiency',
	  'Graded quiz attempted'
	];
	//var seriesLearnerOriginal = [1, 5, 6, 2, 7, 5, 4, 3, 8, 4];
	//var seriesSuccessOriginal = [4, 2, 3, 4, 8, 6, 5, 3, 7, 1]; 
	var metricNames = metricNamesOriginal; */
	var metricNames = learner_data.metric_names;
	console.log("metricNames: " + metricNames);
	var seriesLearnerOriginal = learner_data.scaled_metric_values;
	var seriesSuccessOriginal = learner_data.scaled_standard_metric_values;
	
	
	var seriesLearner;
	var seriesSuccess;
	var pointInterval = 0;
  
	var chartOptions = {
	  chart: {
		polar: true
	  },
  
	  title: {
		text: 'Learning tracker'
	  },
  
	  pane: {
		startAngle: 0,
		endAngle: 360
	  },
	  credits: {
		enabled: false
	  },
	  xAxis: {
		tickInterval: pointInterval,
		min: 0,
		max: 360,
		labels: {
		  formatter: function() {
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
  
		reversed: true
	  },
  
	  series: [ //{type: 'area',
		//color: 'rgba(255, 255, 102, 1)',
		//name: 'Threshold',
		//data: [8, 7, 6, 5, 4, 6], 
		//borderWidth: 0.5,
		//borderColor: '#000000'          
  
		// },
		{
		  type: 'area',
		  name: 'You',
		  color: 'rgba(111, 168, 220 ,1)',
		  data: seriesLearner
		},
		{
		  type: 'area',
		  name: 'Successful learners',
		  color: 'rgba(15, 75, 130,1)',
		  data: seriesSuccess
		}
	  ]
	};
  
	var chart = Highcharts.chart('profile', chartOptions);
	//when a box is checked, the data series should be hiden.  
  
	$("#indicators input:checkbox").on("change", function() {
	  var limit = 6;
	  if ($("#indicators input[type='checkbox']:checked").length > limit) {
		this.checked = false;
		alert("You can select minimum 3 and maximum 6 indicators!");
	  } else {
		var checkedBoxes = collectCheckedBoxes().sort();
  
		if (checkedBoxes.length == 0)
		  pointInterval = 0;
		else
		  pointInterval = Math.round(360 / checkedBoxes.length); //to account for 7
  
		seriesLearner = checkedBoxes.map(value => {
		  return seriesLearnerOriginal[value]
		});
		seriesSuccess = checkedBoxes.map(value => {
		  return seriesSuccessOriginal[value]
		});
		metricNames = checkedBoxes.map(value => {
		  return metricNamesOriginal[value]
		});
  
		chartOptions.series[0].data = seriesLearner;
		chartOptions.series[1].data = seriesSuccess;
		chartOptions.xAxis.tickInterval = pointInterval;
		chartOptions.plotOptions.series.pointInterval = pointInterval;
  
		chart = Highcharts.chart('profile', chartOptions);
  
	  }
	});
	});
	


  
  });


	//transforms the URL parameters from JSON format to URL parameters to be used to fetch user's data for the course
  function encodeData(data) {
	return Object.keys(data)
	  .map(function(key) {
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
