/**
 *   AUTHOR: hbates@northmen.org
 *   VERSION: 1.0
 *   CREATED: 3.23.2015
 *   PROJECT: At Bat!
 */

"use strict";

/** @type {Array}.<string> */
var players = [],
	presentPlayers = [];

function prepScreen() {
	$("#fieldPositions").hide();
	$("#batting").hide();
	$("#nextBatting").hide();
	$("#gameInning").hide();
	$("#playerAbsent").show();

	for (var i = 0; i < players.length; i++) {
		var playerDiv = '<div class="small-9 column" id="player.' + i + '">' +
			'<h2>' + players[i][1] + " " + players[i][0] + '</h2>' +
			'</div>' +
			'<div class="switch round large small-3 columns">' +
			'<input id="present.' + i + '" type="checkbox" />' +
			'<label for="present.' + i + '"></label>' +
			'</div>';
		$('#playerAbsent').append(playerDiv);
		setPresentPlayers(i);
	}
}

function setPresentPlayers(playerNum) {
	/** @type {number} */
	var counter = 0;

	/** @type {string} */
	var presentPlayer = "#present." + playerNum;

	$(presentPlayer).on('click', function() {
		if ($(presentPlayer).is(':checked')) {
			presentPlayers[counter] = players[playerNum];
			counter++;
			console.log(presentPlayers[counter]);
		} else {
			console.log("hi!");
		}
	});
}

function determineHome() {
	$("#homeTeam").click(function() {
		weField();
	});
	$("#visitorTeam").click(function() {
		weBat();
	});
}

function weBat() {
	$("#weAre").hide();
	$("#fieldPositions").hide();
	$("#playerAbsent").hide();
	$("#batting").show();
	$("#nextBatting").show();
	$("#gameInning").show();
}

function weField() {
	$("#weAre").hide();
	$("#playerAbsent").hide();
	$("#batting").hide();
	$("#nextBatting").hide();
	$("#fieldPositions").show();
	$("#gameInning").show();
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
			return;
		}
	});
	for (var i = 0; i < lines.length; i++) {
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
