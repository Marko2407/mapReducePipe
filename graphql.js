function queryFetch(query, variables) {
	return fetch(PROD_URL, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			query: query,
			variables: variables,
		}),
	}).then((res) => res.json());
}
