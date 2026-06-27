function getErrorMessage(response) {
	return `Error ${response.status}: ${response.statusText || "respuesta invalida"}`;
}

export async function getJson(url) {
	const response = await fetch(url);

	if (!response.ok) {
		throw new Error(getErrorMessage(response));
	}

	return response.json();
}

export async function postJson(url, body) {
	const response = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	});

	if (!response.ok) {
		throw new Error(getErrorMessage(response));
	}

	return response.json();
}
