/**
 *   AUTHOR: hbates@northmen.org
 *   VERSION: 1.0
 *   CREATED: 3.23.2015
 *   PROJECT: At Bat!
 *   TODO: Fix changing player to absent from present;
 */

"use strict";

/** @type {boolean} */
var weAreHomeTeam;

/** @type {Array}.<string> */
var players = [],
	presentPlayers = [],
	fielders = [],
	batters = [];

function prepScreen() {
	$("#afterPrep").hide();
	$("#gamePrep").show();
	for (var i = 0; i < players.length; i++) {
		var playerDiv = '<div class="small-9 column" id="player.' + i + '">' +
			'<h2>' + players[i][1] + " " + players[i][0] + '</h2>' +
			'</div>' +
			'<div class="switch round large small-3 columns">' +
			'<input id="present.' + i + '" type="checkbox" />' +
			'<label for="present.' + i + '"></label>' +
			'</div>' +
			'<br>';
		$('#playerAbsent').append(playerDiv);
	}
	setPresentPlayers();
}

function setPresentPlayers() {
	$("#playerAbsent").change(function(event) {
		/** @type {Array}.<string> */
		var player = event.target.id.split('.');
		if ($(event.target).is(':checked')) {
			presentPlayers[player[1]] = players[player[1]][1] + ' ' + players[player[1]][0]; //http://www.i-programmer.info/programming/javascript/1441-javascript-data-structures-the-associative-array.html
		} else {
			delete presentPlayers[player[1]]; //http://stackoverflow.com/questions/1784267/remove-element-from-javascript-associative-array-using-array-value
		}
	});
}

function determineHome() {
	$("#visitorBtn").click(function() {
		weAreHomeTeam = false;
		weBat();
	});

	$("#homeBtn").click(function() {
		weAreHomeTeam = true;
		weField();
	});
}

function weBat() {
	setBatters();
	$("#afterPrep").show();
	$("#gamePrep").hide();
	$("#fieldPositions").hide();
	$("#batting").show();
	$("#nextBatting").show();
	$("#gameInning").show();
}

function weField() {
	setFielders();
	$("#afterPrep").show();
	$("#gamePrep").hide();
	$("#batting").hide();
	$("#nextBatting").hide();
	$("#fieldPositions").show();
	$("#gameInning").show();
}

function setBatters() {
	if (batters.length < 1) {
		for (var player in presentPlayers) {
			batters.push(presentPlayers[player]);
		}
	}
	batters.unshift(batters.pop());
	var batter = '<h2 class="largeFont">' + batters[0] + '</h2>';
	$('#currentBatter').append(batter);
	var onDeck1 = '<h2 class="largeFont">' + batters[1] + '</h2>' +
				'<h2 class="largeFont">' + batters[2] + '</h2>' +
				'<h2 class="largeFont">' + batters[3] + '</h2>';
	$('#onDeck').append(onDeck1);
}

function setFielders() {
	if (fielders.length < 1) {
		for (var player in presentPlayers) {
			fielders.push(presentPlayers[player]);
		}
	}
	fielders.unshift(fielders.pop());
	var positions = '<h2 class="largeFont"><strong>C =</strong> ' + fielders[0] + '</h2>' +
			'<h2 class="largeFont"><strong>P =</strong> ' + fielders[1] + '</h2>' +
			'<h2 class="largeFont"><strong>1B =</strong> ' + fielders[2] + '</h2>' +
			'<h2 class="largeFont"><strong>2B =</strong> ' + fielders[3] + '</h2>' +
			'<h2 class="largeFont"><strong>3B =</strong> ' + fielders[4] + '</h2>' +
			'<h2 class="largeFont"><strong>SS =</strong> ' + fielders[5] + '</h2>' +
			'<h2 class="largeFont"><strong>LF =</strong> ' + fielders[6] + '</h2>' +
			'<h2 class="largeFont"><strong>CF =</strong> ' + fielders[7] + '</h2>' +
			'<h2 class="largeFont"><strong>RF =</strong> ' + fielders[8] + '</h2>';
	if (fielders >= 9) {
		positions = positions + '<h2 class="largeFont"><strong>CF2 =</strong> ' + fielders[9] + '</h2>';
	}
	$('#positions').append(positions);
}

function strikeBtnClick() {

}

function ballBtnClick() {

}

function foulBtnClick() {

}

function outBtnClick() {

}

function runBtnClick() {

}

function baseBtnClick() {

}

function undoBtnClick() {

}

function setPlayersArray() {
	/** @type {Array.<string>} */
	var lines = [];
	$.ajax({
		url: 'data/players.csv',
		contentType: "text/csv",
		async: false,
		success: function(text) {
			lines = text.split(/\n/);
		}
	});
	for (var i = 0; i < lines.length; i++) {
		lines[i] = lines[i].replace(/(\r\n|\n|\r)/gm,"");
		players[i] = lines[i].split(",");
	}
}

window.onload = function() {
	setPlayersArray();
	prepScreen();
	determineHome();
	strikeBtnClick();
	ballBtnClick();
	foulBtnClick();
	outBtnClick();
	runBtnClick();
	baseBtnClick();
	undoBtnClick();
};