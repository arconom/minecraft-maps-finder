
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
	chat: "#s_Chat",
	chatSubmit: "#s_chatbut",
	chatBox: "#chattybox",
	kingdomTable: "body > table > tbody > tr:nth-child(2) > td > table",
	playerTable: "body > table > tbody > tr:nth-child(1) > td:nth-child(1) > table",
	windowTable: "#s_Window > table"

};

NodeList.prototype.forEach = Array.prototype.forEach;
NodeList.prototype.map = Array.prototype.map;

var rwkState = getRWKState();
//state observers
function getRWKState() {
	return {
		isReviveNeeded: isMainFrameElementPresent(selectors.reviveButton),
		isBeastActive: isBeastActive(),
		isTrainingNeeded: isMainFrameElementPresent(selectors.durButton),
		isTreasuryFull: false,
		isKingdomOwnedByMe: false,
		isWalletFull: parseInt(Tres, 10) === 2000000000,
		isTimedOut: getResponseMessage().indexOf("timed out") > -1,
		enemyNotFound: getResponseMessage().indexOf("Enemy not found") > -1,
		isInventoryFull: isInventoryFull(),
		isSecurityResponseNeeded: isMainFrameElementPresent(selectors.security),
		isFightInProgress: isMainFrameElementPresent(selectors.castButton)
	};
}

function getResponseMessage() {
	var element = getMainFrameElement(selectors.response);
	if (element) {
		return element.textContent;
	} else {
		return "";
	}
}

function getChatBox() {
	var returnMe = document.querySelector(selectors.chatBox);
	if (!returnMe) {
		returnMe = getMainFrameElement(selectors.chatBox);
	}
	return returnMe;
}

function clickChatSubmit() {
	var returnMe = document.querySelector(selectors.chatSubmit);
	if (!returnMe) {
		returnMe = getMainFrameElement(selectors.chatSubmit);
	}
	return returnMe;
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

	return (awakeIndex > -1)
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
function waitForDOM(context, selector, testCallback, doneCallback, endTime) {
	var element,
	testResult = null;

	if (!context) {
		context = document;
	}
	if (!testCallback) {
		testCallback = function (context, selector, element) {
			return element ? true : false;
		};
	}
	if (!endTime) {
		endTime = new Date();
		endTime = endTime.setSeconds(endTime.getSeconds() + 15);
	}

	element = context.querySelector(selector);
	testResult = testCallback(context, selector, element);

	if (testResult) {
		return doneCallback(testResult);
	} else if (Date.now() <= endTime) {
		setTimeout(function () {
			return waitForDOM(context, selector, testCallback, doneCallback, endTime);
		}, 100);
	} else {
		return null;
	}
}

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

	var mainFrame = getElement(selectors.mainFrame);

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
	var select = getElement(selector);

	select.value = getOptionValueByText(selector, text);
	triggerChange(select);
}

function getElement(selector) {
	var element = document.querySelector(selector);
	if (!element) {
		element = getMainFrameElement(selector);
	}

	return element;
}

function selectOptionByValue(selector, value) {
	var select = getElement(selector);

	select.value = value;
	triggerChange(select);
}

function triggerChange(element) {
	if (document.createEvent) {
		var evt = document.createEvent("HTMLEvents");
		evt.initEvent("change", false, true);
		element.dispatchEvent(evt);
	} else {
		element.fireEvent("onchange");
	}
}
function getOptionValueByText(selector, text) {
	var returnMe = null;
	var select = getElement(selector);
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

function getOptions(selector) {
	var select = getElement(selector);
	return select.querySelectorAll("option");
}

//actions
function say(text) {

	console.log("say");
	return resolveAction(function () {
		getChatBox().value = text;
		getChatSubmit.click();
	},
		getDelay(newFightDelay), selectors.actionSubmit);

}

function resolveAction(callback, delay, selector, doneCallback) {
	if (!selector) {
		selector = selectors.response;
	}
	if (!doneCallback) {
		doneCallback = function () {};
	}
	return new Promise(function (resolve, reject) {
		var response = getResponseMessage();
		callback();
		waitForDOM(getMainFrame(), selector, function () {
			var r = getResponseMessage();
			return r === "" || r !== response;
		}, function () {
			rwkState = getRWKState();
			doneCallback();
			setTimeout(function () {
				resolve();
			}, delay);
		}, null);
	});
}

function revive() {
	console.log("revive");
	return resolveAction(function () {
		clickRevive();
	}, getDelay(standardDelay / 2), selectors.actionSubmit);
}

function train() {
	console.log("train");
	return resolveAction(function () {
		clickDur();
	}, getDelay(standardDelay / 2), selectors.actionSubmit);
}

function destroyItem(name) {
	console.log("destroy");
	setAction("DESTROY");
	selectOptionByValue(selectors.target, getNextUnwantedItem());
	return resolveAction(function () {
		clickActionSubmit();
	}, getDelay(newFightDelay), null);
}

function cast() {
	console.log("cast");
	return resolveAction(function () {
		clickCast();
	},
		getDelay(rapidDelay));
}

function act(selector) {
	return resolveAction(function () {
		clickActionSubmit();
	}, getDelay(newFightDelay), selector);
}

function newFight() {
	console.log("new fight");
	setAction("New Fight");
	setTarget(getMainFrameElement("#selectMonster").value);
	return resolveAction(function () {
		clickActionSubmit();
	}, getDelay(newFightDelay), selectors.castButton);
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
				resolveAction(function () {
					clickActionSubmit();
				}, (newFightDelay * 2) * (1 + 4 * selectCraftable.selectedIndex / selectCraftable.options.length), null, function () {
					if (isTrivial()) {
						selectCraftable.selectedIndex += 1;
					}
					if (craftingFailed()) {
						reject();
					} else {
						resolve();
					}
				}, 1000);
			}, 300);
		}, 300);
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
		warpToBeast();

		setAction("Battle");
		setTarget("Beast");
		setTimeout(function () {
			resolve();
		}, getDelay(standardDelay / 2));
	});
}

