


// gattack("attack");
// gattack("lattack");
// gattack("rattack");
// gattack("defend");
var promise = new Promise(function (resolve, reject) {
		resolve();
	});

var isApex = true;
var haste = 58;
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

var cssString = "button{padding: 8px; border-radius: .5em; font-size: larger;}"
	 + " select{padding: 8px; font-size: larger;}"
	 + " body > table > tbody > tr:nth-child(2) > td > table.hideDetails > tbody > tr:nth-child(4)"
	 + ", body > table > tbody > tr:nth-child(2) > td > table.hideDetails > tbody > tr:nth-child(5)"
	 + ", body > table > tbody > tr:nth-child(2) > td > table.hideDetails > tbody > tr:nth-child(6)"
	 + ", body > table > tbody > tr:nth-child(2) > td > table.hideDetails > tbody > tr:nth-child(7){display: none;}"
	 + " body > table > tbody > tr:nth-child(2) > td > table td[width]{display: block;}"
	 + " body > table > tbody > tr:nth-child(1), body > table > tbody > tr:nth-child(2){display: inline-block;}"
	 + " body > table > tbody > tr:nth-child(1) > td:nth-child(1) > table,body > table > tbody > tr:nth-child(2) > td > table{display: inline-table; width: 10em;}"
	 + " body > table > tbody > tr:nth-child(2) > td > table{float: left;}"
	 + " body > table > tbody > tr:nth-child(1) > td:nth-child(1) > table td[width]{display: block;}"
	 + " td[background]{display:none;}"
	 + " body > table > tbody > tr:nth-child(1) > td:nth-child(1) > table tr:nth-child(1)"
	 + ", body > table > tbody > tr:nth-child(1) > td:nth-child(1) > table tr:nth-child(5)"
	 + ", body > table > tbody > tr:nth-child(2) > td > table tr:nth-child(1)"
	 + ", body > table > tbody > tr:nth-child(2) > td > table tr:nth-child(8){display: none;}"
	 + ", #s_Chat{width: 70vw;}"
	 + "body > table > tbody > tr:nth-child(4) > td > table, body > table > tbody > tr:nth-child(3) > td > table{width: 40em;}"
	 + "body > table > tbody > tr:nth-child(5) > td > table{display: none;}"
	 + "body > table > tbody > tr:nth-child(2), body > table > tbody > tr:nth-child(2) > td{display: inline;}";

var selectors = {
	actionDelay: "#s_ActionDelay",
	actionsSelect: "select[name=\"action\"]",
	kingdomActionsSelect: "body > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(3) > td > select:nth-child(2)",
	travelOption: "option[value=\"tele\"]",
	actionSubmit: "#s_subbut > input[type=\"image\"]",
	kingdomActionSubmit: "#s_subbut2 > input",
	fightButtons: "#s_FightWin",
	castButton: "#s_FightWin > img:nth-child(2)",
	durButton: "img[onmousedown=\"level(3)\"]",
	reviveButton: "img[onmousedown=\"revive()\"]",
	response: "#s_Response",
	security: "#s_Response img",
	mainFrame: "frame[name=\"main\"]",
	target: "select[name=\"target\"]",
	other: "select[name=\"other\"]",
	othera: "select[name=\"othera\"]",
	kingdomOtherA: "body > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(3) > td > input[type=\"text\"]",
	chat: "#s_Chat",
	chatSubmit: "#s_chatbut > input",
	chatBox: "#chattybox",
	kingdomTable: "body > table > tbody > tr:nth-child(2) > td > table",
	playerTable: "body > table > tbody > tr:nth-child(1) > td:nth-child(1) > table",
	windowTable: "#s_Window > table"

};

NodeList.prototype.forEach = Array.prototype.forEach;
NodeList.prototype.map = Array.prototype.map;

