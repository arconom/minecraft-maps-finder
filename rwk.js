// gattack("attack");
// gattack("lattack");
// gattack("rattack");
// gattack("defend");
var promise = new Promise(function (resolve, reject) {
		resolve();
	});

var isApex = true;
var haste = 30;
var standardDelay = 10000, reviveDelay = 22000, rapidDelay = 6000, newFightDelay = 1000;
var counter = 0;
var done = false;
var cancelMove = false;
var pointsOfInterest = {
	Pub: {
		x: 150,
		y: 145
	},
	Puddle: {
		x: 140,
		y: 190
	},
	Mines: {
		x: 162,
		y: 159
	}
};

var selectors = {
	actionDelay: "#s_ActionDelay",
	actionsSelect: "select[name=\"action\"]",
	teleportOption: "option[value=\"tele\"]",
	actionSubmit: "#s_subbut > input[type=\"image\"]",
	fightButtons: "#s_FightWin",
	castButton: "#s_FightWin > img:nth-child(2)",
	durButton: "img[onmousedown=\"level(3)\"]",
	reviveButton: "img[onmousedown=\"revive()\"]",
	response: "#s_Response font",
	security: "#s_Response img",
	mainFrame: "frame[name=\"main\"]",
	target: "select[name=\"target\"]",
	other: "select[name=\"other\"]",
	chat: "#s_Chat"
};

NodeList.prototype.forEach = Array.prototype.forEach;
NodeList.prototype.map = Array.prototype.map;

//state observers
function getRWKState() {
	return {
		isReviveNeeded: isMainFrameElementPresent(selectors.reviveButton),
		isBeastActive: isBeastActive(),
		isTrainingNeeded: isMainFrameElementPresent(selectors.durButton),
		isTreasuryFull: false,
		isKingdomOwnedByMe: false,
		isWalletFull: false,
		isTimedOut: false,
		isInventoryFull: isInventoryFull(),
		isSecurityResponseNeeded: isMainFrameElementPresent(selectors.security)
	};
}

function getResponseMessage() {
	return getMainFrameElement(selectors.response)
	.textContent;

}

function getChat() {
	var returnMe = document.querySelector(selectors.chat);
	if (!returnMe) {
		returnMe = getMainFrameElement(selectors.chat);
	}
	return returnMe;
}

function getChatText() {
	var returnMe = [];
	getChat().querySelectorAll("font").forEach(function (x) {
		returnMe.push(x.textContent);
	});
	return returnMe;
}

function isBeastActive(text) {

	if (!text) {
		text = getChatText().join(" ");
	}

	var awakeIndex = text.indexOf("awoken");
	var killedIndex = text.indexOf("killed");
	var slainIndex = text.indexOf("slain");
	var deadIndex = -1;

	if (killedIndex > -1) {
		deadIndex = killedIndex;
	}
	if (slainIndex > -1) {
		deadIndex = slainIndex;
	}

	return
	(awakeIndex > -1)
	 && ((deadIndex.index == -1)
		 || (deadIndex.index > awakeIndex.index));
}

function isInventoryFull() {
	return Inventory.match(/-/g).length >= 50;
}

function getBeastPosition(text) {
	if (!text) {
		text = getChatText().join(" ");
	}
	var awakePattern = /awoken[\w ]+beast[a-zA-Z ]+(\d+),\w+,(\d+)/;

	var match = text.match(awakePattern);
	return {
		x: match[1],
		y: match[2]
	};
}

//page object

function setTarget(text) {
	selectOptionByText(selectors.target, text);
	// updatetarget(g.action.value, this.options[this.selectedIndex].value, g);
}

function setAction(text) {
	selectOptionByText(selectors.actionsSelect, text);
	// parent.frames[0].window.updateaction(this.options[this.selectedIndex].value,document.getElementById('general'));
}

function setOther(text) {
	selectOptionByText(selectors.other, text);
}

