import CyrillicToTranslit from "cyrillic-to-translit-js";

const cyrillicToTranslit = new (CyrillicToTranslit as any)();

export const translate = (text: string) => {
	return cyrillicToTranslit
		.transform(text)
		.toLowerCase()
		.replace(/[^a-z0-9 ]/g, "")
		.trim()
		.split(" ")
		.join("-");
};
