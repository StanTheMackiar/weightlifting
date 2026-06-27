const form = document.querySelector("#commentForm");
const list = document.querySelector("#commentsList");
const message = document.querySelector("#formMessage");
const commentsStatus = document.querySelector("#commentsStatus");
const themeButton = document.querySelector("#themeButton");

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "";
const commentsEndpoint = apiBaseUrl ? `${apiBaseUrl}/comments` : "";
const themeKey = "weightlifting-theme";

function setTheme(theme) {
	document.body.classList.toggle("dark", theme === "dark");
	themeButton.textContent = theme === "dark" ? "Modo claro" : "Modo oscuro";
	localStorage.setItem(themeKey, theme);
}

function loadTheme() {
	const savedTheme = localStorage.getItem(themeKey) || "light";
	setTheme(savedTheme);
}

function getErrorMessage(response) {
	return `Error ${response.status}: ${response.statusText || "respuesta invalida"}`;
}

async function readJsonResponse(response) {
	if (!response.ok) {
		throw new Error(getErrorMessage(response));
	}

	return response.json();
}

function normalizeComments(data) {
	if (Array.isArray(data)) {
		return data;
	}

	if (Array.isArray(data?.comments)) {
		return data.comments;
	}

	return [];
}

function renderComments(comments) {
	list.innerHTML = "";

	if (comments.length === 0) {
		commentsStatus.textContent = "Todavia no hay comentarios.";
		return;
	}

	commentsStatus.textContent = "";

	comments.forEach((item) => {
		const li = document.createElement("li");
		const name = document.createElement("strong");
		const lineBreak = document.createElement("br");
		const commentText = item.comment || item.message || "";

		name.textContent = item.name || "Anonimo";
		li.append(name, lineBreak, document.createTextNode(commentText));
		list.appendChild(li);
	});
}

async function loadComments() {
	if (!commentsEndpoint) {
		list.innerHTML = "";
		commentsStatus.textContent =
			"No hay URL de backend. Configura VITE_API_BASE_URL.";
		return;
	}

	commentsStatus.textContent = "Cargando comentarios...";

	try {
		const response = await fetch(commentsEndpoint);
		const data = await readJsonResponse(response);
		const comments = normalizeComments(data);
		renderComments(comments);
	} catch (error) {
		console.error(error);
		list.innerHTML = "";
		commentsStatus.textContent =
			"No se pudieron cargar los comentarios desde el backend.";
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

	if (!commentsEndpoint) {
		message.textContent = "No hay URL de backend configurada.";
		return;
	}

	try {
		const response = await fetch(commentsEndpoint, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(comment),
		});

		await readJsonResponse(response);
		message.textContent = "Comentario enviado.";
		form.reset();
		loadComments();
	} catch (error) {
		console.error(error);
		message.textContent = "No se pudo enviar el comentario al backend.";
	}
});

themeButton.addEventListener("click", () => {
	const nextTheme = document.body.classList.contains("dark") ? "light" : "dark";
	setTheme(nextTheme);
});

loadTheme();
loadComments();