function clickActionSubmit() {
	clickMainFrameElement(selectors.actionSubmit);
}

function clickDur() {
	parent.frames[0].window.level(3);
	// clickMainFrameElement(selectors.durButton);
}

function clickCast() {
	parent.frames[0].window.gattack("cast");
	// clickMainFrameElement(selectors.castButton);
}

function clickRevive() {
	parent.frames[0].window.revive();
	// clickMainFrameElement(selectors.reviveButton);
}

function clickMainFrameElement(selector) {
	getMainFrameElement(selector).click();
}

function getMainFrameElement(selector) {
	return getMainFrame().querySelector(selector);
}

function isMainFrameElementPresent(selector) {
	return !!getMainFrame().querySelector(selector);
}

function getMainFrame() {
	var mainFrame = document.querySelector(selectors.mainFrame);
	if (!mainFrame) {
		mainFrame = window.parent.document.querySelector(selectors.mainFrame);
	}
	if (!mainFrame) {
		throw ("cant find main frame");
	}
	if (mainFrame.contentWindow.document) {
		mainFrame = mainFrame.contentWindow.document;
	} else {
		mainFrame = mainFrame.contentDocument;
	}
	return mainFrame;
}

function selectOptionByText(selector, text) {
	var select = document.querySelector(selector);
	if (!select) {
		select = getMainFrameElement(selector);
	}

	select.value = getOptionValueByText(selector, text);

	if (document.createEvent) {
		var evt = document.createEvent("HTMLEvents");
		evt.initEvent("change", false, true);
		select.dispatchEvent(evt);
	} else {
		select.fireEvent("onchange");
	}

}

function getOptionValueByText(selector, text) {
	var returnMe = null;
	var select = document.querySelector(selector);
	if (!select) {
		select = getMainFrameElement(selector);
	}
	var options = select.querySelectorAll("option");

	for (var i = 0; i < options.length; i++) {
		if (options[i].textContent.indexOf(text) > -1) {
			returnMe = options[i].value;
			break;
		}
	}
	if (!returnMe) {
		console.log(select, text);
		throw ("option not found");
	}
	return returnMe;
}

//actions
function revive() {
	return new Promise(function (resolve, reject) {
		clickRevive();

		setTimeout(function () {
			resolve();
		}, getDelay(standardDelay / 2));
	});
}

function train() {
	return new Promise(function (resolve, reject) {
		clickDur();
		setTimeout(function () {
			resolve();
		}, getDelay(standardDelay / 2));
	});
}

function destroyItem(name) {
	return new Promise(function (resolve, reject) {
		setAction("DESTROY");
		setTarget(getNextUnwantedItem());
		act();
		setTimeout(function () {
			resolve();
		}, getDelay(newFightDelay));
	});
}

function cast() {
	return new Promise(function (resolve, reject) {
		clickCast();
		setTimeout(function () {
			resolve();
		}, getDelay(rapidDelay / 2));
	});
}

function act() {
	return new Promise(function (resolve, reject) {
		clickActionSubmit();
		setTimeout(function () {
			resolve();
		}, getDelay(newFightDelay));
	});
}

function newFight() {
	return new Promise(function (resolve, reject) {
		setAction("New Fight");
		setTarget(getMainFrameElement("#selectMonster").value);
		clickActionSubmit();
		setTimeout(function () {
			resolve();
		}, getDelay(newFightDelay));
	});
}

function craft(type, item) {
	console.log("craft", item);
	return new Promise(function (resolve, reject) {
		var selectCraftable = getMainFrameElement("#selectCraftable");
		setAction("Craft");
		setTimeout(function () {
			setTarget(type);
			setTimeout(function () {
				setOther(item);
				act();
				setTimeout(function () {
					if (isTrivial()) {
						selectCraftable.selectedIndex += 1;
					}
					if (craftingFailed()) {
						reject();
					} else {
						resolve();
					}
				}, (newFightDelay * 2) * (1 + 4 * selectCraftable.selectedIndex / selectCraftable.options.length));
			}, 300);
		}, 1000);
	});
}

