

HTMLOptionsCollection.prototype.filter = Array.prototype.filter;

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

var ViewModel = (function () {
	var instance;

	function init() {

		function getElement(selector) {
			var returnMe = document.querySelector(selector);
			if (!returnMe) {
				returnMe = this.getMainFrameElement(selector);
			}
			return returnMe;
		}

		//// Singleton
		//// Private methods and variables

		return {
			selectors: {
				actionDelay: "#s_ActionDelay",
				actionSelect: "select[name=\"action\"]",
				actionSubmit: "#s_subbut0 > input[type=\"image\"]",
				actionTable: "body > table > tbody > tr:nth-child(3) > td > table",
				actionsSelect2: "#generaltd1 > select[name=\"action\"]",
				actionsSelect3: "#generaltd2 > select[name=\"action\"]",
				castButton: "#s_FightWin > img:nth-child(2)",
				chat: "#s_Chat",
				chatBox: "#chattybox",
				chatForm: "#chat",
				chatSubmit: "#s_chatbut > input",
				craftButton: "#btnCraft",
				craftQualitySelect: "#selectCraftQuality",
				craftTypeSelect: "#selectCraftType",
				durButton: "img[onmousedown=\"level(3)\"]",
				embezzleButton: "#btnEmbezzle",
				fightButtons: "#s_FightWin",
				generalForm: "#general0",
				grindButton: "#btnGrind",
				grindMonsterSelect: "#selectMonster",
				homeButton: "#btnHome",
				kingForm: "#king0",
				kingdomActionSubmit: "#s_subbut2 > input",
				kingdomActionsSelect: "body > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(3) > td > select:nth-child(2)",
				kingdomOtherA: "body > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(3) > td > input[type=\"text\"]",
				kingdomTable: "body > table > tbody > tr:nth-child(2) > td > table",
				loginButton: "#subshit",
				mainFrame: "frame[name=\"main\"]",
				minesButton: "#btnMines",
				other: "select[name=\"other\"]",
				othera: "select[name=\"othera\"]",
				passwordInput: "body > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(5) > td > input[type=\"password\"]:nth-child(6)",
				playerTable: "body > table > tbody > tr:nth-child(1) > td:nth-child(1) > table",
				pubButton: "#btnPub",
				response: "#s_Response",
				reviveButton: "img[onmousedown=\"revive()\"]",
				runeButton: "#btnRune",
				security: "#s_Response img",
				target: "select[name=\"target\"]",
				travelButton: "#btnTravel",
				travelOption: "option[value=\"tele\"]",
				upWindow: "#s_Window",
				walkKingdomsButton: "#btnWalkKingdoms",
				windowTable: "#s_Window > table"
			},
			getActionTable: function () {
				return this.getMainFrame().querySelector(this.selectors.actionTable);
			},
			getPasswordInput: function () {
				return this.getMainFrame().querySelector(this.selectors.passwordInput);
			},
			getLoginButton: function () {
				return this.getMainFrame().querySelector(this.selectors.loginButton);
			},
			getKingForm: function () {
				return this.getMainFrame().querySelector(this.selectors.kingForm);
			},
			getGeneralForm: function () {
				return this.getMainFrame().querySelector(this.selectors.generalForm);
			},
			getActionDelay: function () {
				return this.getMainFrame().querySelector(this.selectors.actionDelay);
			},
			getActionSubmit: function () {
				return this.getMainFrame().querySelector(this.selectors.actionSubmit);
			},
			getActionSelect: function () {
				return this.getMainFrame().querySelector(this.selectors.actionSelect);
			},
			getActionSelect2: function () {
				return this.getMainFrame().querySelector(this.selectors.actionSelect2);
			},
			getActionSelect3: function () {
				return this.getMainFrame().querySelector(this.selectors.actionSelect3);
			},
			getCastButton: function () {
				return this.getMainFrame().querySelector(this.selectors.castButton);
			},
			getChatForm: function () {
				return this.getMainFrame().querySelector(this.selectors.chatForm);
			},
			getChat: function () {
				return this.getMainFrame().querySelector(this.selectors.chat);
			},
			getChatBox: function () {
				return this.getMainFrame().querySelector(this.selectors.chatBox);
			},
			getChatSubmit: function () {
				return this.getMainFrame().querySelector(this.selectors.chatSubmit);
			},
			getDurButton: function () {
				return this.getMainFrame().querySelector(this.selectors.durButton);
			},
			getFightButtons: function () {
				return this.getMainFrame().querySelector(this.selectors.fughtButtons);
			},
			getKingdomActionSubmit: function () {
				return this.getMainFrame().querySelector(this.selectors.kingdomActionSubmit);
			},
			getKingdomActionSelect: function () {
				return this.getMainFrame().querySelector(this.selectors.kingdomActionSelect);
			},
			getKingdomOtherA: function () {
				return this.getMainFrame().querySelector(this.selectors.kingdomOtherA);
			},
			getKingdomTable: function () {
				return this.getMainFrame().querySelector(this.selectors.kingdomTable);
			},
			getMainFrame: function () {

				var mainFrame = getElement(this.selectors.mainFrame);

				if (!mainFrame) {
					throw ("cant find main frame");
				}
				if (mainFrame.contentWindow.document) {
					mainFrame = mainFrame.contentWindow.document;
				} else {
					mainFrame = mainFrame.contentDocument;
				}
				return mainFrame;
			},
			getOther: function () {
				return this.getMainFrame().querySelector(this.selectors.other);
			},
			getOtherA: function () {
				return this.getMainFrame().querySelector(this.selectors.otherA);
			},
			getPlayerTable: function () {
				return this.getMainFrame().querySelector(this.selectors.playerTable);
			},
			getResponse: function () {
				return this.getMainFrame().querySelector(this.selectors.response);
			},
			getReviveButton: function () {
				return this.getMainFrame().querySelector(this.selectors.reviveButton);
			},
			getSecurity: function () {
				return this.getMainFrame().querySelector(this.selectors.security);
			},
			getTarget: function () {
				return this.getMainFrame().querySelector(this.selectors.target);
			},
			getTravelOption: function () {
				return this.getMainFrame().querySelector(this.selectors.travelOption);
			},
			getWindowTable: function () {
				return this.getMainFrame().querySelector(this.selectors.windowTable);
			},
			getCraftQualitySelect: function () {
				return this.getMainFrame().querySelector(this.selectors.craftQualitySelect);
			},
			getCraftTypeSelect: function () {
				return this.getMainFrame().querySelector(
					this.selectors.craftTypeSelect);
			},
			getGrindMonsterSelect: function () {
				return this.getMainFrame().querySelector(
					this.selectors.grindMonsterSelect);
			},
			getGrindButton: function () {
				return this.getMainFrame().querySelector(
					this.selectors.grindButton);
			},
			getCraftButton: function () {
				return this.getMainFrame().querySelector(
					this.selectors.craftButton);
			},
			getTravelButton: function () {
				return this.getMainFrame().querySelector(
					this.selectors.travelButton);
			},
			getHomeButton: function () {
				return this.getMainFrame().querySelector(
					this.selectors.homeButton);
			},
			getPubButton: function () {
				return this.getMainFrame().querySelector(
					this.selectors.pubButton);
			},
			getRuneButton: function () {
				return this.getMainFrame().querySelector(
					this.selectors.runeButton);
			},
			getEmbezzleButton: function () {
				return this.getMainFrame().querySelector(
					this.selectors.embezzleButton);
			},
			getMinesButton: function () {
				return this.getMainFrame().querySelector(
					this.selectors.minesButton);
			},
			getUpWindow: function () {
				return this.getMainFrame().querySelector(
					this.selectors.upWindow);
			},
			getWalkKingdomsButton: function () {
				return this.getMainFrame().querySelector(
					this.selectors.walkKingdomsButton);
			},
			getResponseMessage: function () {
				var element = viewModel.getResponse();
				if (element) {
					return element.textContent;
				} else {
					return "";
				}
			},
			getChatText: function () {
				var returnMe = [];
				viewModel.getChat().querySelectorAll("font").forEach(function (x) {
					returnMe.push(x.textContent);
				});
				return returnMe;
			}

		};
	}

	return {
		getInstance: function () {
			if (!instance) {
				instance = init();
			}
			return instance;
		}
	};
})();

