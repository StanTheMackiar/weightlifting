import { buildComment } from "../models/comment.model.js";
import * as commentsService from "../services/comments.service.js";

export const listComments = async (_req, res) => {
	try {
		const comments = await commentsService.getComments();
		res.json(comments);
	} catch (error) {
		res
			.status(500)
			.json({ message: `Error obteniendo comentarios: ${error.message}` });
	}
};

export const postComment = async (req, res) => {
	try {
		const { name, comment } = req.body;

		if (!name || !comment) {
			return res.status(400).json({ message: "Datos incompletos" });
		}

		const data = buildComment({ name, comment });
		const created = await commentsService.createComment(data);

		res.status(201).json(created);
	} catch (error) {
		res
			.status(500)
			.json({ message: `Error creando comentario: ${error.message}` });
	}
};