function sell(item) {
	console.log("sell");
	return new Promise(function (resolve, reject) {
		setAction("Sell");
		setTarget(item);
		act();
		setTimeout(function () {
			resolve();
		}, newFightDelay * 2);
	});
}

function beastHandler() {
	console.log("beastHandler");
	return new Promise(function (resolve, reject) {
		var p = getBeastPosition();
		warpToBeast();
		setTimeout(function () {
			move(p.x, p.y);
		}, standardDelay);

		setTimeout(function () {
			setAction("Battle");
			setTarget("Beast");
			setTimeout(function () {
				resolve();
			}, getDelay(standardDelay / 2));
			// resolve();
			// setupGrindLoop(standardDelay));
		}, standardDelay);
	});
}

function move(x, y) {
	x = parseInt(x, 10);
	y = parseInt(y, 10);
	console.log("move", x, y);
	// var ntl = parseInt(document.querySelector("#s_Ntl").textContent),
	var limit = Math.floor(Math.sqrt(parseInt(Ntl, 10) / 100)) - 1;
	if (isNaN(limit)) {
		throw ("no nan");
	}
	var loc = scrapeLocation();

	if (((loc.x !== x) || (loc.y !== y)) && !cancelMove) {
		promise.then(function (resolve, reject) {
			return new Promise(function (resolve, reject) {
				console.log("move loop", loc.x, loc.y);

				var point = calculateWarpPoint(limit, loc, {
						x: x,
						y: y
					});

				console.log("moving to ", point);

				getMainFrameElement(selectors.actionsSelect).value = "tele";
				parent.frames[0].window.updateaction("tele", getMainFrameElement('#general'));
				setTimeout(function () {

					getMainFrameElement(selectors.target).value = point.x;
					getMainFrameElement(selectors.other).value = point.y;
					// document.querySelector("select[name=\"target\"]").value = x;
					// document.querySelector("select[name=\"other\"]").value = y;
					getMainFrameElement(selectors.actionSubmit).click();

					setTimeout(function () {
						resolve();
						move(x, y);
					}, 6000);

				}, 300);
			});
		});
	}
}

function warpToBeast() {
	var sf = top.frames.main.document.getElementById("skipform");
	sf.action.value = "chat";
	sf.target.value = "/bnb";
	sf.other.value = 0;
	pollzero(sf, 0, true);
}

function logBody() {
	console.log(document.body.outerHTML);
}


/* function grind() {
	if (isInventoryFull()) {
		return destroyItem();
	} else if (isMainFrameElementPresent(selectors.castButton)) {
		return cast();
	} else if (isMainFrameElementPresent(selectors.actionSubmit)) {
		return newFight();
	} else {
		return promise.then(function () {
			return new Promise(function (resolve, reject) {
				resolve();
			});
		});
	}
}
 */

//promise loops
function craftAndSell() {
	var type = getMainFrameElement("#selectCraftType").value;
	var item = getMainFrameElement("#selectCraftable").value;
	return craft(type, item).then(function () {
		return new Promise(function (resolve, reject) {
			return sell(item).then(function () {
				resolve();
			});
		});
	});
}

function setupGrindLoop() {
	setupLoop(newFight);
}

function setupCraftLoop() {
	setupLoop(craftAndSell);
}

function setupLoop(callback) {
	setTimeout(function () {
		checkInterrupts(callback)()
		.then(function () {
			if (!done) {
				setupLoop(callback);
			}
		}, function () {
			if (!done) {
				setupLoop(callback);
			}
		});
	}, getLoopDelayValue());
}

//logic branching

function wantItem(text) {

	if (!text) {
		text = getChatText().join(" ");
	}

	var found = false;

	var wantThese = [
		"Believer",
		"Cara",
		"Spike",
		"Decay",
		"Vice",
		"Apex",
		"Scorn",
		"Revenge",
		"Melee",
		"Devil"
	];

	wantThese.forEach(function (x) {
		if (text.indexOf(x) > -1) {
			found = true;
		}
	});

	return found;
}