function move(x, y) {
	x = parseInt(x, 10);
	y = parseInt(y, 10);
	console.log("move", x, y);
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

function grind() {
	var returnMe;
	if (rwkState.isInventoryFull) {
		returnMe = destroyItem();
	} else if (rwkState.isFightInProgress) {
		returnMe = cast();
	} else if (isMainFrameElementPresent(selectors.actionSubmit)) {
		returnMe = newFight();
	} else {
		returnMe = promise.then(function () {
				return new Promise(function (resolve, reject) {
					resolve();
				});
			});
	}
	return returnMe;
}

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
	setupLoop(grind);
}

function setupCraftLoop() {
	setupLoop(craftAndSell);
}

function setupLoop(callback) {
	rwkState = getRWKState();
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
		"Devil",
		"Voidance",
		"Demon Horn",
		"Angel Hair",
		"Temple Stone",
		"Enduring Fists",
		"Sharpening Stone",
		"Dwarven Weaponcraft Guide",
		"Balace Armorcraft Guide",
		"Sylvain Fletcher`s Workbook",
		"Solon`s Arcane Booklet",
		"Mesmer`s Book of Mythics",
		"Theurgal Rune Staff",
		"Beast Noobane",
		"Attacker`s Balance",
		"Captain`s Staff of Valor",
		"Scepter of Specter Sight",
		"Black Ashen Rock"
	];

	wantThese.forEach(function (x) {
		if (text.indexOf(x) > -1) {
			found = true;
		}
	});

	return found;
}

function getApexStatus() {
	setAction("Equip");
	var returnMe = false;
	setTimeout(function () {
		var options = getOptions(selectors.target);
		options.forEach(function (option) {
			if (option.textContent.indexOf("Apex") > -1 && option.textContent.indexOf("EQUIPPED") > -1) {
				returnMe = true;
			}
		});
	});
	return returnMe;
}

function getNextUnwantedItem() {
	var select = document.querySelector(selectors.target);
	if (!select) {
		select = getMainFrameElement(selectors.target);
	}
	var options = select.querySelectorAll("option");

	for (var i = 0; i < options.length; i++) {
		var isEquipped = options[i].textContent.indexOf("EQUIPPED") > -1;
		var isDivider = options[i].textContent.indexOf("_") > -1;
		var wanted = wantItem(options[i].textContent);

		if (!isEquipped && !wanted && !isDivider) {
			return options[i].value;
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
	if (rwkState.isSecurityResponseNeeded) {
		done = true;
		alert("security");
	}
	//if dead revive
	else if (rwkState.isReviveNeeded) {

		returnMe = function () {
			setTimeout(function () {
				return revive();
			}, reviveDelay);
		};
	}
	//if level up buttons
	else if (rwkState.isTrainingNeeded) {
		returnMe = train;
	} else if (rwkState.isBeastActive) {
		done = true;
		returnMe = beastHandler;
	} else if (rwkState.isInventoryFull) {
		// done = true;
		returnMe = destroyItem;
	}
	/* else if (rwkState.isFightInProgress) {
	return cast();
	} */
	else {
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
	var returnMe = value;
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
	return v0 * (1 - t) + v1 * t;
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
	isApex = getApexStatus();
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
	isApex = getApexStatus();
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

setOptions(getMainFrameElement("#selectCraftable"), getCraftTypeList(getMainFrameElement("#selectCraftType").value));
selectOptionByText("#selectCraftable", "Rusty Dagger");
getMainFrameElement(selectors.actionDelay).style = "display: none";

