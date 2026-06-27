import { API_ENDPOINTS } from "../config/api.js";
import { getJson, postJson } from "./http.js";

function normalizeComments(data) {
	if (Array.isArray(data)) {
		return data;
	}

	if (Array.isArray(data?.comments)) {
		return data.comments;
	}

	return [];
}

export function hasCommentsApi() {
	return Boolean(API_ENDPOINTS.comments);
}

export async function getComments() {
	const data = await getJson(API_ENDPOINTS.comments);
	return normalizeComments(data);
}

export function createComment(comment) {
	return postJson(API_ENDPOINTS.comments, comment);
}