function getNextUnwantedItem() {
	var select = document.querySelector(selectors.target);
	if (!select) {
		select = getMainFrameElement(selectors.target);
	}
	var options = select.querySelectorAll("option");

	for (var i = 0; i < options.length; i++) {
		var isEquipped = options[i].textContent.match(/EQUIPPED/) !== null;
		var isDivider = options[i].textContent.match(/_/) !== null;
		var wanted = wantItem(options[i].textContent);

		if (!isEquipped && !wanted && !isDivider) {
			return options[i].textContent;
		}
	}

	return null;
}

function isTrivial(text) {
	var chatText = getChatText();
	if (!text) {
		text = chatText[0] + chatText[1];
	}
	return text.indexOf("trivial") > -1;
}

function craftingFailed() {
	return getResponseMessage()
	.indexOf("failed") > -1;
}

function checkInterrupts(callback) {
	var returnMe;
	if (isMainFrameElementPresent(selectors.security)) {
		done = true;
		alert("security");
	}
	//if dead revive
	else if (isMainFrameElementPresent(selectors.reviveButton)) {

		returnMe = function () {
			setTimeout(function () {
				return revive();
			}, reviveDelay);
		};
	}
	//if level up buttons
	else if (isMainFrameElementPresent(selectors.durButton)) {
		returnMe = train;
	} else if (isBeastActive()) {
		done = true;
		returnMe = beastHandler;
	} else {
		returnMe = callback;
	}
	return returnMe;
}

function calculateWarpPoint(limit, start, end) {
	console.log("calculateWarpPoint", limit, start, end);

	var d = calculateManhattanDistance(start, end);
	return {
		x: Math.floor(lerp(start.x, end.x, constrain(limit / d, 0, 1))),
		y: Math.floor(lerp(start.y, end.y, constrain(limit / d, 0, 1)))
	};

}

function constrain(value, min, max) {
	var returnMe;
	if (value > max) {
		returnMe = max;
	} else if (value < min) {
		returnMe = min;
	}

	return returnMe;
}

function calculateNtlCost(distance) {
	return distance * distance * 100;
}

