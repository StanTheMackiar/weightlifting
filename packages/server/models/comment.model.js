export const buildComment = ({ name, comment }) => ({
	name: name?.trim() || "Anonimo",
	comment: comment?.trim(),
	createdAt: new Date(),
});
