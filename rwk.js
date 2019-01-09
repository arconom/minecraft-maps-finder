
/*property
    Augment, Chainify, DateRangeFiltering, Debounce, DynamicSort,
    DynamicSortMultiple, FilterByQuery, FindRegex, GenerateGUID,
    GetAttributeSelector, GetId, GetKeyValuePairs, GetProperty,
    GetViewportDimensions, Mix, SortNumber, TextareaMouseUp, TextareaResize,
    TransformAllMatches, apply, clientHeight, clientWidth, dataset,
    documentElement, exec, findRegex, forEach, getAttribute, height, id,
    indexOf, innerHeight, innerWidth, keys, length, log, max, offsetHeight,
    offsetWidth, parentElement, prototype, push, query, random, replace,
    scrollHeight, search, style, substr, test, toLowerCase, toString, trim,
    value, width
*/
var Helper =
{
    /*
    Adds a function to execute during every function within window.
    Functions created after this executes are not affected.

    @param {function} withFn - apply this function to all functions in window
    */
    augment: function (withFn)
    {
        var name,
            fn;

        for (name in window)
        {
            fn = window[name];

            if (typeof fn === "function")
            {
                window[name] = (function (name, fn)
                {
                    var args = arguments;

                    return function ()
                    {
                        withFn.apply(this, args);
                        return fn.apply(this, arguments);
                    };
                })(name, fn);
            }
        }
    },

    /**
    * Alters the prototype of an object to make each function
    * @param {object} obj will have its prototype altered
    */
    chainify: function (obj)
    {
        Object.keys(obj).forEach(function (key)
        {
            var member = obj[key];
            if (typeof member === "function" && !(/\breturn\b/).test(member))
            {
                obj[key] = function ()
                {
                    member.apply(this, arguments);
                    return this;
                };
            }
        });
    },

    cssManipulation:
    {
        /*
        This adds some CSS to the page
        */
        AddStyleSheet: function (content)
        {
            //for cross browser compatibility, use the following commented statement
            //var cssRuleCode = document.all ? 'rules' : 'cssRules'; //account for IE and FF

            document.querySelector("head").appendChild(this.CreateStyleSheet(content));
        },

        /*
        This function creates a style sheet and returns it.
        */
        CreateStyleSheet: function (content)
        {
            var style = document.createElement("style");
            var styleSheet = style.styleSheet;

            if (styleSheet)
            {
                stylesheet.cssText = content;
            }
            else
            {
                style.appendChild(document.createTextNode(content));
            }

            style.type = "text/css";
            return style;
        }
    },

    /*
    I copy source's prototype to destination's prototype!
    source is an object
    destination is an object
    */
    debounce: function (func, threshold, execAsap)
    {
        var timeout;

        return function debounced()
        {
            var obj = this,
                args = arguments;

            function delayed()
            {
                if (!execAsap)
                {
                    func.apply(obj, args);
                }

                timeout = null;
            }

            if (timeout)
            {
                clearTimeout(timeout);
            }
            else if (execAsap)
            {
                func.apply(obj, args);
            }

            timeout = setTimeout(delayed, threshold || 100);
        };
    },

    events: {
        // addEventListener wrapper:,
        $on: function (target, type, callback, useCapture)
        {
            console.log("Helper.&on");
            if (target !== null)
            {
                // if the browser is old
                if (!target.addEventListener)
                {
                    target.attachEvent(type, callback);
                }
                else
                {
                    target.addEventListener(type, callback, !!useCapture);
                }
            }
        },

        // Attach a handler to event for all elements that match the selector,
        // now or in the future, based on a root element
        $delegate: function (target, selector, type, handler)
        {
            console.log("Helper.&delegate");
            var that = this;

            function dispatchEvent(event)
            {
                var targetElement = event.target;
                var potentialElements = that.qsa(selector, target);
                var hasMatch = Array.prototype.indexOf.call(potentialElements, targetElement) >= 0;

                if (hasMatch)
                {
                    handler.call(targetElement, event);
                }
            }

            // https://developer.mozilla.org/en-US/docs/Web/Events/blur
            var useCapture = type === 'blur' || type === 'focus';

            this.$on(target, type, dispatchEvent, useCapture);
            //window.$on(target, type, dispatchEvent, useCapture);
        },
    },

    /**
    * Filters items based on the given query
    * @param {object} query is an object with the desired key/value
    * @param {object} item is to be compared to query
    * @returns {bool}
    */
    filterByQuery: function (query, item)
    {
        console.log("Helper.filterByQuery");

        Object.keys(query).forEach(function (key)
        {
            if (item[key] !== undefined)
            {
                if (String(item[key]).toLowerCase().indexOf(query[key].toLowerCase()) === -1)
                {
                    return false;
                }
            }
            else
            {
                return false;
            }
        });
        return true;
    },

    formatting: {
        /**
        * Formats money
        * @param {number} price is a numeric value without notation
        * @returns {string} a formatted monetary value
        */
        money: function (price)
        {
            var p = parseFloat(price).toFixed(2).split(".");
            return "$" + p[0].split("").reverse().reduce(function (acc, num, i, orig)
            {
                return num + (i && !(i % 3) ? "," : "") + acc;
            }, "") + "." + p[1];
        },
        /**
        * Adjusts precision to 2 places, then strips out invalid values
        * @param {number} price
        * @returns {number/string}
        */
        price: function (price)
        {
            var val = parseFloat(Math.round(price * 100) / 100).toFixed(2);
            return val == 'NaN' ? '' : val == 'Infinity' ? '' : val;
        },
        /**
        * Formats the date with the given separator
        * @param {string} date
        * @param {string} separator defaults to /
        * @returns {string}
        */
        date: function (date, separator/* separator = "/" */)
        {
            if ((typeof date === "string") || (typeof date === "number"))
            {
                date = new Date(date);
            }
            if (!separator)
            {
                separator = "/";
            }
            if (date == undefined)
            {
                date = new Date();
            }

            return (date.getMonth() + 1) + separator + date.getDate() + separator + date.getFullYear();
        },
        //formatDate: function (value) {
        //    var monthNames = [
        //        "Jan",
        //        "Feb",
        //        "Mar",
        //        "Apr",
        //        "May",
        //        "Jun",
        //        "Jul",
        //        "Aug",
        //        "Sep",
        //        "Oct",
        //        "Nov",
        //        "Dec"
        //    ];
        //
        //    var date = new Date(value);
        //    var day = date.getDate();
        //    var monthIndex = date.getMonth();
        //    var year = date.getFullYear();
        //
        //    return day + " " + monthNames[monthIndex] + " " + year;
        //},

        /**
        * Gives the time portion of a DateTime
        * @param {string} date
        * @returns {string}
        */
        time: function (date)
        {
            if (typeof date === "string")
            {
                date = new Date(date);
            }

            return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        }
    },

    /**
    * @returns {string} a randomly generated guid
    */
    generateGuid: function ()
    {
        var template = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
        //    var template = "xxxxxxxxxxxxyxxxyxxxxxxxxxxxxxxx";
        var returnMe = template.replace(/[xy]/g, function (c)
        {
            var r = Math.random() * 16 | 0,
                v = c == "x" ? r
                /*
                 * What we're doing here is bitwise operations :
                 * 0x3.toString(2) => 11
                 * 0x8.toString(2) => 1000
                 * first a and with 11 at the bit level (truncating to only the two last bits, that is doing %4),
                 * then a or with 1000 (setting one bit, adding 8).
                 */
                : (r & 0x3 | 0x8);
            return v.toString(16);
        });

        return returnMe;
    },

    /*
     * Generates an id for an HTML element based on the guid generator, 
     * it removes the dashes because the DOM doesn't like them.
     * @return {string}
     */
    generateHTMLElementId: function ()
    {
        return "id" + this.generateGuid().split("-").join("");
    },

    //from viewrfq.js
    //getGuid: function () {
    //    console.log("getGuid");
    //    var d = new Date().getTime();
    //    var template = "xxxxxxxxxxxxyxxxyxxxxxxxxxxxxxxx";
    //    var uuid = template
    //        .replace(/[xy]/g, function (c) {
    //            var r = (d + Math.random() * 16) % 16 | 0;
    //            d = Math.floor(d / 16);
    //            return (c === "x" ? r : (r & 0x3 | 0x8)).toString(16);
    //        });
    //    return uuid;
    //},

    /**
    * Gets the requested property from a list of objects and returns an array with each value
    * @param {array} items is the list of objects to search
    * @param {string} property is the property to search for
    * @returns {array} a list of the values found
    */
    getProperty: function (items, property)
    {
        console.log("Helper.getProperty");
        var returnMe = [];

        items.forEach(function (item)
        {
            returnMe.push(item[property]);
        });

        return returnMe;
    },

    /**
    * get viewport dimensions,
    * @param {}
    * @returns {object} {width: x, height: y}
    */
    getViewportDimensions: function ()
    {
        var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        return { width: w, height: h };
    },

    html: {
        /**
        * Concatenates an attribute selector based on inputs
        * @param {string} attr
        * @param {string} value
        * @returns {string}
        */
        getAttributeSelector: function (attr, value)
        {
            var template = "[{{0}}=\"{{1}}\"]";
            return template
                .replace("{{0}}", attr)
                .replace("{{1}}", value);
        },

        // Get the key/value pairs from HTML controls and put them into a returned object
        // expects the control to have a key attribute
        /**
        * Iterate over a list of DOM elements, extracting their "key" attributes and their values,
        * and returning the result as an array.
        * @param {array} list
        * @param {bool} replaceEmpty
        * @returns {array}
        */
        getKeyValuePairs: function (list, replaceEmpty)
        {
            var returnMe = {};

            list.forEach(function (item)
            {
                var key = item.getAttribute("key");
                var value = item.value;

                if ((value !== "") && (value !== undefined))
                {
                    returnMe[key] = value.trim();
                }
                else if (replaceEmpty)
                {
                    returnMe[key] = key;
                }
            });

            return returnMe;
        },

        /**
        * Return the id for the given element, supporting older versions of IE
        * @param {object} element
        */
        getId: function (element)
        {
            console.log("Helper.getId");
            var returnMe = undefined;

            if (element.dataset)
            {
                returnMe = element.dataset.id;
            }
            else
            {
                returnMe = element.getAttribute("data-id");
            }

            return returnMe;
        },

        /**
        * Resize textareas to fit the text they contain
        * @param {object} el
        */
        textareaResize: function resize(el)
        {
            el.style.height = "auto";
            el.style.height = el.scrollHeight + "px";
        },

        /**
        * Prevent textareas from being bigger than their container
        * @param {object} sender
        */
        textareaMouseUp: function (sender)
        {
            var parent = sender.parentElement;
            var width = parent.offsetWidth + "px";
            var height = parent.offsetHeight + "px";

            sender.style.height = sender.style.height > height ?
                height : sender.style.height;

            sender.style.width = sender.style.width > width ?
                width : sender.style.width;
        },

        qs: function (selector, scope)
        {
            console.log("Helper.qs");
            var temp = scope || document;
            return temp.querySelector(selector);
        },

        qsa: function (selector, scope)
        {
            console.log("Helper.qsa");
            var temp = scope || document;
            return temp.querySelectorAll(selector);
        },
    },

    /**
    * concatenate arrays and delete duplicates
    * @param {array} source
    * @param {array} destination
    * @returns {array}
    */
    join: function (source, destination)
    {
        //console.log("join", source, destination);
        return destination.concat(source.filter(function (item)
        {
            return destination.indexOf(item) < 0;
        }));
    },

    json: {
        /**
         * determines whether or not the data is in a parseable format
         * and returns a parsed object if possible
         *
         * @param {string} data is JSON or an object
         * @returns {object} parsed data
         */
        tryParse: function (data)
        {
            if (typeof (data) === "string")
            {
                return JSON.parse(data);
            } else
            {
                return data;
            }
        }
    },

    math: {
        /*
        I try to parse an argument through math.js
        I return a parsed string
        */
        // todo this should probably move into a controller
        doMath: function (thing)
        {
            try
            {
                return math.eval(thing);
            }
            catch (e)
            {
                return thing;
            }
        },
    },

    /**
    * Mix one objects prototype into another's
    * @param {object} source
    * @param {object} destination
    */
    mix: function (source, destination)
    {
        console.log("Helper.mix");
        if ((source.prototype !== undefined) && (source.prototype.length > 0))
        {
            source.prototype.forEach(function (prop)
            {
                if (destination.prototype[prop] === undefined)
                {
                    destination.prototype[prop] = prop;
                }
            });
        }
        else
        {
            return;
        }
    },

    mvc: {
        getModelPrefix: function (guid)
        {
            return "Model." + guid + ".";
        },
        getControllerPrefix: function (guid)
        {
            return "Controller." + guid + ".";
        },
        getViewPrefix: function (guid)
        {
            return "View." + guid + ".";
        },
    },

    regex: {
        /**
        * Escapes a regex
        * @param {string} str is a regex
        */
        escape: function (str)
        {
            return str.replace(/([.*+?\^=!:${}()\|\[\]\/\\])/g, "\\$1");
        },

        /**
        * Uses a regex to search a string
        * @param {string} value
        * @param {string} regex
        * @returns {array} the original string and the first match
        */
        find: function (value, regex)
        {
            console.log("Helper.findRegex");

            if (!value || value === "")
            {
                return;
            }

            if (!value.indexOf)
            {
                return;
            }

            if (value.search(regex) !== -1)
            {
                return regex.exec(value);
            }
        },

        /**
        * I iterate through all matches of regex in value and run callback on each match
        * @param {string} value
        * @param {string} regex is what you're looking for
        * @param {function} callback is a thing you want to do.  it should return a string
        * @returns {string}
        */
        transformAllMatches: function (value, regex, callback)
        {
            console.log("Helper.transformAllMatches");
            var match = "";
            var returnMe = value;

            if (value)
            {
                match = Helper.findRegex(value, regex);

                while (match)
                {
                    returnMe = callback(returnMe, match, regex);
                    match = Helper.findRegex(returnMe, regex);
                }

                return returnMe;
            }
            else
            {
                return value;
            }
        },

        validDate: "(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])"
    },

    /**
    * Sets up infinite scrolling on the target,
    * using the callback
    * @param {object} scope is an object or a selector that constrains the find function.  
    * I added this to deal with shadow DOM.
    * @param {string} selector identifies the element that has scrolling enabled
    * @param {number} buffer a number of pixels in which the scroll bar can trigger the effect
    * @param {number} offset a number of pixels to use to account for margins
    * @param {function} callback is executed while the scroll position is within the buffer
    */
    setupInfiniteScroll: function (scope, selector, buffer, offset, callback)
    {
        if (!scope) { scope = document; }

        $(scope).find(selector).parent().scroll(
            //Helper.debounce(
            function ()
            {
                if ($(scope).find(selector).parent().scrollTop() >= $(scope).find(selector).height() - 200 + offset)
                {
                    callback();
                }
            });
        //}, 500, false));
    },

    sorting: {
        /**
        * Sort based on the given property
        * @param {string} property
        * @returns {function}
        */
        dynamicSort: function (property)
        {
            console.log("Helper.dynamicSort");
            var sortOrder = 1;

            if (!property)
            {
                return;
            }

            if (property[0] === "-")
            {
                sortOrder = -1;
                property = property.substr(1);
            }

            return function (a, b)
            {
                var first = a[property];
                var second = b[property];

                if (first.toLowerCase)
                {
                    first = first.toLowerCase();
                }

                if (second.toLowerCase)
                {
                    second = second.toLowerCase();
                }

                var result = (first < second) ?
                    -1 : (first > second) ?
                        1 : 0;

                return result * sortOrder;
            };
        },

        /**
        * Sort based on multiple properties
        * @returns {function}
        */
        dynamicSortMultiple: function ()
        {
            /*
             * save the arguments object as it will be overwritten
             * note that arguments object is an array-like object
             * consisting of the names of the properties to sort by
             */
            var props = arguments;

            return function (obj1, obj2)
            {
                var i = 0,
                    result = 0,
                    numberOfProperties = props.length;

                /* try getting a different result from 0 (equal)
                 * as long as we have extra properties to compare
                 */
                while (result === 0 && i < numberOfProperties)
                {
                    result = dynamicSort(props[i])(obj1, obj2);
                    i += 1;
                }

                return result;
            };
        },

        /**
        * Returns true if the value is between the min and max values
        * @param {object} min
        * @param {object} max
        * @param {object} value
        * @returns {bool}
        */
        between: function (min, max, value)
        {
            if (min === "" && max === "")
            {
                return true;
            }
            else if (min <= value && max === "")
            {
                return true;
            }
            else if (max >= value && min === "")
            {
                return true;
            }
            else if (min <= value && max >= value)
            {
                return true;
            }
            return false;
        },

        numeric: function (a, b)
        {
            return a - b;
        }
    },

    stringManipulation: {
        /**
        * Cleans JSON of extra escape characters
        * @param {string} json
        * @returns {string}
        */
        cleanJSON: function (json)
        {
            var returnMe = json;
            return replaceAll(returnMe, "/\r|\n|\\/g", "");
        },
        /**
        * Replace all instances of a string within a context with another string
        * @param {string} str
        * @param {string} find
        * @param {string} replace
        * @returns {string}
        */
        replaceAll: function (str, find, replace)
        {
            console.log("replaceAll", str, find, replace);
            return str.replace(new RegExp(escapeRegExp(find), "g"), replace);
        }
    },

    webStorage: {
        /*
        * Determine which data store to access based on browser support
        *
        * @param {string} key - the index of WebStorage
        * @param {function(data)} callback - executes logic on the returned data
        */
        getDataFromStore: function (key, callback)
        {
            console.log("getDataFromStore");

            if (WebStorage.local)
            {
                if (!WebStorage.local[key])
                {
                    WebStorage.local[key] = [];
                }
                callback(WebStorage.local[key]);
            }
            else
            {
                data.read(callback(data));
            }
        },

        /*
        * fold the items in the parameter into the data store
        * data is an object or an array of objects
        *
        * @param {object} saveMe - the data to save
        * @param {string} key - the index in WebStorage to save into
        */
        saveDataToStore: function (saveMe, key)
        {
            console.log("saveToDataStore", saveMe, key);
            if (WebStorage.local)
            {
                if (!WebStorage.local[key])
                {
                    WebStorage.local[key] = [];
                }
                console.log("storing in localStorage");
                WebStorage.local[key] = this.join(saveMe, WebStorage.local[key]);
            }
            else
            {
                console.log("storing in Collection");

                saveMe.forEach(function (me)
                {
                    data.create(me, function () { });
                });
            }
        },
        
        getParameterByName: function(name, url) 
        {
            var regex, results;
            
            if (!url) 
            {
                url = window.location.href;
            }
            
            name = name.replace(/[\[\]]/g, "\\$&");
            regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
            results = regex.exec(url);
            
            if (!results) 
            {
                 return null;
            }
            if (!results[2]) 
            {
                return '';
            } 
            
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        }
    }
};


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
		"Devil"
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

// center.style.display = "none";

setOptions(getMainFrameElement("#selectCraftable"), getCraftTypeList(getMainFrameElement("#selectCraftType").value));
selectOptionByText("#selectCraftable", "Rusty Dagger");
getMainFrameElement(selectors.actionDelay).style = "display: none";

// Helper.cssManipulation.AddStyleSheet(selectors.kingdomTable + "{width: 10em; float: right;}" 
// + selectors.playerTable + "{width: 10em; float: left;}"
// + selectors.windowTable + "{}"
// );