function calculateManhattanDistance(a, b) {
	return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

function scrapeLocation() {
	var returnMe = {
		x: parseInt(window.LocX, 10),
		y: parseInt(window.LocY, 10)
	};
	return returnMe;
}

function getVector(a, b) {
	var returnMe;
	if (a > b) {
		returnMe = -1;
	} else if (a < b) {
		returnMe = 1;
	} else {
		returnMe = 0;
	}
	return returnMe;
}

function lerp(v0, v1, t) {
	return v0 * (1 - t) + v1 * t
}

//delay handler
function getLoopDelayValue() {
	var returnMe;

	if (DisBar) {
		returnMe = 0;
	} else {
		returnMe = top.ActionDelay;
	}
	return returnMe;
}

function getDelay(value) {
	var returnMe = value;
	if (isApex) {
		returnMe *= 2;
	}
	returnMe *= 1 - (haste / 200);
	return returnMe;
}

//UI setup
function moveHandler() {
	cancelMove = false;
	var x = prompt("enter target x");
	var y = prompt("enter target y");
	move(x, y);
	this.onclick = cancelMoveHandler;
	this.textContent = "cancel Move";
}

function cancelMoveHandler() {
	cancelMove = true;
	this.onclick = moveHandler;
	this.textContent = "move";
}

function stopGrindingHandler() {
	done = true;
	this.onclick = startGrindingHandler;
	this.textContent = "Grind";
}

function startGrindingHandler() {
	done = false;
	this.onclick = stopGrindingHandler;
	this.textContent = "Stop Grinding";
	// setAction("New Fight");
	// setTarget(getMainFrameElement("#selectMonster").value);
	setupGrindLoop();
}

function stopCraftingHandler() {
	done = true;
	this.textContent = "Craft";
	this.onclick = startCraftingHandler;
}

function startCraftingHandler() {
	done = false;
	this.textContent = "Stop Crafting";
	this.onclick = stopCraftingHandler;
	setupCraftLoop();
}

function createButton(id, text, handler) {
	var returnMe = document.createElement("button");
	returnMe.id = id;
	returnMe.textContent = text;
	returnMe.onclick = handler;
	return returnMe;
}

function createGrindButton() {
	return createButton("btnGrind", "Grind", startGrindingHandler);
}

function createCraftButton() {
	return createButton("btnCraft", "Craft", startCraftingHandler);
}

function createMoveButton() {
	return createButton("btnMove", "Move", moveHandler);
}

function createWeaponSelect() {
	return createSelect("selectWeapon", window.frames[0].window.top.weapons);
}

function createArmourSelect() {
	return createSelect("selectArmour", window.frames[0].window.top.multi);
}

function createRelicSelect() {
	return createSelect("selectRelic", window.frames[0].window.top.relics);
}

function createCraftTypeSelect() {
	var returnMe = createSelect("selectCraftType", [
				"Weapon", "Helmet", "Shield", "Gauntlets", "Mantle", "Sleeves", "Damage Spell", "Leggings", "Boots", "Heal Spell", "Relic", "Bow", "Arrow", "Light Weapons", "Heavy Weapons", "Precise Weapons", "Rapid Damage Spells", "Major Damage Spells", "Accurate Damage Spells", "Durability Helmets", "Durability Shields", "Durability Gauntlets", "Durability Mantles", "Durability Sleeves", "Durability Leggings", "Durability Boots", "Essence Elements"
			]);
	returnMe.onchange = function () {
		setOptions(getMainFrameElement("#selectCraftable"), getCraftTypeList(this.value));
	};
	return returnMe;
}

function getCraftTypeList(type) {
	var returnMe;
	if (type.indexOf("Weapon") > -1) {
		returnMe = window.frames[0].window.top.weapons;
	} else if (type.indexOf("Damage") > -1) {
		returnMe = window.frames[0].window.top.hurts;
	} else if (type.indexOf("Heal") > -1) {
		returnMe = window.frames[0].window.top.heals;
	} else if (type.indexOf("Relic") > -1) {
		returnMe = window.frames[0].window.top.relics;
	} else if (type.indexOf("Element") > -1) {
		returnMe = window.frames[0].window.top.elements;
	} else {
		returnMe = window.frames[0].window.top.multi;
	}
	return returnMe;
}

function setOptions(select, options) {
	select.options.length = 0;

	options.forEach(function (x) {
		var option = document.createElement("option");
		option.value = x;
		option.textContent = x;
		select.add(option);
	});

	// return select;
}

function createCraftSelect() {
	return createSelect("selectCraftable", []);
}

function createMonsterSelect() {
	return createSelect("selectMonster", window.frames[0].window.top.clista);
}

function createSelect(id, options) {
	var returnMe = document.createElement("select");
	returnMe.id = id;

	setOptions(returnMe, options);

	return returnMe;
}

	var center = getMainFrame().querySelector("center");
	var div = document.createElement("div");

	center.insertAdjacentElement("afterend", div);

	div.appendChild(createGrindButton());
	div.appendChild(createMonsterSelect());
	div.appendChild(createCraftButton());
	div.appendChild(createCraftTypeSelect());
	div.appendChild(createCraftSelect());
	div.appendChild(createMoveButton());

	center.style.display = "none";

	setTarget("Sheaf");
	setOptions(getMainFrameElement("#selectCraftable"), getCraftTypeList(getMainFrameElement("#selectCraftType").value));
	selectOptionByText("#selectCraftable", "Rusty Dagger")
	getMainFrameElement(selectors.actionDelay).style = "display: none";
