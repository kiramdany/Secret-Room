'use strict';

angular.module('myApp.viewBetterShare', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/viewBetterShare', {
    templateUrl: 'viewBetterShare/betterShare.html',
    controller: 'ViewBetterShareCtrl',
	controllerAs: 'game'
  });
}])

.controller('ViewBetterShareCtrl', [function() {
	this.numberQuestions = 10;
	this.shares = helperFunctions.randomShares(this.numberQuestions);
	this.currentShare = this.shares[0];
	this.answer = helperFunctions.calculateAnswer(this.currentShare[0]*this.currentShare[1], this.currentShare[2]*this.currentShare[3]);
	this.score = 0;
	this.increment = helperFunctions.incrementScore;
	this.i = 0;
	this.next = helperFunctions.next;
	this.check = helperFunctions.check;
	this.answered = false;
	this.userAnswer = '';
	this.correct = '';
	this.reset = helperFunctions.reset;
	
}]);

var helperFunctions = {
	randomShares: function(number) {
		var shares = [];
		var i = 0;
		for (i; i < number; i++) {
			var amountDecider = Math.random();
			//var whichAmountGreater = Math.random();
			var increment = 0;
			var amount1 = 0;
			var amount2 = 0;
			var percentage1 = randomNumber(1, 100, 5);
			var percentage2 = randomNumber(1, 100, 5);
			var percentageDiff = randomNumber(0, 0.4, 0.01);
			if (amountDecider < 0.5) {
				increment = 10;
				amount1 = randomNumber(10, 150, increment);
			} else {
				increment = 50;
				amount1 = randomNumber(150, 1000, increment);
			}
			amount2 = amount1 * percentage1 / percentage2;
			amount2 = amount2 * (1 - percentageDiff);
			if (amount2 < 150) {
				amount2 = Math.ceil(amount2 / 10) * 10; //increment shouldn't be hardcoded. refactor, used ceil to avoid outputting 0 but should work out a more elegant soln
				//amount2 = Math.round(amount2/increment)*increment; //(used more than once) *1: refactor to a seperate function
			} else {
				amount2 = Math.round(amount2 / 50) * 50;
			}
			//refactor following
			if (amountDecider < 0.5) {
				shares.push([percentage1, amount1, percentage2, amount2]);
			} else {
				shares.push([percentage2, amount2, percentage1, amount1]);
			}


		}

		function randomNumber(min, max, increment) {
			var number = min + (max - min) * Math.random();
			number = Math.round(number / increment) * increment; //(*1)
			return (number > min) ? number : min;
		}
		return shares;
	},
	calculateAnswer: function(share1, share2) {
		var answer = share1 - share2;
		if (answer === 0) {
			answer = '0';
		} else if (answer > 0) {
			answer = '1';
		} else {
			answer = '2';
		}
		return answer;
	},
	incrementScore: function(amount) {
		this.score += amount;
	},
	next: function() {
		this.i++;
		console.log(this.i);
		this.currentShare = this.shares[this.i];
		this.answer = helperFunctions.calculateAnswer(this.currentShare[0]*this.currentShare[1], this.currentShare[2]*this.currentShare[3]);
		this.answered = false;
		this.correct = '';
		this.userAnswer = '';
		console.log(this);
	},
	check: function (element) {
		if(this.answered) {return;}
		this.userAnswer = element.target.id.replace('statement', '');
		if (this.userAnswer === this.answer || this.answer === '0') {
			this.correct = true;
			this.increment(1);
		} else {
			this.correct = false;
			this.increment(0);
		}
		this.answered = true;

	},
	reset: function() {
		this.i = 0;
		this.shares = helperFunctions.randomShares(this.numberQuestions);
		this.currentShare = this.shares[0];
		this.answer = helperFunctions.calculateAnswer(this.currentShare[0]*this.currentShare[1], this.currentShare[2]*this.currentShare[3]);
		this.score = 0;
		this.answered = false;
		this.userAnswer = '';
		this.correct = '';
}
};

