// gattack("attack");
// gattack("cast");
// gattack("lattack");
// gattack("rattack");
// gattack("defend");

var selectors =
{
	actionsSelect: "select[name=\"action\"]",
	teleportOption: "option[value=\"tele\"]",
	actionSubmit: "#s_subbut > input[type=\"image\"]",
	fightButtons: "#s_FightWin",
	castButton: "#s_FightWin > img:nth-child(2)",
	durButton: "img[onmousedown=\"level(3)\"]",
	reviveButton: "img[onmousedown=\"revive()\"]",
	security: "#s_Response img"
};
var mainFrame = document.querySelector("html > frameset > frame:nth-child(1)");

var promise = new Promise(function (resolve, reject)
	{
		resolve();
	}
	);

var standardDelay = 10000, reviveDelay = 22000, rapidDelay = 6000, newFightDelay = 1000, counter = 0;

var cancelMove = false;

//main driver
function selectAction(delay)
{
	if (counter < 10)
	{
		setTimeout(function ()
		{
			if (top.ActionDelay > 0)
			{
				selectAction(top.ActionDelay);
			}
			else
			{
				setTimeout(function ()
				{
					if (document.querySelector(selectors.security))
					{
						alert("security");
					}
					//if dead revive
					else if (document.querySelector(selectors.reviveButton))
					{
						setTimeout(function ()
						{
							promise.then(function (resolve, reject)
							{
								return new Promise(function (resolve, reject)
								{
									// console.log("reviving");
									revive()
									resolve();
									selectAction(1000);
								}
								);
							}
							);
						}, reviveDelay);
					}
					//if level up buttons
					else if (document.querySelector(selectors.durButton))
					{
						promise.then(function (resolve, reject)
						{
							return new Promise(function (resolve, reject)
							{

								// console.log("leveling up");
								level(3);
								counter++;
								resolve();
								selectAction(standardDelay);
							}
							);
						}
						);
					}
					else if (document.querySelector(selectors.castButton))
					{
						promise.then(function (resolve, reject)
						{
							return new Promise(function (resolve, reject)
							{
								// console.log("attacking");
								gattack("cast");
								resolve();
								selectAction(standardDelay);
							}
							);
						}
						);
					}
					else if (document.querySelector(selectors.actionSubmit))
					{
						promise.then(function (resolve, reject)
						{
							return new Promise(function (resolve, reject)
							{
								// console.log("new fight");
								document.querySelector(selectors.actionSubmit).click();
								resolve();
								selectAction(newFightDelay);
							}
							);
						}
						);
					}
					else
					{}
				}, Math.max(delay, top.ActionDelay * 2));
			}
		}, 1000);
	}
	else
	{
		alert("done");
	}
}

function move(x, y)
{
	console.log("move", x, y);
	var ntl = parseInt(document.querySelector("#s_Ntl").textContent),
	limit = Math.sqrt(ntl / 100);
	var loc = scrapeLocation();

	if (((loc.x !== x) || (loc.y !== y)) && !cancelMove)
	{
		promise.then(function (resolve, reject)
		{
			return new Promise(function (resolve, reject)
			{
				console.log("move loop", loc.x, loc.y);

				document.querySelector("body > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(2) > td:nth-child(7) > select:nth-child(5)").value = x;
				document.querySelector("body > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(2) > td:nth-child(7) > select:nth-child(7)").value = y;
				document.querySelector(selectors.actionSelect).value = "tele";
				updateaction("tele", document.getElementById('general'));
				document.querySelector(selectors.actionSubmit).click();

				setTimeout(function ()
				{
					resolve();
				}, 6000);
			}
			);
		}
		);
	}
}

function calculateWarpPoint(limit, start, end)
{
	console.log("calculateWarpPoint", limit, start, end);

	var counter = 0;
	var returnMe = start;
	while ((limit > calculateManhattanDistance(start, returnMe))
		 && ((returnMe.x !== end.x) || (returnMe.y !== end.y)))
	{
		var steve = getVector(returnMe.x, end.x);
		returnMe.x += getVector(returnMe.x, end.x);

		if (limit > calculateManhattanDistance(start, returnMe))
		{
			returnMe.y += getVector(returnMe.y, end.y);
		}
		counter++;
	}
	return returnMe;
}

function calculateNtlCost(distance)
{
	console.log("calculateNtlCost", distance);
	return distance * distance * 100;
}

function calculateManhattanDistance(a, b)
{
	console.log("calculateManhattanDistance", a, b);
	return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

function scrapeLocation()
{
	console.log("scrapeLocation");
	var loc = document.querySelector("#s_Loc").textContent.split(",");
	var returnMe =
	{
		x: loc[0],
		y: loc[2]
	};
	return returnMe;
}

function getVector(a, b)
{
	console.log("getVector", a, b);
	return a > b ? -1 :
	a < b ? 1 :
	0;
}

function moveHandler()
{
	var x = prompt("enter target x");
	var y = prompt("enter target y");
	counter = 10;
	move(x, y);
	this.onclick = cancelMoveHandler;
	this.textContent = "cancel Move";
}
function cancelMoveHandler()
{
	cancelMove = true;
	this.onclick = moveHandler;
	this.textContent = "move";
}

(function ()
{

	var startButton = document.createElement("button");
	var stopButton = document.createElement("button");
	var copyButton = document.createElement("button");
	var moveButton = document.createElement("button");

	startButton.onclick = function ()
	{
		counter = 0;
		selectAction(0);
	};
	startButton.textContent = "Start";
	stopButton.onclick = function ()
	{
		counter = 10;
	};
	stopButton.textContent = "Stop";
	copyButton.onclick = function ()
	{
		counter = 10;
		console.log(document.body.outerHTML);
	};
	copyButton.textContent = "copy";
	moveButton.onclick = moveHandler;
	moveButton.textContent = "move";

	document.querySelector("center").appendChild(startButton);
	document.querySelector("center").appendChild(stopButton);
	document.querySelector("center").appendChild(copyButton);
	document.querySelector("center").appendChild(moveButton);
}
)();
