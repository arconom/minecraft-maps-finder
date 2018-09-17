(function ()
{
	const baseUrl = "http://www.minecraftmaps.com/adventure-maps";

	const key = "mcaddresses";
	const baseMapUrl = "/adventure-maps/";
	const urlRegex = /(?<=href="\/adventure-maps\/)([\w\/.\-_+&#@% ]+)(?=")/g;
	const versionRegex = /(?<=MC Version:.+?)1\.1[23]/;
	const getMatchPromise = function (regex, response)
	{

		return new Promise(function (resolve, reject)
		{
			response.text()
			.then(str =>
			{
				let match = str.match(regex);

				if (!!match)
				{
					console.log("match", regex, match);
					resolve(match);
				}
				else
				{
					console.log("no match found");
					reject();
				}
			}
			);
		}
		)
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

	let httpRequest;
	let done = false;
	NodeList.prototype.forEach = Array.prototype.forEach;

	getLinks();

	function getLinks()
	{
		let string = "";
		let promises = [];
		for (let i = 0; i < 500; i += 10)
		{
			promises.push(fetch(baseUrl + "?limitstart=" + i)
				.then(responseHandler));
		}

		Promise.all(promises)
		.then(responses =>
		{
			let urlPromises = [];
			responses.forEach(response =>
			{
				urlPromises.push(getMatchPromise(urlRegex, response));
			}
			);

			Promise.all(urlPromises)
			.then(links =>
			{
				// console.log("returning links", links);
				return Promise.resolve(links.reduce((a, c) => a.concat(c)));
			}
			)
			.then((links) =>
			{

				console.log("links", links);

				let mapUrlPromises = [];
				links.forEach(link =>
				{

					mapUrlPromises.push(fetch(baseUrl + "/" + link)
						.then(responseHandler));
				}
				);

				Promise.all(mapUrlPromises)
				.then(responses =>
				{

					let versionPromises = [];
					console.log("finding versions", responses);
					responses.forEach(response =>
					{
						versionPromises.push(getMatchPromise(versionRegex, response));
					}
					);

					Promise.all(versionPromises)
					.then((links2) =>
					{
						console.log("open these", links2);
						links2.forEach(link => window.open(link));
					}
					);
				}
				)

			}
			);

		}
		)
	}
}
)();
