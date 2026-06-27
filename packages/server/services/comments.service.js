import { db } from "../config/firebase.js";

const COLLECTION = "comments";

export const getComments = async () => {
	const snapshot = await db
		.collection(COLLECTION)
		.orderBy("createdAt", "asc")
		.get();

	return snapshot.docs.map((doc) => ({
		id: doc.id,
		...doc.data(),
	}));
};

export const createComment = async (data) => {
	const ref = await db.collection(COLLECTION).add(data);
	return { id: ref.id, ...data };
};
