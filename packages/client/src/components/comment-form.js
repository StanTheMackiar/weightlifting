import { createComment, hasCommentsApi } from "../services/comments-api.js";

function getCommentFromForm(form) {
	const formData = new FormData(form);

	return {
		name: formData.get("name").trim(),
		comment: formData.get("comment").trim(),
		createdAt: new Date().toISOString(),
	};
}

export function initCommentForm(form, messageElement, onCommentCreated) {
	if (!form) {
		return;
	}

	form.addEventListener("submit", async (event) => {
		event.preventDefault();

		const comment = getCommentFromForm(form);

		if (!comment.name || !comment.comment) {
			if (messageElement) {
				messageElement.textContent = "Por favor completa todos los campos.";
			}
			return;
		}

		if (!hasCommentsApi()) {
			if (messageElement) {
				messageElement.textContent = "No hay URL de backend configurada.";
			}
			return;
		}

		try {
			await createComment(comment);
			if (messageElement) {
				messageElement.textContent = "Comentario enviado.";
			}
			form.reset();
			onCommentCreated();
		} catch (error) {
			console.error(error);
			if (messageElement) {
				messageElement.textContent = "No se pudo enviar el comentario al backend.";
			}
		}
	});
}
