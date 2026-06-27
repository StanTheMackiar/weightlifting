import { initCommentForm } from "../components/comment-form.js";
import {
	clearComments,
	renderComments,
	showCommentsStatus,
} from "../components/comments-list.js";
import { initThemeToggle } from "../components/theme-toggle.js";
import { dom } from "../config/dom.js";
import { getComments, hasCommentsApi } from "../services/comments-api.js";

async function loadComments() {
	if (!hasCommentsApi()) {
		clearComments(dom.commentsList);
		showCommentsStatus(
			dom.commentsStatus,
			"No hay URL de backend. Configura VITE_API_BASE_URL.",
		);
		return;
	}

	showCommentsStatus(dom.commentsStatus, "Cargando comentarios...");

	try {
		const comments = await getComments();
		renderComments(dom.commentsList, dom.commentsStatus, comments);
	} catch (error) {
		console.error(error);
		clearComments(dom.commentsList);
		showCommentsStatus(
			dom.commentsStatus,
			"No se pudieron cargar los comentarios desde el backend.",
		);
	}
}

export function initHomePage() {
	initThemeToggle(dom.themeButton);
	initCommentForm(dom.form, dom.formMessage, loadComments);
	loadComments();
}