var rwkState;
// = getRWKState();
//state observers
function getRWKState() {
	return {
		isReviveNeeded: isMainFrameElementPresent(selectors.reviveButton),
		isBeastActive: isBeastActive(),
		isTrainingNeeded: isMainFrameElementPresent(selectors.durButton),
		isTreasuryFull: parseInt(Tres, 10) === 2000000000,
		isKingdomOwnedByMe: King == "Grelgor",
		isWalletFull: parseInt(Gold, 10) === 2000000000,
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
	 && ((deadIndex == -1)
		 || (deadIndex > awakeIndex));
}

function isInventoryFull() {
	return Inventory.match(/-/g).length >= 50;
}

function getBeastPosition(text) {
	if (!text) {
		text = getChatText().join(" ");
	}
	var awakePattern = /awoken[\w ]+beast[a-zA-Z ]+(\d+),(\w+),(\d+)/;

	var match = text.match(awakePattern);
	return {
		x: match[1],
		y: match[3],
		plane: match[2]
	};
}

//page object


function clickLogin() {
	getMainFrameElement("#subshit").click();
}

function setPassword(value) {
	getMainFrameElement("body > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(5) > td > input[type=\"password\"]:nth-child(6)").value = value;
}

function waitForDOM(context, selector, testCallback, doneCallback, failCallback, endTime) {
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
		endTime = endTime.setSeconds(endTime.getSeconds() + 10);
	}

	element = context.querySelector(selector);
	testResult = testCallback(context, selector, element);

	if (testResult) {
		return doneCallback(testResult);
	} else if (Date.now() <= endTime) {
		setTimeout(function () {
			return waitForDOM(context, selector, testCallback, doneCallback, failCallback, endTime);
		}, 100);
	} else {
		return failCallback();
	}
}

function setTarget(text) {
	return selectOptionByText(selectors.target, text);
	// updatetarget(g.action.value, this.options[this.selectedIndex].value, g);
}

function setAction(text) {
	return selectOptionByText(selectors.actionsSelect, text);
	// parent.frames[0].window.updateaction(this.options[this.selectedIndex].value,document.getElementById('general'));
}

function setKingdomAction(text) {
	return selectOptionByText(selectors.kingdomActionsSelect, text);
}

function setOther(text) {
	return selectOptionByText(selectors.other, text);
}

function setOtherA(value) {
	getMainFrameElement(selectors.othera).value = value;
}

function setKingdomOtherA(value) {
	getMainFrameElement(selectors.kingdomOtherA).value = value;
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

function getMainFrameElements(selector) {
	return getMainFrame().querySelectorAll(selector);
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
	var beforeHTML = select.parentElement.parentElement.outerHTML;
	var val = getOptionValueByText(selector, text)
		var skipTest = select.value === val;
	select.value = val;

	triggerChange(select);

	return new Promise(function (resolve, reject) {
		waitForDOM(select.parentElement, selector, function () {
			return (skipTest || beforeHTML !== select.parentElement.parentElement.outerHTML);
		}, function () {
			resolve();
		}, function () {
			reject();
		}, null);
	});
}

function getElement(selector) {
	var element = document.querySelector(selector);
	if (!element) {
		element = getMainFrameElement(selector);
	}

	return element;
}

function selectOptionByValue(selector, value, skip) {
	var select = getElement(selector);
	var beforeHTML = select.parentElement.parentElement.outerHTML;
	var skipTest = select.value === value;
	select.value = value;
	triggerChange(select);

	return new Promise(function (resolve, reject) {
		waitForDOM(select.parentElement, selector, function () {
			return skip || skipTest || beforeHTML !== select.parentElement.parentElement.outerHTML;
		}, function () {
			resolve();
		}, function () {
			reject();
		}, null);
	});
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
		returnMe = "";
	}
	return returnMe;
}

function getOptions(selector) {
	var select = getElement(selector);
	return select.querySelectorAll("option");
}

function clickKingdomActionSubmit() {
	getElement(selectors.kingdomActionSubmit).click();
}

function clickChatSubmit() {
	getElement(selectors.chatSubmit).click();
}

//actions

function move(dir) {
	console.log("move");
	return resolveAction(function () {
		window.frames[0].Move(dir);
	}, getDelay(newFightDelay * 2), selectors.actionSubmit);
}

function moveNorth() {
	console.log("moveNorth");
	return move(0);
}

function moveSouth() {
	console.log("moveSouth");
	return move(1);
}

function moveEast() {
	console.log("moveEast");
	return move(2);
}

function moveWest() {
	console.log("moveWest");
	return move(3);
}

function moveUp() {
	console.log("moveUp");
	return move(4);
}

function moveDown() {
	console.log("moveDown");
	return move(5);
}

