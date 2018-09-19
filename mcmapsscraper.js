(function ()
{
	const baseUrl = "http://www.minecraftmaps.com/adventure-maps";

	const key = "mcaddresses";
	const baseMapUrl = "/adventure-maps/";
	const urlRegex = /(?<=href="\/adventure-maps\/)([\w\/.\-_+&#@% ]+)(?=")/g;
	const versionRegex = /(?<=MC Version:[\s\S]+?)1\.1[23]/;
	const ratingRegex = /id="rating[\s\S]+width:([789][0-9])/;
	const getMatch = (regex, string) =>
	{

		let match = string.match(regex);

		if (!!match)
		{
			// console.log("match", regex, match);
			return match;
		}
		else
		{
			// console.log("no match found");
			return false;
		}
	};
	const responseHandler = response =>
	{
		if (response.ok)
		{
			return Promise.resolve(response);
		}
		else
		{
			return Promise.reject(new Error("failed to load"));
		}
	};
	const processMap = (link) =>
	{

		const processMapDetails = response =>
		{
			console.log("processMapDetails", response);
			response.text()
			.then(detail =>
			{
				if (!!detail)
				{
					let match = getMatch(versionRegex, detail);

					if (!!match)
					{
						return Promise.resolve(detail);
					}
				}
			}
			)
			.then(detail =>
			{
				if (!!detail)
				{
					let match = getMatch(ratingRegex, detail);

					if (!!match)
					{
						console.log("map is good");
						return Promise.resolve(true);
					}
				}
			}
			)
			.then((open) =>
			{
				console.log("open", open);
				console.log("checking if should open", link);
				if (open)
				{
					console.log("opening");
					// let linkArr = localStorage.getItem("correctversionmapurls");
					// linkArr.push(link);
					// localStorage.setItem("correctversionmapurls", link);

					savedLinks.push(link);
					
					// window.open(baseUrl + "/" + link);
				}
			}
			);
		};

		console.log("processMap", link);
		// let mapArr = localStorage.getItem("mapurls");
		// mapArr.push(link);
		// localStorage.setItem("mapurls", mapArr);

		fetch(baseUrl + "/" + link)
		.then(responseHandler)
		.then(processMapDetails)
		.then(data => console.log(savedLinks););
	};
	const getMap = response =>
	{
		console.log("getMap", response);

		response.text()
		.then(responseText =>
		{
			if (!!responseText)
			{

				let match = getMatch(urlRegex, responseText);

				if (!!match)
				{
					return Promise.resolve(match);
				}
			}
		}
		)
		.then((maps) =>
		{
			maps.forEach(m =>
			{
				processMap(m);
			}
			);
		}
		);
	};

	NodeList.prototype.forEach = Array.prototype.forEach;
let savedLinks = [];
	// let mapUrls = localStorage.getItem("mapurls");
	// let correctMaps = localStorage.getItem("correctversionmapurls");
	// if (!mapUrls || !mapUrls.push)
	// {
	// localStorage.setItem("mapurls", []);
	// }
	// if (!correctMaps || !correctMaps.push)
	// {
	// localStorage.setItem("correctversionmapurls", []);
	// }
	getLinks();

	function getLinks()
	{
		let string = "";
		for (let i = 0; i < 500; i += 10)
		{
			fetch(baseUrl + "?limitstart=" + i)
			.then(responseHandler)
			.then(getMap);
		}
	}

	var CACHE_VERSION = 1;

	// Shorthand identifier mapped to specific versioned cache.
	var CURRENT_CACHES =
	{
		mapUrls: 'mapUrls' + CACHE_VERSION,
		mapDetails: 'mapDetails' + CACHE_VERSION
	};

	self.addEventListener('activate', function (event)
	{
		var expectedCacheNames = Object.values(CURRENT_CACHES);

		// Active worker won't be treated as activated until promise
		// resolves successfully.
		event.waitUntil(
			caches.keys().then(function (cacheNames)
			{
				return Promise.all(
					cacheNames.map(function (cacheName)
					{
						if (!expectedCacheNames.includes(cacheName))
						{
							console.log('Deleting out of date cache:', cacheName);

							return caches.delete(cacheName);
						}
					}
					));
			}
			));
	}
	);

	self.addEventListener('fetch', function (event)
	{
		console.log('Handling fetch event for', event.request.url);

		event.respondWith(

			// Opens Cache objects that start with 'font'.
			caches.open(CURRENT_CACHES.mapUrls).then(function (cache)
			{
				return cache.match(event.request).then(function (response)
				{
					if (response)
					{
						console.log('Found response in cache:', response);

						return response;
					}

					console.log('Fetching request from the network');

					return fetch(event.request).then(function (networkResponse)
					{
						cache.put(event.request, networkResponse.clone());

						return networkResponse;
					}
					);
				}
				).catch(function (error)
				{

					// Handles exceptions that arise from match() or fetch().
					console.error('Error in fetch handler:', error);

					throw error;
				}
				);
			}
			));
	}
	);

}
)();
