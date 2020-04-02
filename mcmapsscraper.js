(function () {
	const baseUrl = "https://www.minecraftmaps.com";
	const getMatch = (regex, string) => {
		// console.log("match", regex, string);

		let match = string.match(regex);

		if (!!match) {
			// console.log("match returning", match);
			return match;
		} else {
			// console.log("no match found");
			return [];
		}
	};
	const responseHandler = response => {
		if (response.ok) {
			return Promise.resolve(response);
		} else {
			return Promise.reject(new Error("failed to load"));
		}
	};
	const processMap = (link) => {
		// console.log("processMap", link);

		return fetch(baseUrl + link)
		.then(responseHandler)
		.catch(function (err) {
			console.log("request failed", err);
		})
		.then(function (response) {
			return processMapDetails(response, link);
		});
	};

	const getMap = response => {
		// console.log("getMap");
		if (!!response) {
			return response.text()
			.then(responseText => {
				// console.log("response text", responseText);
				if (!!responseText) {
					const mapRegex = /(?<=href=")(\/[\w]+-maps\/[\w\/.\-_+&#@% ]+)(?=")/g;
					let matches = getMatch(mapRegex, responseText);

					if (!!matches && matches.length > 0) {
						let promises = [];
						// console.log("maps to process", matches);

						matches.forEach(m => {
							promises.push(processMap(m));
						});

						return new Promise(function (resolve, reject) {
							Promise.all(promises).then(function (result) {
								resolve();
							});
						});
					}
				}
				return Promise.resolve(false);
			});
		}
		return Promise.resolve(false);
	};
	const processMapDetails = (response, link) => {
		// console.log("processMapDetails");
		if (!!response) {

			return response.text()
			.then(detail => {
				if (!!detail) {
					const versionRegex = /<td><span style="color: #ffffff;">MC Version:<\/span><\/td>\s*<td><span style="color: #5e9b17;">1.1[45](?:[.\d]*)?<\/span><\/td>/;

					let versionMatch = getMatch(versionRegex, detail);

					if (versionMatch && versionMatch.length > 0) {
						const ratingRegex = /id="rating[\s\S]+width:([789][0-9])/;

						let ratingMatch = getMatch(ratingRegex, detail);

						if (!!ratingMatch && ratingMatch.length > 0) {
							if (savedLinks.indexOf(link) === -1) {
								savedLinks.push(link);
							}
							return Promise.resolve(true);
						}
					}
				}
				return Promise.resolve(false);
			});
		}
		return Promise.resolve(false);
	};

	const download = function (url, filename) {
		fetch(url).then(function (t) {
			return t.blob().then((b) => {
				var a = document.createElement("a");
				a.href = URL.createObjectURL(b);
				a.setAttribute("download", filename);
				a.click();
			});
		});
	};

	NodeList.prototype.forEach = Array.prototype.forEach;
	let savedLinks = [];
	getLinks();

	function getLinks() {
		let failed = false;
		let promises = [];
		for (let i = 0; i < 500; i += 15) {
			if (!failed) {
				promises.push(
					fetch(baseUrl + "/all-maps" + "?limitstart=" + i)
					.then(responseHandler)
					.catch(function (err) {
						failed = true;
					})
					.then(getMap));
			}
		}

		Promise.all(promises)
		.then(data => {
			console.log("saved links", savedLinks.sort());
			savedLinks
			.filter(link => link.indexOf("adventure") > -1)
			.forEach(link => download(baseUrl + link + "/download", link.replace("/", "-")));
		});
	}

	var CACHE_VERSION = 1;

	// Shorthand identifier mapped to specific versioned cache.
	var CURRENT_CACHES = {
		mapUrls: 'mapUrls' + CACHE_VERSION,
		mapDetails: 'mapDetails' + CACHE_VERSION
	};

	self.addEventListener('activate', function (event) {
		var expectedCacheNames = Object.values(CURRENT_CACHES);

		// Active worker won't be treated as activated until promise
		// resolves successfully.
		event.waitUntil(
			caches.keys().then(function (cacheNames) {
				return Promise.all(
					cacheNames.map(function (cacheName) {
						if (!expectedCacheNames.includes(cacheName)) {
							console.log('Deleting out of date cache:', cacheName);

							return caches.delete(cacheName);
						}
					}));
			}));
	});

	self.addEventListener('fetch', function (event) {
		console.log('Handling fetch event for', event.request.url);

		event.respondWith(

			// Opens Cache objects that start with 'font'.
			caches.open(CURRENT_CACHES.mapUrls).then(function (cache) {
				return cache.match(event.request).then(function (response) {
					if (response) {
						console.log('Found response in cache:', response);

						return response;
					}

					console.log('Fetching request from the network');

					return fetch(event.request).then(function (networkResponse) {
						cache.put(event.request, networkResponse.clone());

						return networkResponse;
					});
				}).catch(function (error) {

					// Handles exceptions that arise from match() or fetch().
					console.error('Error in fetch handler:', error);

					throw error;
				});
			}));
	});

})();
