export function showCommentsStatus(statusElement, text) {
	if (statusElement) {
		statusElement.textContent = text;
	}
}

export function clearComments(listElement) {
	if (listElement) {
		listElement.innerHTML = "";
	}
}

export function renderComments(listElement, statusElement, comments) {
	clearComments(listElement);

	if (!comments.length) {
		showCommentsStatus(statusElement, "Todavia no hay comentarios.");
		return;
	}

	showCommentsStatus(statusElement, "");

	for (const item of comments) {
		const li = document.createElement("li");
		const name = document.createElement("strong");
		const lineBreak = document.createElement("br");
		const commentText = item.comment || item.message || "";

		name.textContent = item.name || "Anonimo";
		li.append(name, lineBreak, document.createTextNode(commentText));
		listElement.appendChild(li);
	}
}
