/**
 *   AUTHOR: hbates@northmen.org
 *   VERSION: 1.0
 *   CREATED: 3.23.2015
 *   PROJECT: At Bat!
 */

"use strict";

/** @type {boolean} */
var weAreHomeTeam;

/** @type {Array}.<string> */
var players = [],
	presentPlayers = [],
	fieldPositions = [];

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
	/** @type {number} */
	var counter = 0;
	$("#playerAbsent").change(function(event) {
		var player = event.target.id.split('.');
		presentPlayers[counter] = players[player[1]][1] + ' ' + players[player[1]][0];
		counter++;
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
	presentPlayers.unshift(presentPlayers.pop());
}

function setFielders() {

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
