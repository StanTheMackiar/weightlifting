const form = document.querySelector("#commentForm");
const list = document.querySelector("#commentsList");
const message = document.querySelector("#formMessage");

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "";
const commentsEndpoint = apiBaseUrl ? `${apiBaseUrl}/comments` : "";
const localCommentsKey = "weightlifting-comments";

function getLocalComments() {
	const savedComments = localStorage.getItem(localCommentsKey);
	return savedComments ? JSON.parse(savedComments) : [];
}

function saveLocalComment(comment) {
	const comments = getLocalComments();
	comments.unshift(comment);
	localStorage.setItem(localCommentsKey, JSON.stringify(comments));
}

function renderComments(comments) {
	list.innerHTML = "";

	if (comments.length === 0) {
		list.innerHTML = "<li>No hay comentarios todavia.</li>";
		return;
	}

	comments.forEach((item) => {
		const li = document.createElement("li");
		const name = document.createElement("strong");
		const lineBreak = document.createElement("br");
		const comment = document.createTextNode(item.comment);

		name.textContent = item.name;
		li.append(name, lineBreak, comment);
		list.appendChild(li);
	});
}

async function loadComments() {
	if (!commentsEndpoint) {
		renderComments(getLocalComments());
		return;
	}

	try {
		const response = await fetch(commentsEndpoint);
		const comments = await response.json();
		renderComments(comments);
	} catch (error) {
		console.error(error);
		renderComments(getLocalComments());
	}
}

form.addEventListener("submit", async (event) => {
	event.preventDefault();

	const formData = new FormData(form);
	const comment = {
		name: formData.get("name").trim(),
		comment: formData.get("comment").trim(),
		createdAt: new Date().toISOString(),
	};

	if (!comment.name || !comment.comment) {
		message.textContent = "Por favor completa todos los campos.";
		return;
	}

	if (commentsEndpoint) {
		try {
			await fetch(commentsEndpoint, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(comment),
			});
			message.textContent = "Comentario enviado al backend.";
		} catch (error) {
			console.error(error);
			saveLocalComment(comment);
			message.textContent = "Backend no disponible. Guardado localmente.";
		}
	} else {
		saveLocalComment(comment);
		message.textContent = "Comentario guardado localmente.";
	}

	form.reset();
	loadComments();
});

loadComments();
