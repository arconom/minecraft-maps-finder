// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://hentaiverse.org/*
// @grant        none
// ==/UserScript==

NodeList.prototype.forEach = Array.prototype.forEach;
var grind = document.querySelector("#grindfest > div > img");
if (grind) {
	grind.click();
}

var salvage = document.querySelector("#item_pane > div > div > div:nth-child(2)");
if(salvage){
    salvage.click();
    document.querySelector("#salvage_button").click();
}

var trainingProgress = document.querySelector("#train_progcnt");
var trainXp = document.querySelector("#train_table > tbody > tr:nth-child(2) > td:nth-child(8) > img");

if (trainingProgress) {
	setTimeout(function () {
		document.querySelector("#train_table > tbody > tr:nth-child(2) > td:nth-child(8) > img").click();
	}, 3600000);
} else if (trainXp) {
	trainXp.click();
}

function loop() {
	return setInterval(function () {
		chooseAction()();
	}, 1000);
}

function makeNoise(time) {
	var context = new AudioContext();
	var o = context.createOscillator();
	o.type = "sine";
	o.connect(context.destination);
	o.start();
	setTimeout(function () {
		o.stop();
	}, time);
}

function chooseAction() {

	var riddle = document.querySelector("#riddleanswer");

	if (riddle) {
		makeNoise(500);
	}

	var finish = document.querySelector("#btcp > div:nth-child(3) > img");
	if (finish) {
		finish.click();
	}

	var prompt = document.querySelector("#btcp");
	var health = 0;
	var mana = parseInt(document.querySelector("#dvrm").textContent);
	var monsterCount = document.querySelectorAll("#pane_monster > div[onclick]").length;
	var tokenCount = document.querySelector("#dvrc").textContent;

	var effects = document.querySelector("#pane_effects");

	var fireEnabled = !!document.querySelector("#quickbar > div:nth-child(1)[onclick]");
	var drainEnabled = !!document.querySelector("#quickbar > div:nth-child(2)[onclick]");
	var slowEnabled = !!document.querySelector("#quickbar > div:nth-child(3)[onclick]");
	var healEnabled = !!document.querySelector("#quickbar > div:nth-child(4)[onclick]");
	var absorbEnabled = !!document.querySelector("#quickbar > div:nth-child(5)[onclick]");
	var protectionEnabled = !!document.querySelector("#quickbar > div:nth-child(6)[onclick]");
	var regenEnabled = !!document.querySelector("#quickbar > div:nth-child(7)[onclick]");

	try {
		health = parseInt(document.querySelector("#dvrhb").textContent);
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
		"absorb": 0,
		"protection": 0,
		"regen": 0,
		"fire": 0
	};

	if (!prompt) {
		if (monsterCount === 1) {
			if ((effects.innerHTML.indexOf("Absorb") === -1) && (absorbEnabled)) {
				mapping["absorb"] += 1;
			}
			if ((effects.innerHTML.indexOf("Regen") === -1) && (regenEnabled)) {
				mapping["regen"] += 1;
			}
			if ((effects.innerHTML.indexOf("Protection") === -1) && (protectionEnabled)) {
				mapping["protection"] += 1;
			}
			if ((mana < (200 * .8)) && (tokenCount > 25)) {
				mapping["focus"] += 1;
			}
			if ((health < ((1150 * 0.7))) && (tokenCount > 0)) {
				mapping["defend"] += 1;
			}
		}

		if ((mana < (200 * .8)) && (tokenCount > 25)) {
			mapping["focus"] += 1;

			if (tokenCount > 200) {
				mapping["focus"] += 4;
			}
		}
		if ((health < ((1150 * 0.7))) && (tokenCount > 0)) {
			mapping["defend"] += 1;
		}
		if ((mana > 8) && (health < ((1150 * .4))) && (healEnabled)) {
			mapping["heal"] += 5;
		}
		if (monsterCount > 1) {
			mapping["attack"] += 1;
		}
		if ((groupedMonsters() !== -1) && (mana > 3)) {
			mapping["fire"] += 3;
		}

		mapping["attack"] += 1;

		return getFunction(Object.keys(mapping).reduce(function (a, b) {
				return mapping[a] > mapping[b] ? a : b
			}));
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
			document.querySelector(".btm1[onclick]").click()
		},
		"defend": function () {
			document.querySelector("#ckey_defend").click()
		},
		"focus": function () {
			document.querySelector("#ckey_focus").click()
		},
		"spirit": function () {
			document.querySelector("#ckey_spirit").click()
		},
		"protection": function () {
			document.querySelector("#quickbar > div:nth-child(6)").click()
		},
		"heal": function () {
			document.querySelector("#quickbar > div:nth-child(4)").click()
		},
		"absorb": function () {
			document.querySelector("#quickbar > div:nth-child(5)").click()
		},
		"regen": function () {
			document.querySelector("#quickbar > div:nth-child(7)").click()
		},
		"fire": function () {
			document.querySelector("#quickbar > div:nth-child(1)").click()
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

	return mapping[value] == null ? mapping["attack"] : mapping[value];
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

(function () {

	var looper = document.createElement("button");
	looper.onclick = start;
	looper.textContent = "start";
	looper.style.display = "block";
	looper.style.padding = "1em";
	document.querySelector("#pane_action").appendChild(looper);

	looper.click();
})();