function say(text) {
	console.log("say");
	return resolveAction(function () {
		getChatBox().value = text;
		clickChatSubmit();
	}, getDelay(newFightDelay), selectors.actionSubmit);
}

function submitGeneralAction() {
	pollzero(top.frames.main.document.getElementById("general"), 0, true);
}

function submitKingdomAction() {
	pollzero(top.frames.main.document.getElementById("king"), 0, true);
}

function resolveAction(callback, delay, selector) {
	console.log("resolveAction");
	if (!selector) {
		selector = selectors.response;
	}
	return new Promise(function (resolve, reject) {
		var response = getResponseMessage();
		var chat = getChat().outerHTML;
		callback();
		waitForDOM(getMainFrame(), selector, function (context, selector, element) {
			if (element) {
				var r = getResponseMessage();
				var c = getChat().outerHTML;
				return r === "" || r !== response || c !== chat;
			} else {
				return false;
			}
		}, function () {
			rwkState = getRWKState();
			updateInfo();
			var r = getResponseMessage();
			var c = getChat().outerHTML;
			if ((r.indexOf("purchase") > -1)
				 || (c.indexOf("depleted") > -1)
				 || (c.indexOf("timeout") > -1)) {
				setTimeout(function () {
					reject();
				}, delay);
			} else {
				setTimeout(function () {
					resolve();
				}, delay);
			}
		}, function () {
			rwkState = getRWKState();
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
	return selectOptionByValue(selectors.target, getNextUnwantedItem(), true)
	.then(function () {
		return resolveAction(function () {
			clickActionSubmit();
		}, getDelay(newFightDelay), selectors.response);
	});
}

function cast() {
	console.log("cast");
	return resolveAction(function () {
		clickCast();
	}, getDelay(rapidDelay), selectors.response);
}


function newFight() {
	console.log("new fight");

	return new Promise(function (resolve, reject) {
		var sf = top.frames.main.document.getElementById("skipform");

		if (top.lastfought >= 0) {
			sf.action.value = "fight";
			sf.target.value = top.lastfought;
			window.frames[0].pollzero(sf, 0, true);
		} else {
			reject();
		}
		setTimeout(function () {
			resolve();
		}, getDelay(newFightDelay));
	});
}

/* 
function newFight() {
	console.log("new fight");
	return setAction("New Fight").then(function () {
		return setTarget(getMainFrameElement("#selectMonster").value)
		.then(function () {
			return resolveAction(function () {
				clickActionSubmit();
			}, getDelay(newFightDelay), selectors.castButton);
		});
	});
}
*/

function craft(type, item) {
	console.log("craft", item);
	var selectCraftable = getMainFrameElement("#selectCraftable");
	return setAction("Craft")
	.then(function () {
		return setTarget(type)
		.then(function () {
			return setOther(item)
			.then(function () {
				return resolveAction(function () {
					clickActionSubmit();
				}, (newFightDelay * 2) * (1 + 4 * selectCraftable.selectedIndex / selectCraftable.options.length), null)
				.then(function () {
					if (isTrivial()) {
						selectCraftable.selectedIndex += 1;
					}
					if (craftingFailed()) {
						reject();
					} else {
						console.log("resolving craft");
						resolve();
					}
				});
			});
		});
	});
}

function sell(item) {
	console.log("sell");
	setAction("Sell");
	setTarget(item);
	clickActionSubmit();
	return resolveAction(function () {
		clickActionSubmit();
	}, (newFightDelay * 2));
}

function beastHandler() {
	console.log("beastHandler");
	return new Promise(function (resolve, reject) {
		warpToBeast()
		.then(function () {
			findBeast();
		});
	});
}

function findBeast() {
	console.log("findBeast");
	setAction("Battle");

	var dirs = [3, 0, 2, 2, 1, 1, 3, 3];
	var returnMe = null;
	var promiseChain = new Promise(function (resolve, reject) {
			if (isBeastHere()) {
				resolveAction(function () {
					clickActionSubmit();
				}, getDelay(rapidDelay), selectors.actionSubmit)
				.then(function () {
					console.log("resolving findBeast");
					resolve();
				});
			} else {
				reject();
			}
		});

	dirs.forEach(function (dir) {
		promiseChain = promiseChain.then(
				function () {
				return resolveAction(function () {
					clickActionSubmit();
				}, getDelay(rapidDelay), selectors.actionSubmit);
			},
				function () {
				console.log("findBeastRejectHandler");
				return new Promise(function (resolve, reject) {
					move(dir)
					.then(function () {
						if (isBeastHere()) {
							getElement(selectors.target).selectedIndex = 2;
							// setTarget("Beast");
							// act().then(function(){
							console.log("resolving findBeastRejectHandler");
							resolve();
							// });
						} else {
							reject();
						}
					}, function () {
						console.log("rejecting findbeast move");
						reject();
					});
				});
			});
	});
}

function isBeastHere() {
	console.log("isBeastHere");
	return getElement(selectors.target).querySelectorAll("option").length > 1;
}

function teleport(x, y) {
	// console.log("moving to ", point);
	setAction("Teleport");
	// parent.frames[0].window.updateaction("tele", getMainFrameElement('#general'));

	return new Promise(function (resolve, reject) {

		waitForDOM(window.frames[0].document, selectors.other, null, function () {

			getMainFrameElement(selectors.target).value = x;
			getMainFrameElement(selectors.other).value = y;

			resolveAction(function () {
				clickActionSubmit();
			}, getDelay(standardDelay), selectors.actionSubmit)
			.then(function () {
				if (getResponseMessage().indexOf("purchase") > -1) {
					reject();
				} else {
					console.log("resolving teleport", x, y);
					resolve();
				}
			}, function () {
				console.log("rejecting teleport", x, y);
				reject();
			});
		}, function () {}, null);
	});
}

function buyRune() {
	setKingdomAction("Runes");

	return new Promise(function (resolve, reject) {
		waitForDOM(window.frames[0].document, selectors.kingdomOtherA, null, function () {
			setKingdomOtherA("1");

			resolveAction(function () {
				clickKingdomActionSubmit();
			}, getDelay(newFightDelay), selectors.actionSubmit)
			.then(function () {
				console.log("resolving buy rune");
				resolve();
			});
		}, function () {}, null);
	});
}

function travel(x, y) {
	// console.log("travel", x, y);

	if (typeof x === "string") {
		x = parseInt(x, 10);
	}
	if (typeof y === "string") {
		y = parseInt(y, 10);
	}

	var limit = Math.floor(Math.sqrt(parseInt(Ntl, 10) / 100)) - 1;
	var loc = scrapeLocation();

	if (isNaN(limit)) {
		throw ("no nan");
	}

	if (((loc.x !== x) || (loc.y !== y)) && !cancelMove) {
		var point = calculateWarpPoint(limit, loc, {
				x: x,
				y: y
			});

		return teleport(point.x, point.y)
		.then(function () {
			return travel(x, y);
		});
	} else {
		console.log("resolving travel", x, y);
		return new Promise(function (resolve, reject) {
			resolve();
		});
	}
}

function walkKingdoms() {
	console.log("walkKingdoms");
	var kds = [{
			x: 157,
			y: 49,
			plane: "Sur"
		}, {
			x: 157,
			y: 48,
			plane: "Sur"
		}, {
			x: 157,
			y: 47,
			plane: "Sur"
		}
	];

	var promiseChain = new Promise(function (resolve, reject) {
			resolve();
		});

	kds.forEach(function (kd) {
		promiseChain = promiseChain
			.then(function () {
				return travel(kd.x, kd.y);
			});
		promiseChain = promiseChain
			.then(function () {
				if (/* window.frames[0]. */ parseInt(Tres, 10) >= 1990000000) {
					return embezzle();
				} else {
					return new Promise(function (resolve, reject) {
						resolve();
					});
				}
			});
		promiseChain = promiseChain
			.then(function () {
				if (/* window.frames[0]. */ parseInt(Gold, 10) > 1700000000) {
					return buyRune();
				} else {
					return new Promise(function (resolve, reject) {
						resolve();
					});
				}
			});
	});
}

function warpToBeast() {
	return new Promise(function (resolve, reject) {
		var sf = top.frames.main.document.getElementById("skipform");
		sf.action.value = "chat";
		sf.target.value = "/bnb";
		sf.other.value = 0;
		window.frames[0].pollzero(sf, 0, true);
		setTimeout(function () {
			resolve();
		}, getDelay(newFightDelay));
	}).then(function () {
		return new Promise(
			function (resolve, reject) {
			if (getResponseMessage().indexOf("You do not have the gear") > -1) {
				reject();
			} else {
				rwkState.hasWarped = true;
				resolve();
			}
		});
	}, function () {
		return new Promise(function (resolve, reject) {
			reject();
		});
	});
	// say("/bnb")
}

/* 
function warpToBeast() {
	say("/bnb")
	.then(function () {
		return new Promise(
			function (resolve, reject) {
			if (getResponseMessage().indexOf("You do not have the gear") > -1) {
				reject();
			} else {
				rwkState.hasWarped = true;
				resolve();
			}
		});
	}, function () {
		return Promise.reject();
	});
}
 */
function logBody() {
	console.log(document.body.outerHTML);
}

function grind() {
	var returnMe;
	if (rwkState.isFightInProgress) {
		returnMe = cast();
	} else if (isMainFrameElementPresent(selectors.actionSubmit)) {
		returnMe = newFight();
	} else {
		returnMe = Promise.resolve();
	}
	return returnMe;
}

function embezzle() {
	console.log("embezzle");
	setKingdomAction("Embezzle");
	setKingdomOtherA("254000000");
	return resolveAction(function () {
		clickKingdomActionSubmit();
	}, getDelay(newFightDelay), selectors.kingdomActionSubmit);
}

//promise loops
function craftAndSell() {
	var type = getMainFrameElement("#selectCraftType").value;
	var item = getMainFrameElement("#selectCraftable").value;
	return craft(type, item).then(function () {
		return new Promise(function (resolve, reject) {
			return sell(item);
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
		.catch(function (error) {
			console.log(error);
			throw (error);
		}).then(function () {
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
		"Element",
		"Enhanced Nock",
		"Annulment",
		"Believer",
		"Cara",
		"Death Spike",
		"Decay",
		"Vice",
		"Putrefaction",
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
	isApex = false;
	setAction("Equip");
	setTimeout(function () {
		getOptions(selectors.target).forEach(function (option) {
			if (option.textContent.indexOf("Apex") > -1
				 && option.textContent.indexOf("EQUIPPED") > -1) {
				isApex = true;
			}
		});
	});
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
		grindButton.onclick = startGrindingHandler;
		grindButton.textContent = "Grind";
		craftButton.onclick = startGrindingHandler;
		craftButton.textContent = "Craft";

		makeNoise();

		return new Promise(function (resolve, reject) {
			reject();
		});
		// alert("security");
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
	} else if (rwkState.isBeastActive && getBeastPosition().plane === "Sur") {
		done = true;
		grindButton.onclick = startGrindingHandler;
		grindButton.textContent = "Grind";
		craftButton.onclick = startGrindingHandler;
		craftButton.textContent = "Craft";
		makeNoise();
		returnMe = beastHandler;
	} else if (rwkState.isInventoryFull) {
		// done = true;
		returnMe = destroyItem;
		// } else if (rwkState.isKingdomOwnedByMe && rwkState.isTreasuryFull) {
		// returnMe = embezzle;
	} else {
		returnMe = callback;
	}
	return returnMe;
}

function makeNoise() {
	var context = new AudioContext();
	var o = context.createOscillator();
	o.type = "sine";
	o.connect(context.destination);
	o.start();
	setTimeout(function () {
		o.stop();
	}, 200);
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
	var returnMe = window.frames[0].top.ActionDelay;

	if (DisBar) {
		returnMe = 0;
	}

	return returnMe;
}

function getDelay(value) {
	var returnMe = value / 2;
	if (isApex) {
		returnMe *= 2;
	}
	returnMe *= 1 - (haste / 200);
	console.log("getDelay", returnMe);
	return returnMe;
}

//UI setup
function moveHandler() {
	getApexStatus();
	cancelMove = false;
	var x = prompt("enter target x");
	var y = prompt("enter target y");
	travel(x, y);
	this.onclick = cancelMoveHandler;
	this.textContent = "Cancel travel";
}

function travelHandler(x, y) {
	cancelMove = false;
	var button = getElement("#btnTravel");
	travel(x, y)
	.then(function () {
		button.textContent = "Travel";
	}, function () {});
	button.onclick = cancelTravelHandler;
	button.textContent = "Cancel travel";
}

function cancelTravelHandler() {
	cancelMove = true;
	var button = getElement("#btnTravel");
	button.onclick = moveHandler;
	button.textContent = "Travel";
}

function cancelMoveHandler() {
	cancelMove = true;
	this.onclick = moveHandler;
	this.textContent = "Travel";
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
	getApexStatus();
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
	getApexStatus();
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
	return createButton("btnTravel", "travel", moveHandler);
}

function createHomeButton() {
	return createButton("btnHome", "Home", function () {
		getApexStatus();
		travelHandler(157, 49);
	});
}

function createPubButton() {
	return createButton("btnPub", "Pub", function () {
		getApexStatus();
		travelHandler(pointsOfInterest.Pub.x, pointsOfInterest.Pub.y);
	});
}

function createMinesButton() {
	return createButton("btnMines", "Mines", function () {
		getApexStatus();
		travelHandler(pointsOfInterest.Mines.x, pointsOfInterest.Mines.y);
	});
}

function createWalkKingdomsButton() {
	return createButton("btnWalkKingdoms", "Walk Kingdoms", function () {
		getApexStatus();
		walkKingdoms();
	});
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

function AddStyleSheet(content) {
	//for cross browser compatibility, use the following commented statement
	//var cssRuleCode = document.all ? 'rules' : 'cssRules'; //account for IE and FF

	getMainFrame().querySelector("head").appendChild(this.CreateStyleSheet(content));
}

function updateInfo() {
	getMainFrameElement("#spLevel")
	.textContent = Level;
	getMainFrameElement("#spLoc")
	.textContent = Loc;
	getMainFrameElement("#spGold")
	.textContent = Gold;
	getMainFrameElement("#spDur")
	.textContent = Dur;
	getMainFrameElement("#spKing")
	.textContent = King;
	getMainFrameElement("#spRunes")
	.textContent = Runes;
	getMainFrameElement("#spTax")
	.textContent = Tax;
	getMainFrameElement("#spMorale")
	.textContent = Moral;
	getMainFrameElement("#spCash")
	.textContent = Tres;
	getMainFrameElement("#spPop")
	.textContent = Pop;
	getMainFrameElement("#spFood")
	.textContent = Food;
}

function getPlayerDiv() {
	var returnMe = document.createElement("div");
	var header = document.createElement("h3");
	header.textContent = "Player";

	returnMe.appendChild(header);

	returnMe.className = "player-info";
	[{
			id: "spLevel",
			label: "Level:",
			value: window.Level
		}, {
			id: "spLoc",
			label: "Loc:",
			value: window.Loc
		}, {
			id: "spGold",
			label: "Gold:",
			value: window.Gold
		}, {
			id: "spDur",
			label: "Dur:",
			value: window.Dur
		}
	].forEach(function (item) {
		returnMe.appendChild(getLineItem(item));
	});
	return returnMe;
}

function getKingdomDiv() {
	var returnMe = document.createElement("div");
	var header = document.createElement("h3");
	header.textContent = "Kingdom";

	returnMe.appendChild(header);

	returnMe.className = "kingdom-info";
	[{
			id: "spKing",
			label: "King:",
			value: window.King
		}, {
			id: "spRunes",
			label: "Runes:",
			value: window.Runes
		}, {
			id: "spCash",
			label: "Cash:",
			value: window.Tres
		}, {
			id: "spTax",
			label: "Tax:",
			value: window.Tax
		}, {
			id: "spMorale",
			label: "Morale:",
			value: window.Moral
		}, {
			id: "spPop",
			label: "Pop:",
			value: window.Pop
		}, {
			id: "spFood",
			label: "Food:",
			value: window.Food
		}
	].forEach(function (item) {
		returnMe.appendChild(getLineItem(item));
	});

	return returnMe;
}

function getLineItem(item) {
	var returnMe = document.createElement("div");
	var label = document.createElement("label");
	label.textContent = item.label;
	var span = document.createElement("span");
	span.id = item.id;
	span.textContent = item.value;
	returnMe.appendChild(label);
	returnMe.appendChild(span);
	return returnMe;
}
/*
This function creates a style sheet and returns it.
 */
function CreateStyleSheet(content) {
	var style = document.createElement("style");
	var styleSheet = style.styleSheet;

	if (styleSheet) {
		stylesheet.cssText = content;
	} else {
		style.appendChild(document.createTextNode(content));
	}

	style.type = "text/css";
	return style;
}

// because Tampermonkey doesn't do stylesheets
function setStyleAttributes() {
	getMainFrameElements(".info,#s_Window,.addedDiv")
	.forEach(function (x) {
		x.style.display = "inline-block";
	});

	getMainFrameElements(".kingdom-info,.player-info")
	.forEach(function (x) {
		x.style.backgroundColor = "black";
		x.style.border = "solid thin white";
		x.style.width = "15em";
	});

	var actionTable = getMainFrameElement("body > table > tbody > tr:nth-child(3) > td > table");
	actionTable.removeAttribute("width");
	actionTable.removeAttribute("cellspacing");
	actionTable.removeAttribute("cellpadding");
	actionTable.removeAttribute("bgcolor");
	actionTable.removeAttribute("border");
	actionTable.style = "";
	actionTable.style.height = "30em";
	actionTable.style.display = "30em";

	getMainFrameElements(".kingdom-info > div > span,.player-info > div > span")
	.forEach(function (x) {
		x.style.width = "10em";
		x.style.display = "inline-block";
	});
	getMainFrameElements(".kingdom-info > div > label,.player-info > div > label")
	.forEach(function (x) {
		x.style.width = "4em";
		x.style.color = "goldenrod";
		x.style.display = "inline-block";
	});
	getMainFrameElements("button")
	.forEach(function (x) {
		x.style += " padding: 8px; border-radius: .5em; font-size: larger;";
	});
	getMainFrameElements("select")
	.forEach(function (x) {
		x.style += " padding: 8px; font-size: larger; ";
	});

	getMainFrameElements("body > table > tbody > tr:nth-child(3) > td > table"
		 + ",body > table > tbody > tr:nth-child(4) > td > table")
	.forEach(function (x) {
		x.style.width = "30em";
	});

	getMainFrameElement("body > table > tbody > tr:nth-child(2) > td > table td[width]")
	.style.display = "block";

	getMainFrameElement("body > table > tbody > tr:nth-child(1) > td:nth-child(1) > table td[width]")
	.style.display = "block";

	getMainFrameElements("body > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(2) > td:nth-child(7) > select:nth-child(5)"
		 + ",body > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(2) > td:nth-child(7) > select:nth-child(7)")
	.forEach(function (x) {
		x.style.width = "20em";
	})

	getMainFrameElement(selectors.kingdomTable).className += " hideDetails";

	getMainFrameElements("td[background]"
		 + ",body > table > tbody > tr:nth-child(1)"
		 + ",body > table > tbody > tr:nth-child(1) > td:nth-child(1)"
		 + ",body > table > tbody > tr:nth-child(2)"
		 + ",body > table > tbody > tr:nth-child(2) > td > table"
		 + ",body > table > tbody > tr:nth-child(2) > td > center"
		 + ",body > table > tbody > tr:nth-child(5) > td > table"
		 + ",body > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(1)"
		 + ",body > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(6)"
		 + "," + selectors.actionDelay)
	.forEach(function (x) {
		x.style.display = "none";
	});

	getMainFrameElements("#s_Exp > table > tbody > tr > td:nth-child(2)"
		 + ",#s_Exp > table > tbody > tr > td:nth-child(3)"
		 + ",#s_LifeMeter > table > tbody > tr > td:nth-child(2)"
		 + ",#s_LifeMeter > table > tbody > tr > td:nth-child(3)")
	.forEach(function (x) {
		x.style.display = "block";
		x.style.display = "block";
		x.style.display = "block";
		x.style.display = "block";
	});

	getMainFrameElements("body > table > tbody > tr:nth-child(4) > td > table, body > table > tbody > tr:nth-child(3) > td > table")
	.forEach(function (x) {
		x.style.width = "20em";
	});

	getMainFrameElements("body > table > tbody > tr:nth-child(2), body > table > tbody > tr:nth-child(2) > td")
	.forEach(function (x) {
		x.style.display = "inline";
	});

	getMainFrameElements("#s_subbut > input[type=\"image\"]"
		 + ",#s_subbut2 > input[type=\"image\"]"
		 + ",#s_subbutNO > img"
		 + ",#s_subbut2NO > img")
	.forEach(function (x) {
		x.style.width = "200px";
		x.style.height = "60px";
	});

	getMainFrameElement("#s_Window").outerHTML = "";
}

function getInfoDiv() {
	var returnMe = document.createElement("div");
	returnMe.className = "info";
	returnMe.appendChild(getKingdomDiv());
	returnMe.appendChild(getPlayerDiv());
	return returnMe;
}

function getMoveDiv() {
	var returnMe = document.createElement("div");
	returnMe.appendChild(createMoveButton());
	returnMe.appendChild(createHomeButton());
	returnMe.appendChild(createPubButton());
	returnMe.appendChild(createMinesButton());
	returnMe.appendChild(createWalkKingdomsButton());
	returnMe.appendChild(createButton("btnBeast", "Beast", function () {
			warpToBeast();
		}));
	return returnMe;
}

function getMoveDiv2() {
	var returnMe = document.createElement("div");
	returnMe.appendChild(createButton("btnNorth", "North", function () {
			moveNorth();
		}));
	returnMe.appendChild(createButton("btnSouth", "South", function () {
			moveSouth();
		}));
	returnMe.appendChild(createButton("btnEast", "East", function () {
			moveEast();
		}));
	returnMe.appendChild(createButton("btnWest", "West", function () {
			moveWest();
		}));
	return returnMe;
}

function getCustomButtonsDiv() {
	var returnMe = document.createElement("div");
	returnMe.className = "addedDiv";
	returnMe.appendChild(getGrindDiv());
	returnMe.appendChild(getCraftDiv());
	returnMe.appendChild(getMoveDiv());
	returnMe.appendChild(getMoveDiv2());
	return returnMe;
}

function getGrindDiv() {
	var returnMe = document.createElement("div");
	grindButton = createGrindButton();
	returnMe.appendChild(grindButton);
	returnMe.appendChild(createMonsterSelect());
	return returnMe;
}

function getCraftDiv() {
	var returnMe = document.createElement("div");
	craftButton = createCraftButton();
	returnMe.appendChild(craftButton);
	returnMe.appendChild(createCraftTypeSelect());
	returnMe.appendChild(createCraftSelect());
	return returnMe;
}

function getUpWindowDiv() {
	var returnMe = document.createElement("div");
	returnMe.className = "upwindow";
	returnMe.innerHTML = getMainFrameElement("#s_Window").outerHTML;
	returnMe.style.display = "inline-block";
	return returnMe;
}

setPassword("1qaz!QAZ2wsx@WSX");
clickLogin();
var grindButton;
var craftButton;

setTimeout(function () {
/* 	
	var pollWrapper = window.frames[0].pollzero;
	window.frames[0].pollzero = function (element, num) {
		pollWrapper(element, num);
		setTimeout(function () {
			updateInfo();
		}, 300);
	};
 */
	var target = getMainFrameElement("body > table > tbody > tr:nth-child(3) > td > table");
	var body = getMainFrameElement("body > table > tbody > tr:nth-child(1) > td:nth-child(2)");
	var center = getMainFrame().querySelector("center");

	target.insertAdjacentElement("afterend", getUpWindowDiv());
	target.insertAdjacentElement("afterend", getInfoDiv());
	target.insertAdjacentElement("afterend", getCustomButtonsDiv());

	setOptions(getMainFrameElement("#selectCraftable"), getCraftTypeList(getMainFrameElement("#selectCraftType").value));
	selectOptionByText("#selectCraftable", "Rusty Dagger");
	selectOptionByText("#selectMonster", "Agleam Avenger");

	getMainFrameElement(selectors.kingdomTable).onclick = function () {
		var className = " hideDetails";
		var classIndex = this.className.indexOf(className);
		if (classIndex > -1) {
			this.className = this.className.slice(0, classIndex - 1) + this.className.slice(classIndex + className.length);
		} else {
			this.className += className;
		}
	};

	getMainFrameElement(selectors.playerTable).querySelectorAll("td[width]").forEach(function (x) {
		x.setAttribute("width", "");
	});
	getMainFrameElement(selectors.kingdomTable).querySelectorAll("td[width]").forEach(function (x) {
		x.setAttribute("width", "");
	});

	selectOptionByText(selectors.target, "Agleam");
	// you can add the style sheet if you are on PC
	// AddStyleSheet(cssString);
	// otherwise, if using a mobile browser or TamperMonkey, use this
	setStyleAttributes();

}, 5000);
