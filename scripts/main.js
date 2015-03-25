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
var players = [];

function prepScreen() {
	$("#fieldPositions").hide();
}

function determineHome() {
	$("#homeTeam").change(function() {
		if ($("#homeTeam").is(":checked")) {
			weAreHomeTeam = true;
			weField();
		} else {
			weAreHomeTeam = false;
			weBat();
		}
	});
}

function weBat() {
	$("#fieldPositions").hide();
	$("#batting").show();
	$("#nextBatting").show();
	$("#gameInning").show();
}

function weField() {
	$("#batting").hide();
	$("#nextBatting").hide();
	$("#gameInning").hide();
	$("#fieldPositions").show();
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
