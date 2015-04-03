/**
 *   AUTHOR: hbates@northmen.org
 *   VERSION: 1.0
 *   CREATED: 3.23.2015
 *   PROJECT: At Bat!
 *   TODO: Finish undo buton; Fix inning switch (rotate players);
 */

"use strict";

/** @type {boolean} */
var weAreHomeTeam, inningTop, weScore;

/** @type {Array}.<string> */
var players = [],
	presentPlayers = [],
	fielders = [],
	batters = [];

/** @type {number} */
var outs, strikes, fouls, balls, runs, usScore, opponentScore, inning;

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
		setWeScore();
	});

	$("#homeBtn").click(function() {
		weAreHomeTeam = true;
		weField();
		setWeScore();
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

	/** @type {string} */
	var batter = '<h2 class="largeFont">' + batters[0] + '</h2>',
		onDeck1 = '<h2 class="largeFont">' + batters[1] + '</h2>' +
				'<h2 class="largeFont">' + batters[2] + '</h2>' +
				'<h2 class="largeFont">' + batters[3] + '</h2>';
	$('#currentBatter').append(batter);
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

function setInning() {
	if (!inning) {
		inning = 1;
	}
	if (inningTop === undefined) {
		inningTop = true;
		$("#inning").html('<h2 class="largerFont text-center fa fa-arrow-circle-up"></h2>');
		$("#inningNum").html('<h2 class="largeFont text-left">' + inning + '</h2>');
	} else if (inningTop === true) {
		inningTop = false;
		$("#inning").html('<h2 class="largerFont text-center fa fa-arrow-circle-down"></h2>');
	} else if (inningTop === false) {
		inningTop = true;
		inning++;
		$("#inningNum").html('<h2 class="largeFont text-left">' + inning + '</h2>');
		$("#inning").html('<h2 class="largerFont text-center fa fa-arrow-circle-up"></h2>');
	}
}

function setOuts() {
	/** @constant */
	var MAX_OUTS = 2;

	if (!outs) {
		outs = 0;
	}

	if (outs < MAX_OUTS) {
		outs++;
		$("#outCount").text(outs);
	} else {
		outs = 0;
		$("#outCount").text(outs);
		$("#strikeCount").text(0);
		$("#foulCount").text(0);
		$("#ballCount").text(0);
		$("#runCount").text(0);
		setWeScore();
		setInning();
		if (weScore === true) {
			weField();
		} else {
			weBat();
		}
	}
}

function setStrikes() {
	/** @constant */
	var MAX_STRIKES = 2;

	if (!strikes) {
		strikes = 0;
	}

	if (strikes < MAX_STRIKES) {
		strikes++;
		$("#strikeCount").text(strikes);
	} else {
		setOuts();
		strikes = 0;
		$("#strikeCount").text(strikes);
		$("#foulCount").text(strikes);
		$("#ballCount").text(strikes);
	}
}

function setFouls() {
	/** @constant */
	var MAX_FOULS = 2;

	if (!fouls) {
		fouls = 0;
	}

	if (fouls < MAX_FOULS) {
		setStrikes();
		fouls++;
		$("#foulCount").text(fouls);
	} else {
		fouls++;
		$("#foulCount").text(fouls);
	}
}

function setBalls() {
	/** @constant */
	var MAX_BALLS = 3;

	if (!balls) {
		balls = 0;
	}

	if (balls < MAX_BALLS) {
		balls++;
		$("#ballCount").text(balls);
	} else {
		balls = 0;
		setRuns();
		$("#strikeCount").text(balls);
		$("#foulCount").text(balls);
		$("#ballCount").text(balls);
	}
}

function setScore() {
	if (usScore === undefined && opponentScore === undefined) {
		usScore = 0;
		opponentScore = 0;
		$("#usScore").html('<h2 class="text-center largestFont text-center">' + usScore + '</h2>');
		$("#opponentScore").html('<h2 class="text-center largestFont text-center">' + opponentScore + '</h2>');
	} else if (weScore === true) {
		usScore++;
		$("#usScore").html('<h2 class="text-center largestFont text-center">' + usScore + '</h2>');
	} else {
		opponentScore++;
		$("#opponentScore").html('<h2 class="text-center largestFont text-center">' + opponentScore + '</h2>');
	}
}

function setWeScore() {
	if (weScore === undefined && weAreHomeTeam === false) {
		weScore = true;
	} else if (weScore === undefined && weAreHomeTeam === true) {
		weScore = false;
	} else if (weScore === false) {
		weScore = true;
	} else {
		weScore = false;
	}
}

function setUndo() {

}

function setRuns() {
	if (!runs) {
		runs = 0;
	}
	runs++;
	$("#runCount").text(runs);
	setScore();
}

function strikeBtnClick() {
	$("#strikeBtn").click(function() {
		setStrikes();
	});
}

function ballBtnClick() {
	$("#ballBtn").click(function() {
		setBalls();
	});
}

function foulBtnClick() {
	$("#foulBtn").click(function() {
		setFouls();
	});
}

function outBtnClick() {
	$("#outBtn").click(function() {
		setOuts();
	});
}

function runBtnClick() {
	$("#runBtn").click(function() {
		setRuns();
	});
}

function baseBtnClick() {
	$("#baseBtn").click(function() {
		strikes = 0;
		fouls = 0;
		balls = 0;
		$("#strikeCount").text(strikes);
		$("#foulCount").text(fouls);
		$("#ballCount").text(balls);
	});

}

function undoBtnClick() {
	$("#undoBtn").click(function() {
		setUndo();
	});
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
	setInning();
	setScore();
	strikeBtnClick();
	ballBtnClick();
	foulBtnClick();
	outBtnClick();
	runBtnClick();
	baseBtnClick();
	undoBtnClick();
};