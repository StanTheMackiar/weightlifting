import { Router } from "express";
import {
	listComments,
	postComment,
} from "../controllers/comments.controller.js";

const commentsRouter = Router();

commentsRouter.get("/", listComments);
commentsRouter.post("/", postComment);

export default commentsRouter;
