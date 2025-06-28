"use server";

import { entertainments } from "./db/database";

export const getArticle = async (articleid: string) => {
	return entertainments.find((article) => article.id === articleid);
};
