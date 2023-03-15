exports.queryParser = (query) => {
	let searchQuery;

	const keys = Object.keys(query);

	if (keys.length === 0) return;

	keys.forEach((key) => {
		if (key === "date") {
			searchQuery = {
				...searchQuery,
				[key]: new Date(query[key]),
			};
		} else {
			searchQuery = {
				...searchQuery,
				[key]: query[key],
			};
		}
	});

	return searchQuery;
};