var UISetup = (function () {
	var instance;

	function init() {

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
			getApexStatus();
			setupLoop(actions.grind);
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
			setupLoop(craftAndSell);
		}

		//// Singleton
		//// Private methods and variables


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
		function createRuneButton() {
			return createButton("btnRune", "Buy Rune", function () {
				buyRune();
			});
		}
		function createEmbezzleButton() {
			return createButton("btnEmbezzle", "Embezzle", function () {
				embezzle();
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
		/* function createRelicSelect() {
		return createSelect("selectRelic", window.frames[0].window.top.relics);
		}
		 */

		function createCraftTypeSelect() {
			var returnMe = createSelect("selectCraftType", ["Weapon", "Helmet", "Shield", "Gauntlets", "Mantle", "Sleeves", "Damage Spell", "Leggings", "Boots", "Heal Spell", "Relic", "Bow", "Arrow", "Light Weapons", "Heavy Weapons", "Precise Weapons", "Rapid Damage Spells", "Major Damage Spells", "Accurate Damage Spells", "Durability Helmets", "Durability Shields", "Durability Gauntlets", "Durability Mantles", "Durability Sleeves", "Durability Leggings", "Durability Boots", "Essence Elements"]);
			returnMe.onchange = function () {
				setOptions(viewModel.getCraftQualitySelect(), getCraftTypeList(this.value));
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
		}
		function createCraftSelect() {
			return createSelect("selectCraftQuality", []);
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
			viewModel.getMainFrame().querySelector("head").appendChild(this.CreateStyleSheet(content));
		}
		function updateInfo() {
			viewModel.getMainFrame().querySelector("#spLevel")
			.textContent = Level;
			viewModel.getMainFrame().querySelector("#spLoc")
			.textContent = Loc;
			viewModel.getMainFrame().querySelector("#spGold")
			.textContent = Gold;
			viewModel.getMainFrame().querySelector("#spDur")
			.textContent = Dur;
			viewModel.getMainFrame().querySelector("#spKing")
			.textContent = King;
			viewModel.getMainFrame().querySelector("#spRunes")
			.textContent = Runes;
			viewModel.getMainFrame().querySelector("#spTax")
			.textContent = Tax;
			viewModel.getMainFrame().querySelector("#spMorale")
			.textContent = Moral;
			viewModel.getMainFrame().querySelector("#spCash")
			.textContent = Tres;
			viewModel.getMainFrame().querySelector("#spPop")
			.textContent = Pop;
			viewModel.getMainFrame().querySelector("#spFood")
			.textContent = Food;
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

		return {

			updateInfo: function () {
				updateInfo();
			},
			setStyleAttributes: function () {
				viewModel.getMainFrameElements(".info,#s_Window,.addedDiv")
				.forEach(function (x) {
					x.style.display = "inline-block";
				});
				viewModel.getMainFrameElements(".kingdom-info,.player-info")
				.forEach(function (x) {
					x.style.backgroundColor = "black";
					x.style.border = "solid thin white";
					x.style.width = "15em";
				});
				var actionTable = viewModel.getMainFrameElement("body > table > tbody > tr:nth-child(3) > td > table");
				actionTable.removeAttribute("width");
				actionTable.removeAttribute("cellspacing");
				actionTable.removeAttribute("cellpadding");
				actionTable.removeAttribute("bgcolor");
				actionTable.removeAttribute("border");
				actionTable.style = "";
				actionTable.style.height = "30em";
				actionTable.style.width = "15em";
				viewModel.getPlayerTable().querySelectorAll("td[width]").forEach(function (x) {
					x.setAttribute("width", "");
				});
				viewModel.getKingdomTable().querySelectorAll("td[width]").forEach(function (x) {
					x.setAttribute("width", "");
				});
				viewModel.getMainFrameElements(".kingdom-info > div > span,.player-info > div > span")
				.forEach(function (x) {
					x.style.width = "10em";
					x.style.display = "inline-block";
				});
				viewModel.getMainFrameElements(".kingdom-info > div > label,.player-info > div > label")
				.forEach(function (x) {
					x.style.width = "4em";
					x.style.color = "goldenrod";
					x.style.display = "inline-block";
				});
				viewModel.getMainFrameElements("button")
				.forEach(function (x) {
					x.style += " padding: 8px; border-radius: .5em; font-size: larger;";
				});
				viewModel.getMainFrameElements("select")
				.forEach(function (x) {
					x.style += " padding: 8px; font-size: larger; ";
				});
				viewModel.getMainFrameElements("body > table > tbody > tr:nth-child(3) > td > table",  + ",body > table > tbody > tr:nth-child(4) > td > table")
				.forEach(function (x) {
					x.style.width = "30em";
				});
				viewModel.getMainFrameElements("body > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(2) > td:nth-child(7) > select:nth-child(5)",  + ",body > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(2) > td:nth-child(7) > select:nth-child(7)")
				.forEach(function (x) {
					x.style.width = "10em";
				});
				viewModel.getKingdomTable().className += " hideDetails";
				viewModel.getMainFrameElements("td[background]",  + ",body > table > tbody > tr:nth-child(1)",  + ",body > table > tbody > tr:nth-child(1) > td:nth-child(1)",  + ",body > table > tbody > tr:nth-child(2)",  + ",body > table > tbody > tr:nth-child(2) > td > table",  + ",body > table > tbody > tr:nth-child(2) > td > center",  + ",body > table > tbody > tr:nth-child(5) > td > table",  + ",body > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(1)",  + ",body > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(6)",  + "," + viewModel.getActionDelay())
				.forEach(function (x) {
					x.style.display = "none";
				});
				viewModel.getMainFrameElements("#s_Exp > table > tbody > tr > td:nth-child(2)",
					 + ",#s_Exp > table > tbody > tr > td:nth-child(3)",
					 + ",#s_LifeMeter > table > tbody > tr > td:nth-child(2)",
					 + ",#s_LifeMeter > table > tbody > tr > td:nth-child(3)"
					 + ",body > table > tbody > tr:nth-child(2) > td > table td[width]"
					 + ",body > table > tbody > tr:nth-child(1) > td:nth-child(1) > table td[width]")
				.forEach(function (x) {
					x.style.display = "block";
				});
				viewModel.getMainFrameElements("body > table > tbody > tr:nth-child(4) > td > table, body > table > tbody > tr:nth-child(3) > td > table")
				.forEach(function (x) {
					x.style.width = "20em";
				});
				viewModel.getMainFrameElements("body > table > tbody > tr:nth-child(2), body > table > tbody > tr:nth-child(2) > td")
				.forEach(function (x) {
					x.style.display = "inline";
				});
				viewModel.getMainFrameElements("#s_subbut > input[type=\"image\"]",  + ",#s_subbut2 > input[type=\"image\"]",  + ",#s_subbutNO > img",  + ",#s_subbut2NO > img")
				.forEach(function (x) {
					x.style.width = "100px";
					x.style.height = "30px";
				});
				viewModel.getMainFrameElement("#s_Window").outerHTML = "";
			},
			getPlayerDiv: function () {
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
					}, ].forEach(function (item) {
					returnMe.appendChild(getLineItem(item));
				});
				return returnMe;
			},
			getKingdomDiv: function () {
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
					}, ].forEach(function (item) {
					returnMe.appendChild(getLineItem(item));
				});
				returnMe.appendChild(createRuneButton());
				returnMe.appendChild(createEmbezzleButton());
				return returnMe;
			},

			getInfoDiv: function () {
				var returnMe = document.createElement("div");
				returnMe.className = "info";
				returnMe.appendChild(this.getKingdomDiv());
				returnMe.appendChild(this.getPlayerDiv());
				return returnMe;
			},
			getMoveDiv: function () {
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
			},
			getMoveDiv2: function () {
				var returnMe = document.createElement("div");
				returnMe.appendChild(createButton("btnNorth", "North", function () {
						actions.moveNorth();
					}));
				returnMe.appendChild(createButton("btnSouth", "South", function () {
						actions.moveSouth();
					}));
				returnMe.appendChild(createButton("btnEast", "East", function () {
						actions.moveEast();
					}));
				returnMe.appendChild(createButton("btnWest", "West", function () {
						actions.moveWest();
					}));
				return returnMe;
			},
			getCustomButtonsDiv: function () {
				var returnMe = document.createElement("div");
				returnMe.className = "addedDiv";
				returnMe.appendChild(this.getGrindDiv());
				returnMe.appendChild(this.getCraftDiv());
				returnMe.appendChild(this.getMoveDiv());
				returnMe.appendChild(this.getMoveDiv2());
				return returnMe;
			},
			getGrindDiv: function () {
				var returnMe = document.createElement("div");
				grindButton = createGrindButton();
				returnMe.appendChild(grindButton);
				returnMe.appendChild(createMonsterSelect());
				return returnMe;
			},
			getCraftDiv: function () {
				var returnMe = document.createElement("div");
				craftButton = createCraftButton();
				returnMe.appendChild(craftButton);
				returnMe.appendChild(createCraftTypeSelect());
				returnMe.appendChild(createCraftSelect());
				return returnMe;
			},
			getUpWindowDiv: function () {
				var returnMe = document.createElement("div");
				returnMe.className = "upwindow";
				returnMe.innerHTML = viewModel.getUpWindow().outerHTML;
				returnMe.style.display = "inline-block";
				return returnMe;
			}

		};
	}

	return {
		getInstance: function () {
			if (!instance) {
				instance = init();
			}
			return instance;
		}
	};
})();

