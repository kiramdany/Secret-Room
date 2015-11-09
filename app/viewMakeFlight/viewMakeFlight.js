'use strict';


angular.module('myApp.viewMakeFlight', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/viewMakeFlight', {
    templateUrl: 'viewMakeFlight/viewMakeFlight.html',
    controller: 'ViewMakeFlightCtrl',
	controllerAs: 'exercise'
  });
}])

.controller('ViewMakeFlightCtrl', function() {
	this.questions = [
		[new Date(2015, 1, 1, 11, 46), 2, 0, new Date(2015, 1, 1, 13, 45)],
		[new Date(2015, 1, 1, 1, 55), 5, 0, new Date(2015, 1, 1, 11, 45)],
		[new Date(2015, 1, 1, 22, 35), 5, 5, new Date(2015, 1, 2, 1, 30)]
	];
	this.makeFlight = canMakeFlight;
	this.i = 0;
	this.current = this.questions[this.i];
	this.update = update;
	this.correct = false;
	this.incorrect = false;
	this.check = check;
	this.size = this.questions.length;
});

function canMakeFlight(start, durationHour, durationMin, end) {
	var diff = end.getTime() - start.getTime();
	var diffInMins = diff/(60*1000);
	console.log(diffInMins);
	var durationInMins = durationHour*60 + durationMin;
	console.log(durationInMins);
	return (durationInMins >= diffInMins);
}

function update() {
	/* jshint validthis: true */
	var i = this.i;
	i++;
	if (i === this.questions.length) {i = 0;}
	this.i = i;
	this.current = this.questions[i];
	this.correct = false;
	this.incorrect = false;
	
}

function check(element) {
	/* jshint validthis: true */ 
	var statement = this.current;
	var answer = canMakeFlight.apply({}, statement);
	var userAnswer = element.target.id === "yes";
	if (answer === userAnswer) {
		this.correct = true;
	}
	else {this.incorrect = true;}
}

