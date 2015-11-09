//Better Share 
/*
User is asked, for example, to choose between 5% of 20000 and 10% of 15000. The Dragons in Dragon's Den often point this out to budding entrepreneurs.
*/

/*variables*/
//original array 
//copy of array
//score
//current question
//share1
//share2
//answer

/*global $, $game */
"use strict";
//var sharesOrig = [ //[percentage1, value1, percentage2, value2] 
//
//	[5, 20000, 10, 15000],
//	[10, 10, 5, 20]
//]; 
var shares = [[]];
var score = 0;
var currentShare = [];
var share1 = 0;
var share2 = 0;
var answer = '';
var score = [0,0];

/*Entry Point*/ //moved to HTML

//$(function() {
//	reset();
//	preLoad();
//	load();
//	
//});

/*Functions*/

function preLoad (test) {
	//copies array as using shift, and thus can reset at end. Or could use an incrementer and track within the code
	//shares = sharesOrig.slice();
	
	//Randomly generated array
	var questions = 10;
	score = [0, questions];
	randomShares(questions);
	
	/*Graphically
	//adds div to screen which will contain game
	var $game = $("<div>", {id: "game"});
	$("body").append($game);*/
	preLoadDOM(test);
}
function load () {
	
	/*programatically*/
	//if there is next entry of array
	// load first/next entry of the array
	//calculate shares
	//calculate answer
	
	//else
	//call gameOver
	
	currentShare = shares.shift();
	if (!currentShare) {
		gameOver();
		return;
	}
	calculateShares();
	calculateAnswer();
	
	
	
	//graphically
	//clears previous elements
	// inserts header 'Which is the better share? (click either if they are the same)'
	//insert buttons with the shares on them. OnClick checkAnswer
	loadDOM();
	updateScore();
}

function checkAnswer () {
	/*programatically*/
	//checks if button relates to correct answer
	//update score
	var userAnswer = this.id.replace('statement','');
	var $btn = $(this);
	var $icon = $("<span>");
	$btn.removeClass("btn-default");
	if (userAnswer === answer || answer === '0'){
		incrementScore(1);
		$icon.addClass("glyphicon glyphicon-ok");
		$btn.addClass("btn-success");
	}
	else {
		incrementScore(0);
		$icon.addClass("glyphicon glyphicon-remove");
		$btn.addClass("btn-danger");
	}
	$(".btn").off();
	$btn.append($icon);
	$("<a>", {class: "btn btn-default"}).text("next").click(load).appendTo($("#game"));
	updateScore();
	
	//graphically
	// tick or cross within button, representing correct answer
	//display the share for both options
	//insert next button, with onClick load
	//score 
}


function reset () {
	//reset array copy 
	//calls load
	shares = [[]];
	score = 0;
	currentShare = [];
	share1 = 0;
	share2 = 0;
	answer = '';
	score = [0, 0];
	
	/*Graphically*/
	//clears screen
	$('#game').remove();
}

function fullReset(test) {
	reset();
	preLoad(test);
	load();
}


//DOM functions

function preLoadDOM (test) {
	/*Graphically*/
	//adds div to screen which will contain game
	var $game = $("<div>", {id: "game", class: "container"});
	$("div.area").append($game);
	
	var $question = $("<h2>").text("Which is the better share?");
	var $note = $("<h4>").text("\(click either if they are the same\)");
	var $score = $("<h4>", {id: "score"});
	$game.append($question, $note, $score);
	
	if (test) {
		console.log(test);
		var $answers = $("<div>", {id: "answers"});
		$game.append($answers);
	}
}
function loadDOM () {
	//graphically
	//clears previous elements
	// inserts header 'Which is the better share? (click either if they are the same)'
	//insert buttons with the shares on them. OnClick checkAnswer
	
	//clear old buttons
	$game = $("#game");
	$game.children(".btn").remove();
	$("#answers").children().remove();
	
	
	
	var statement1 = createStatement(1);
	var statement2 = createStatement(2);
	var $statement1 = $("<a>", {id:'statement1', class: "btn btn-default "}).text(statement1).click(checkAnswer);
	var $statement2 = $("<a>", {id:'statement2', class: "btn btn-default"}).text(statement2).click(checkAnswer);
	$game.append($statement1, $statement2);
	
	var $answer1 = $("<p>").text(share1);
	var $answer2 = $("<p>").text(share2);
	$("#answers").append($answer1, $answer2);
	
}

function updateScore () {
	//graphically appends score to game div
	var correct = score[0].toString();
	var total = score[1].toString();
	var scoreMessage = "Score: " + correct + " / " + total;
	$("#score").text(scoreMessage);
}

function clearScreen () {
	//removes all child elements of game div
	$("#game").empty();
}

function gameOver () {
	/*programatically*/
		
	//graphically
	// inserts header 'You have finished all the examples. Your score is {score}'
	//inserts reset button with onClick reset
	clearScreen();
	var $header = $("<h2>").text("You have finished all the examples");
	var $score = $("<h4>").text("You scored " + score[0].toString() + " out of " + score[1].toString());
	var $reset = $("<a>", {id:'reset', class: "btn btn-default "}).text("Reset").click(fullReset);
	$("#game").append($header, $score, $reset);
	updateScore();
}

//helpers
function calculateShares () {
	share1 = currentShare[0]*currentShare[1]/100;
	share2 = currentShare[2]*currentShare[3]/100;
}

function calculateAnswer() {
	answer = share1 - share2;
	if (answer === 0) {
		answer = '0';
	} else if (answer > 0) {
		answer = '1';
	} else {
		answer = '2';
	}
}

function createStatement (statementNumber) {
	// statementNumber either 1 or 2 <refactor>
	var i = 0;
	if (statementNumber === 2) {
		i = 1;
	}
	
	var statement = currentShare[i].toString() + '\% of £' + currentShare[i+1].toString();
		
	return statement;
}

function incrementScore (amount) { //amount should really only by 0 or 1
	score[0] += amount;
}

function randomShares(number) {
	shares = [];
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
		}
		else {
			increment = 50;
			amount1 = randomNumber(150, 1000, increment);
		}
		amount2 = amount1*percentage1/percentage2;
		amount2 = amount2*(1-percentageDiff);
		if (amount2 < 150) {
			amount2 = Math.ceil(amount2/10)*10; //increment shouldn't be hardcoded. refactor, used ceil to avoid outputting 0 but should work out a more elegant soln
			//amount2 = Math.round(amount2/increment)*increment; //(used more than once) *1: refactor to a seperate function
		}
		else {
			amount2 = Math.round(amount2/50)*50;
		}
		//refactor following
		if (amountDecider < 0.5) {
			shares.push([percentage1, amount1, percentage2, amount2]);
		}
		else {
			shares.push([percentage2, amount2, percentage1, amount1]);
		}
		

	}
	function randomNumber (min, max, increment) {
		var number = min + (max-min)*Math.random();
		number = Math.round(number/increment)*increment; //(*1)
		return (number>min) ? number : min;
	}
}