//actions

var Actions = (function () {

	var instance;

	function init() {

		function move(dir) {
			console.log("move");
			return resolveAction(function () {
				window.frames[0].Move(dir);
			}, getDelay(newFightDelay * 2), selectors.actionSubmit);
		}
		function getNextUnwantedItem() {
			var select = document.querySelector(viewModel.selectors.target);
			if (!select) {
				select = viewModel.getTarget();
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

		function wantItem(text) {

			if (!text) {
				text = viewModel.getChatText().join(" ");
			}

			var found = false;

			var wantThese = [
				"Allegiance",
				"Angel Hair",
				"Annulment",
				"Apex",
				"Attacker`s Balance",
				"Balace Armorcraft Guide",
				"Beast Noobane",
				"Believer",
				"Black Ashen Rock",
				"Captain`s Staff of Valor",
				"Cara",
				"Clarity",
				"Conquest",
				"Death Spike",
				"Decay",
				"Delegation",
				"Demon Horn",
				"Devestation",
				"Devil",
				"Devoid",
				"Dwarven Weaponcraft Guide",
				"Edge",
				"Element",
				"Enduring Fists",
				"Enhanced Nock",
				"Fallen",
				"Impet",
				"Melee",
				"Mesmer`s Book of Mythics",
				"Monast",
				"Preserv",
				"Putrefaction",
				"Rectification",
				"Revenge",
				"Sacrificial",
				"Scepter of Specter Sight",
				"Scorn",
				"Severity",
				"Sharpening Stone",
				"Solon`s Arcane Booklet",
				"Sylvain Fletcher`s Workbook",
				"Temple Stone",
				"Theurgal",
				"Vice",
				"Virtue",
				"Voidance"
			];

			wantThese.forEach(function (x) {
				if (text.indexOf(x) > -1) {
					found = true;
				}
			});

			return found;
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
				viewModel.getChatBox().value = text;
				// clickChatSubmit();
				pollzero(viewModel.getChatForm(), 0);
			}, getDelay(newFightDelay), viewModel.selectors.actionSubmit);
		}
		function submitGeneralAction() {
			top.frames.main.document.getElementById("skipform").action.value = "fight";
			top.frames.main.document.getElementById("skipform").target.value = 0;
			window.frames[0].pollzero(viewModel.getGeneralForm(), 0, true);
		}
		function submitKingdomAction() {
			window.frames[0].pollzero(viewModel.getKingForm(), 0, true);
		}
		function resolveAction(callback, delay, selector) {
			console.log("resolveAction");
			if (!selector) {
				selector = viewModel.selectors.response;
			}
			return new Promise(function (resolve, reject) {
				var response = viewModel.getResponseMessage();
				var chat = viewModel.getChat().outerHTML;
				callback();
				waitForDOM(viewModel.getMainFrame(), selector, function (context, selector, element) {
					if (element) {
						var r = viewModel.getResponseMessage();
						var c = viewModel.getChat().outerHTML;
						return r === "" || r !== response || c !== chat;
					} else {
						return false;
					}
				}, function () {
					checkResponse(resolve, reject, delay);
				}, function () {
					updateState(resolve, reject, delay);
				}, null);
			});
		}
		function updateState(resolve, reject, delay) {
			rwkState = getRWKState();
			setTimeout(function () {
				resolve();
			}, delay);
		}
		function checkResponse(resolve, reject, delay) {
			rwkState = getRWKState();
			uiSetup.updateInfo();
			var r = viewModel.getResponseMessage();
			var c = viewModel.getChat().outerHTML;
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
		}
		function revive() {
			console.log("revive");
			return resolveAction(function () {
				parent.frames[0].window.revive();
			}, getDelay(standardDelay / 2), viewModel.selectors.actionSubmit);
		}
		function train() {
			console.log("train");
			return resolveAction(function () {
				parent.frames[0].window.level(3);
			}, getDelay(standardDelay / 2), viewModel.selectors.actionSubmit);
		}
		function destroyItem(name) {
			console.log("destroy");
			setAction("DESTROY");
			return selectOptionByValue(viewModel.getTarget(), getNextUnwantedItem(), true)
			.then(function () {
				return resolveAction(function () {
					submitGeneralAction();
				}, getDelay(newFightDelay), viewModel.selectors.response);
			});
		}
		function cast() {
			console.log("cast");
			return this.resolveAction(function () {
				parent.frames[0].window.gattack("cast");
			}, getDelay(rapidDelay), viewModel.selectors.response);
		}
		function newFight() {
			console.log("new fight");
			return new Promise(function (resolve, reject) {
				var sf = window.frames[0].document.getElementById("skipform");

				sf.action.value = "fight";
				sf.target.value = viewModel.getGrindMonsterSelect().selectedIndex;
				window.frames[0].pollzero(sf, 0, true);

				setTimeout(function () {
					resolve();
				}, getDelay(newFightDelay));
			});
		}
		function craft(type, item) {
			console.log("craft", item);
			var selectCraftable = viewModel.getCraftQualitySelect();
			return setAction("Craft")
			.then(function () {
				return setTarget(type)
				.then(function () {
					return setOther(item)
					.then(function () {
						return resolveAction(function () {
							submitGeneralAction();
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
			return resolveAction(function () {
				submitGeneralAction();
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
							submitGeneralAction();
						}, getDelay(rapidDelay), viewModel.selectors.actionSubmit)
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
							submitGeneralAction();
						}, getDelay(rapidDelay), viewModel.selectors.actionSubmit);
					},
						function () {
						console.log("findBeastRejectHandler");
						return new Promise(function (resolve, reject) {
							move(dir)
							.then(function () {
								if (isBeastHere()) {
									viewModel.getTarget().selectedIndex = 2;
									console.log("resolving findBeastRejectHandler");
									resolve();
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
			return getElement(viewModel.getTarget()).querySelectorAll("option").length > 1;
		}
		function teleport(x, y) {
			setAction("Teleport");

			return new Promise(function (resolve, reject) {

				waitForDOM(window.frames[0].document, viewModel.selectors.other, null, function () {

					viewModel.getTarget().value = x;
					viewModel.getOther().value = y;

					resolveAction(function () {
						submitGeneralAction();
					}, getDelay(standardDelay), viewModel.selectors.actionSubmit)
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
				waitForDOM(window.frames[0].document, viewModel.selectors.kingdomOtherA, null, function () {
					setKingdomOtherA("1");

					resolveAction(function () {
						viewModel.getKingdomActionSubmit().click();
					}, getDelay(newFightDelay), viewModel.selectors.actionSubmit)
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
				}, function () {
					reject();
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
					}, function () {
						Promise.reject();
					});
				promiseChain = promiseChain
					.then(function () {
						var t = Tres ? Tres : window.frames[0].Tres;
						if (parseInt(t, 10) >= 1990000000) {
							return embezzle();
						} else {
							return new Promise(function (resolve, reject) {
								resolve();
							});
						}
					});
				promiseChain = promiseChain
					.then(function () {
						var g = Gold ? Gold : window.frames[0].Gold;
						if (parseInt(g, 10) > 1700000000) {
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
		}

		function logBody() {
			console.log(document.body.outerHTML);
		}
		function grind() {
			var returnMe;
			if (rwkState.isFightInProgress) {
				returnMe = actions.cast();
			} else if (!!viewModel.getActionSubmit()) {
				returnMe = actions.newFight();
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
			}, getDelay(newFightDelay), viewModel.selectors.kingdomActionSubmit);
		}

		return {

			beastHandler: beastHandler,
			buyRune: buyRune,
			cast: cast,
			checkResponse: checkResponse,
			craft: craft,
			destroyItem: destroyItem,
			embezzle: embezzle,
			findBeast: findBeast,
			grind: grind,
			isBeastHere: isBeastHere,
			moveDown: moveDown,
			moveEast: moveEast,
			moveNorth: moveNorth,
			moveSouth: moveSouth,
			moveUp: moveUp,
			moveWest: moveWest,
			newFight: newFight,
			resolveAction: resolveAction,
			revive: revive,
			say: say,
			sell: sell,
			submitGeneralAction: submitGeneralAction,
			submitKingdomAction: submitKingdomAction,
			teleport: teleport,
			train: train,
			travel: travel,
			updateState: updateState,
			walkKingdoms: walkKingdoms,
			warpToBeast: warpToBeast
		};
	}

	return {
		getInstance: function () {
			if (!instance) {
				instance = init();
			}
			return instance;
		}
	};
})();

var viewModel = ViewModel.getInstance();
var uiSetup = UISetup.getInstance();
var actions = Actions.getInstance();

NodeList.prototype.forEach = Array.prototype.forEach;
NodeList.prototype.map = Array.prototype.map;

var rwkState;
//state observers
function getRWKState() {
	return {
		isReviveNeeded: !!viewModel.getReviveButton(),
		isBeastActive: isBeastActive(),
		isTrainingNeeded: !!viewModel.getDurButton(),
		isTreasuryFull: parseInt(Tres, 10) === 2000000000,
		isKingdomOwnedByMe: King == "Grelgor",
		isWalletFull: parseInt(Gold, 10) === 2000000000,
		isTimedOut: viewModel.getResponseMessage().indexOf("timed out") > -1,
		enemyNotFound: viewModel.getResponseMessage().indexOf("Enemy not found") > -1,
		isInventoryFull: isInventoryFull(),
		isSecurityResponseNeeded: !!viewModel.getSecurity(),
		isFightInProgress: !!viewModel.getCastButton()
	};
}

function isBeastActive(text) {

	if (!text) {
		text = viewModel.getChatText().join(" ");
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
		text = viewModel.getChatText().join(" ");
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
function setPassword(value) {
	viewModel.getPasswordInput().value = value;
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

function setAction(text) {
	return selectOptionByText(viewModel.getActionSelect(), text);
}

/*
function setTarget(text) {
return selectOptionByText(selectors.target, text);
// updatetarget(g.action.value, this.options[this.selectedIndex].value, g);
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
 */

function selectOptionByText(element, text) {
	for (var i = 0; i < element.options.length; i++) {
		if (element.options[i].textContent.indexOf(text) > -1) {
			element.value = element.options[i].value;
			break;
		}
	}

	triggerChange(element);
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

/*
function clickMainFrameElement(selector) {
getMainFrameElement(selector).click();
}

function getMainFrameElement(selector) {
return getMainFrame().querySelector(selector);
}

function getMainFrameElements(selector) {
return getMainFrame().querySelectorAll(selector);
}





function getOptions(element) {
return element.querySelectorAll("option");
}
 */
/*
function clickKingdomActionSubmit() {
getElement(selectors.kingdomActionSubmit).click();
}

function clickChatSubmit() {
getElement(selectors.chatSubmit).click();
}
 */

function awaitMarkupChange(element) {
	var beforeHTML = element.parentElement.parentElement.outerHTML;

	var selector = "";

	if (!!element.id) {
		selector = "#" + element.id;
	} else if (!!element.className) {
		selector = element.nodeName + "." + element.className;
	}else{
		selector = "*";
	}

	return new Promise(function (resolve, reject) {
		waitForDOM(select.parentElement, selector, function () {
			return (beforeHTML !== element.parentElement.parentElement.outerHTML);
		}, function () {
			resolve();
		}, function () {
			reject();
		}, null);
	});
}

function selectOptionByValue(element, value, skip) {
	if (!element) {
		throw ("invalid element");
	}
	var beforeHTML = element.parentElement.parentElement.outerHTML;
	var skipTest = element.value === value;
	element.value = value;
	triggerChange(element);

	return new Promise(function (resolve, reject) {
		waitForDOM(element.parentElement, "*", function () {
			return skip || skipTest || beforeHTML !== element.parentElement.parentElement.outerHTML;
		}, function () {
			resolve();
		}, function () {
			reject();
		}, null);
	});
}

//promise loops
function craftAndSell() {
	var type = viewModel.getCraftTypeSelect().value;
	var item = viewModel.getCraftQualitySelect().value;
	return craft(type, item).then(function () {
		return new Promise(function (resolve, reject) {
			return sell(item);
		});
	});
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

function getApexStatus() {
	isApex = false;
	setAction("Equip");

	setTimeout(function () {
		var target = viewModel.getTarget();

		for (var i = 0; i < target.options.length; i++) {
			if (target.options[i].textContent.indexOf("Apex") > -1
				 && target.options[i].textContent.indexOf("EQUIPPED") > -1) {
				isApex = true;
			}
		}
	});
}
function isTrivial(text) {
	var chatText = viewModel.getChatText();
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
		returnMe = actions.train;
	} else if (rwkState.isBeastActive && getBeastPosition().plane === "Sur") {
		done = true;
		grindButton.onclick = startGrindingHandler;
		grindButton.textContent = "Grind";
		craftButton.onclick = startGrindingHandler;
		craftButton.textContent = "Craft";
		makeNoise();
		returnMe = beastHandler;
	} else if (rwkState.isInventoryFull) {
		returnMe = actions.destroyItem;
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
	return returnMe + 100;
}

//UI setup

setPassword("1qaz!QAZ2wsx@WSX");
viewModel.getLoginButton().click();
var grindButton;
var craftButton;

setTimeout(function () {

	var pollWrapper = window.frames[0].pollzero;
	window.frames[0].pollzero = function (element, num) {
		pollWrapper(element, num);
		setTimeout(function () {
			uiSetup.updateInfo();
		}, 300);
	};

	var actionTable = viewModel.getActionTable();
	// getMainFrameElement("body > table > tbody > tr:nth-child(3) > td > table");
	var center = viewModel.getMainFrame().querySelector("center");

	actionTable.insertAdjacentElement("afterend", uiSetup.getUpWindowDiv());
	actionTable.insertAdjacentElement("afterend", uiSetup.getInfoDiv());
	actionTable.insertAdjacentElement("afterend", uiSetup.getCustomButtonsDiv());

	// uiSetup.setOptions(viewModel.getCraftQualitySelect(), uiSetup.getCraftTypeList(viewModel.getCraftTypeSelect.value));
	// selectOptionByText(viewModel.getCraftQualitySelect(), "Rusty Dagger");
	selectOptionByText(viewModel.getGrindMonsterSelect(), "Agleam Avenger");

	viewModel.getKingdomTable().onclick = function () {
		var className = " hideDetails";
		var classIndex = this.className.indexOf(className);
		if (classIndex > -1) {
			this.className = this.className.slice(0, classIndex - 1) + this.className.slice(classIndex + className.length);
		} else {
			this.className += className;
		}
	};

	selectOptionByText(viewModel.getTarget(), "Agleam");
	// you can add the style sheet if you are on PC
	// AddStyleSheet(cssString);
	// otherwise, if using a mobile browser or TamperMonkey, use this
	// setStyleAttributes();

}, 5000);
