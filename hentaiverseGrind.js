

NodeList.prototype.forEach = Array.prototype.forEach;

function loop() {
	return setInterval(function () {
		chooseAction()();
	}, 1000);
}

function chooseAction() {
	var prompt = document.querySelector("#btcp");
	var health = 0;
	var mana = parseInt(document.querySelector("#pane_vitals #vrm").textContent, 10);
	var monsterCount = document.querySelectorAll("#pane_monster > div[onclick]").length;
	var tokenCount = document.querySelectorAll("#vcp > div > div").length;
	var healAvailable = document.querySelector("#qb1[onclick]") == null ? false : true;

	try {
		health = parseInt(document.querySelector("#pane_vitals #vrhb").textContent, 10);
	} catch (e) {
		health = 0;
	}

	var mapping = {
		"attack": 0,
		"defend": 0,
		"focus": 0,
		"spirit": 0,
		"protection": 0,
		"heal": 0,
		"fire": 0
	};

	if (!prompt) {
		if ((mana < (130 * 0.8)) && (tokenCount > 0)) {
			mapping.focus += 1;
		}
		if ((health < ((950 * 0.7))) && (tokenCount > 0)) {
			mapping.defend += 1;
		}
		if ((mana > 8) && (health < ((950 * 0.33))) && (healAvailable)) {
			mapping.heal += 5;
		}
		if (monsterCount > 1) {
			mapping.attack += 1;
		}
		if ((groupedMonsters() !== -1) && (mana > 2)) {
			mapping.fire += 3;
		}

		mapping.attack += 1;

		var returnMe = getFunction(Object.keys(mapping).reduce(function (a, b) {
					return mapping[a] > mapping[b] ? a : b
				}));

		return returnMe;
	} else {
		prompt.click();
	}

}
function groupedMonsters() {

	var monsters = document.querySelectorAll("#pane_monster > div");
	var i;

	for (i = 1; i < monsters.length - 1; i++) {
		if ((monsters[i - 1].onclick !== null)
			 && (monsters[i].onclick !== null)
			 && (monsters[i + 1].onclick !== null)) {
			return i;
		}
	}
	return -1;
}
function getFunction(value) {
	var mapping = {
		"attack": function () {
			document.querySelector(".btm1[onclick]").click();
		},
		"defend": function () {
			document.querySelector("#ckey_defend").click();
		},
		"focus": function () {
			document.querySelector("#ckey_focus").click();
		},
		"spirit": function () {
			document.querySelector("#ckey_spirit").click();
		},
		"protection": function () {
			document.querySelector("#qb2").click();
		},
		"heal": function () {
			document.querySelector("#qb1").click();
		},
		"fire": function () {
			document.querySelector("#qb4").click();
			setTimeout(function () {
				var n = groupedMonsters();
				console.log("targeting ", n);
				document.querySelectorAll("#pane_monster > div")[n].click();
			}, 2000);
		}
	};

	if (!mapping[value]) {
		return
	}

	return mapping[value] == null ? mapping.attack : mapping[value];
}

var interval;

function start() {
	interval = loop();
	this.onclick = stop;
	this.textContent = "stop";
}
function stop() {
	clearInterval(interval);
	this.onclick = start;
	this.textContent = "start";
}

var looper = document.createElement("button");
looper.onclick = start;
looper.textContent = "start";
document.querySelector("#pane_action").appendChild(looper);

looper.click();


