

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

		var selectors = {
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
		};
		function getMainFrameElement(selector) {
			return getMainFrame().querySelector(selector);
		}
		function getElement(selector) {
			var returnMe = document.querySelector(selector);
			if (!returnMe) {
				returnMe = this.getMainFrameElement(selector);
			}
			return returnMe;
		}
		function getMainFrameElements(selector) {
			return getMainFrame().querySelectorAll(selector);
		}
		function getActionTable() {
			return this.getMainFrame().querySelector(selectors.actionTable);
		}
		function getPasswordInput() {
			return this.getMainFrame().querySelector(selectors.passwordInput);
		}
		function getLoginButton() {
			return this.getMainFrame().querySelector(selectors.loginButton);
		}
		function getKingForm() {
			return this.getMainFrame().querySelector(selectors.kingForm);
		}
		function getGeneralForm() {
			return this.getMainFrame().querySelector(selectors.generalForm);
		}
		function getActionDelay() {
			return this.getMainFrame().querySelector(selectors.actionDelay);
		}
		function getActionSubmit() {
			return this.getMainFrame().querySelector(selectors.actionSubmit);
		}
		function getActionSelect() {
			return this.getMainFrame().querySelector(selectors.actionSelect);
		}
		function getActionSelect2() {
			return this.getMainFrame().querySelector(selectors.actionSelect2);
		}
		function getActionSelect3() {
			return this.getMainFrame().querySelector(selectors.actionSelect3);
		}
		function getCastButton() {
			return this.getMainFrame().querySelector(selectors.castButton);
		}
		function getChatForm() {
			return this.getMainFrame().querySelector(selectors.chatForm);
		}
		function getChat() {
			return this.getMainFrame().querySelector(selectors.chat);
		}
		function getChatBox() {
			return this.getMainFrame().querySelector(selectors.chatBox);
		}
		function getChatSubmit() {
			return this.getMainFrame().querySelector(selectors.chatSubmit);
		}
		function getDurButton() {
			return this.getMainFrame().querySelector(selectors.durButton);
		}
		function getFightButtons() {
			return this.getMainFrame().querySelector(selectors.fughtButtons);
		}
		function getKingdomActionSubmit() {
			return this.getMainFrame().querySelector(selectors.kingdomActionSubmit);
		}
		function getKingdomActionSelect() {
			return this.getMainFrame().querySelector(selectors.kingdomActionSelect);
		}
		function getKingdomOtherA() {
			return this.getMainFrame().querySelector(selectors.kingdomOtherA);
		}
		function getKingdomTable() {
			return this.getMainFrame().querySelector(selectors.kingdomTable);
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
		function getOther() {
			return this.getMainFrame().querySelector(selectors.other);
		}
		function getOtherA() {
			return this.getMainFrame().querySelector(selectors.otherA);
		}
		function getPlayerTable() {
			return this.getMainFrame().querySelector(selectors.playerTable);
		}
		function getResponse() {
			return this.getMainFrame().querySelector(selectors.response);
		}
		function getReviveButton() {
			return this.getMainFrame().querySelector(selectors.reviveButton);
		}
		function getSecurity() {
			return this.getMainFrame().querySelector(selectors.security);
		}
		function getTarget() {
			return this.getMainFrame().querySelector(selectors.target);
		}
		function getTravelButton() {
			return this.getMainFrame().querySelector(selectors.travelButton);
		}
		function getTravelOption() {
			return this.getMainFrame().querySelector(selectors.travelOption);
		}
		function getWindowTable() {
			return this.getMainFrame().querySelector(selectors.windowTable);
		}
		function getCraftQualitySelect() {
			return this.getMainFrame().querySelector(selectors.craftQualitySelect);
		}
		function getCraftTypeSelect() {
			return this.getMainFrame().querySelector(
				selectors.craftTypeSelect);
		}
		function getGrindMonsterSelect() {
			return this.getMainFrame().querySelector(
				selectors.grindMonsterSelect);
		}
		function getGrindButton() {
			return this.getMainFrame().querySelector(
				selectors.grindButton);
		}
		function getCraftButton() {
			return this.getMainFrame().querySelector(
				selectors.craftButton);
		}
		function getTravelButton() {
			return this.getMainFrame().querySelector(
				selectors.travelButton);
		}
		function getHomeButton() {
			return this.getMainFrame().querySelector(
				selectors.homeButton);
		}
		function getPubButton() {
			return this.getMainFrame().querySelector(
				selectors.pubButton);
		}
		function getRuneButton() {
			return this.getMainFrame().querySelector(
				selectors.runeButton);
		}
		function getEmbezzleButton() {
			return this.getMainFrame().querySelector(
				selectors.embezzleButton);
		}
		function getMinesButton() {
			return this.getMainFrame().querySelector(
				selectors.minesButton);
		}
		function getUpWindow() {
			return this.getMainFrame().querySelector(
				selectors.upWindow);
		}
		function getWalkKingdomsButton() {
			return this.getMainFrame().querySelector(
				selectors.walkKingdomsButton);
		}
		function getResponseMessage() {
			var element = viewModel.getResponse();
			if (element) {
				return element.textContent;
			} else {
				return "";
			}
		}
		function getChatText() {
			var returnMe = [];
			viewModel.getChat().querySelectorAll("font").forEach(function (x) {
				returnMe.push(x.textContent);
			});
			return returnMe;
		}

		function getOptionValueByText(select, text) {
			console.log("getOptionValueByText");
			for (var i = 0; i < select.options.length; i++) {
				if (select.options[i].textContent === text) {
					return select.options[i].value;
				}
			}

			return null;
		}

		//// Singleton
		//// Private methods and variables

		return {
			selectors: selectors,
			getActionTable: getActionTable,
			getPasswordInput: getPasswordInput,
			getLoginButton: getLoginButton,
			getKingForm: getKingForm,
			getGeneralForm: getGeneralForm,
			getActionDelay: getActionDelay,
			getActionSubmit: getActionSubmit,
			getActionSelect: getActionSelect,
			getActionSelect2: getActionSelect2,
			getActionSelect3: getActionSelect3,
			getCastButton: getCastButton,
			getChatForm: getChatForm,
			getChat: getChat,
			getChatBox: getChatBox,
			getChatSubmit: getChatSubmit,
			getDurButton: getDurButton,
			getFightButtons: getFightButtons,
			getKingdomActionSubmit: getKingdomActionSubmit,
			getKingdomActionSelect: getKingdomActionSelect,
			getKingdomOtherA: getKingdomOtherA,
			getKingdomTable: getKingdomTable,
			getMainFrame: getMainFrame,
			getMainFrameElement: getMainFrameElement,
			getMainFrameElements: getMainFrameElements,
			getOther: getOther,
			getOtherA: getOtherA,
			getPlayerTable: getPlayerTable,
			getResponse: getResponse,
			getReviveButton: getReviveButton,
			getSecurity: getSecurity,
			getTarget: getTarget,
			getTravelButton: getTravelButton,
			getTravelOption: getTravelOption,
			getWindowTable: getWindowTable,
			getCraftQualitySelect: getCraftQualitySelect,
			getCraftTypeSelect: getCraftTypeSelect,
			getGrindMonsterSelect: getGrindMonsterSelect,
			getGrindButton: getGrindButton,
			getCraftButton: getCraftButton,
			getTravelButton: getTravelButton,
			getHomeButton: getHomeButton,
			getPubButton: getPubButton,
			getRuneButton: getRuneButton,
			getEmbezzleButton: getEmbezzleButton,
			getMinesButton: getMinesButton,
			getUpWindow: getUpWindow,
			getWalkKingdomsButton: getWalkKingdomsButton,
			getResponseMessage: getResponseMessage,
			getChatText: getChatText,
			getOptionValueByText: getOptionValueByText
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

		function checkInterrupts(callback) {
			var returnMe;
			if (rwkState.isSecurityResponseNeeded) {
				done = true;
				grindButton.onclick = startGrindingHandler;
				grindButton.textContent = "Grind";
				craftButton.onclick = startCraftingHandler;
				craftButton.textContent = "Craft";

				makeNoise();

				returnMe = function () {
					return new Promise(function (resolve, reject) {
						reject();
					});
				}
				// alert("security");
			}
			//if dead revive
			else if (rwkState.isReviveNeeded) {
				returnMe = actions.revive;
			}
			//if level up buttons
			else if (rwkState.isTrainingNeeded) {
				returnMe = actions.train;
			} else if (rwkState.isBeastActive && getBeastPosition().plane === "Sur") {
				done = true;
				grindButton.onclick = startGrindingHandler;
				grindButton.textContent = "Grind";
				craftButton.onclick = startCraftingHandler;
				craftButton.textContent = "Craft";
				makeNoise();
				returnMe = actions.beastHandler;
			} else if (rwkState.isInventoryFull) {
				returnMe = actions.destroyItem;
			} else {
				returnMe = callback;
			}
			return returnMe;
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
			var button = viewModel.getTravelButton();
			actions.travel(x, y)
			.then(function () {
				button.textContent = "Travel";
			}, function () {});
			button.onclick = cancelTravelHandler;
			button.textContent = "Cancel travel";
		}
		function cancelTravelHandler() {
			cancelMove = true;
			var button = viewModel.getTravelButton();
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
			setupLoop(ACTIONS.craftAndSell);
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
				actions.walkKingdoms();
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
				viewModel.getMainFrameElements("#s_Window,.addedDiv")
				.forEach(function (x) {
					x.style.display = "inline-block";
				});
				viewModel.getMainFrameElements(".info")
				.forEach(function (x) {
					x.style.display = "block";
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

				actionTable.querySelectorAll("tr:nth-child(1),tr:nth-child(2),tr:nth-child(4),tr:nth-child(5),tr:nth-child(6),tr:nth-child(8),tr:nth-child(9),tr:nth-child(12)")
				.forEach(function (x) {
					x.style.display = "none";
				});
				actionTable.querySelectorAll("tr:nth-child(3),tr:nth-child(7),tr:nth-child(10),tr:nth-child(11)")
				.forEach(function (x) {
					x.style.height = "0";
				});

				viewModel.getPlayerTable().style.display = "none";
				viewModel.getKingdomTable().style.display = "none";

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
				viewModel.getMainFrameElements("td[background]",
					 + ", body > table > tbody > tr:nth-child(1)",
					 + ", body > table > tbody > tr:nth-child(1) > td:nth-child(1)",
					 + ", body > table > tbody > tr:nth-child(2)",
					 + ", body > table > tbody > tr:nth-child(2) > td > table",
					 + ", body > table > tbody > tr:nth-child(2) > td > center",
					 + ", body > table > tbody > tr:nth-child(5)",
					 + ", body > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(1)",
					 + ", body > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(6)")
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
				viewModel.getActionDelay().style.display = "none";
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
						actions.warpToBeast();
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
			}, getDelay(newFightDelay * 2), viewModel.selectors.actionSubmit);
		}
		function getNextUnwantedItem() {
			console.log("getNextUnwantedItem");
			var select = viewModel.getTarget();

			for (var i = 0; i < select.options.length; i++) {
				var isEquipped = select.options[i].textContent.indexOf("EQUIPPED") > -1;
				var isDivider = select.options[i].textContent.indexOf("_") > -1;
				var wanted = wantItem(select.options[i].textContent);

				if (!isEquipped && !wanted && !isDivider) {
					return select.options[i].value;
				}
			}

			return null;
		}

		function wantItem(text) {
			console.log("wantItem", text);
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
				// "Cara",
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
		function submitGeneralAction(action, target, other, othera, otherb) {
			var form = top.frames.main.document.getElementById("skipform");
			form.action.value = action;
			form.target.value = target;
			form.other.value = other;
			form.othera.value = othera;
			form.otherb.value = otherb;
			window.frames[0].pollzero(form, 0, true);
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

			return new Promise(function (resolve, reject) {
				setTimeout(function () {
					resolve();
				}, getDelay(reviveDelay));
			})
			.then(function () {
				resolveAction(function () {
					parent.frames[0].window.revive();
				}, getDelay(standardDelay / 2), viewModel.selectors.actionSubmit);
			})
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
			var burnMe = getNextUnwantedItem();
			if (!burnMe) {
				done = true;
				return Promise.reject();
			}
			return selectOptionByValue(viewModel.getTarget(), burnMe, true)
			.then(function () {
				return resolveAction(function () {
					viewModel.getActionSubmit().click();
				}, getDelay(newFightDelay), viewModel.selectors.response);
			});		}
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
			return resolveAction(function () {
				submitGeneralAction("ts", getOptionValueByText(viewModel.getTarget(), type), getOptionValueByText(viewModel.getOther(), item));
			}, (newFightDelay * 2) * (1 + 4 * selectCraftable.selectedIndex / selectCraftable.options.length), null)
			.then(function () {
				if (isTrivial()) {
					viewModel.getCraftQualitySelect().selectedIndex += 1;
				}
				if (craftingFailed()) {
					reject();
				} else {
					console.log("resolving craft");
					resolve();
				}
			});
		}
		function sell(item) {
			console.log("sell");
			setAction("Sell");
			setTarget(item);
			return resolveAction(function () {
				submitGeneralAction("sell", getOptionValueByText(viewModel.getTarget(), type));
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

			var dirs = [3, 0, 2, 2, 1, 1, 3, 3];
			var returnMe = null;
			var promiseChain = new Promise(function (resolve, reject) {
					if (isBeastHere()) {
						var beast = creatures.filter(function (x) {
								return x !== "" && x !== "99999"
							})[0];
						resolveAction(function () {
							submitGeneralAction("battle", beast);
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
						var beast = creatures.filter(function (x) {
								return x !== "" && x !== "99999"
							})[0];
						return resolveAction(function () {
							submitGeneralAction("battle", beast);
						}, getDelay(rapidDelay), viewModel.selectors.actionSubmit);
					},
						function () {
						console.log("findBeastRejectHandler");
						return new Promise(function (resolve, reject) {
							move(dir)
							.then(function () {
								if (isBeastHere()) {
									// var beast = creatures.filter(function (x) {
									// return x !== "" && x !== "99999"
									// })[0];

									// return resolveAction(function () {
									// submitGeneralAction("battle", beast);
									// }, getDelay(rapidDelay), viewModel.selectors.actionSubmit);

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
			return creatures.filter(function (x) {
				return x !== "" && x !== "99999"
			}).length > 0;
		}
		function teleport(x, y) {
			// setAction("Teleport");

			return new Promise(function (resolve, reject) {

				// waitForDOM(window.frames[0].document, viewModel.selectors.other, null, function () {

				// viewModel.getTarget().value = x;
				// viewModel.getOther().value = y;

				resolveAction(function () {
					submitGeneralAction("tele", x, y);
				}, getDelay(standardDelay), viewModel.selectors.actionSubmit)
				.then(function () {
					// if (viewModel.getResponseMessage().indexOf("purchase") > -1) {
					// reject();
					// } else {
					console.log("resolving teleport", x, y);
					resolve();
					// }
				}, function () {
					console.log("rejecting teleport", x, y);
					reject();
				});
				// }, function () {}, null);
			});
		}
		function buyRune() {
			// setKingdomAction("Runes");

			return new Promise(function (resolve, reject) {
				// waitForDOM(window.frames[0].document, viewModel.selectors.kingdomOtherA, null, function () {
				// setKingdomOtherA("1");

				resolveAction(function () {
					submitGeneralAction("rune", "", "", "1", "");

					// viewModel.getKingdomActionSubmit().click();
				}, getDelay(newFightDelay), viewModel.selectors.actionSubmit)
				.then(function () {
					console.log("resolving buy rune");
					resolve();
				});
				// }, function () {}, null);
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
					// reject();
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
						return Promise.reject();
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
					if (viewModel.getResponseMessage().indexOf("You do not have the gear") > -1) {
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
			// setKingdomAction("Embezzle");
			// setKingdomOtherA("254000000");
			return resolveAction(function () {
				submitGeneralAction("embezzle", "", "", "254000000", "");
				// clickKingdomActionSubmit();
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
	} else {
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
	return viewModel.getResponseMessage()
	.indexOf("failed") > -1;
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
	uiSetup.setStyleAttributes();

}, 5000);
