import * as keys from "./localStorage.keys";

export const getLocalStorage = (key: keyof typeof keys) => {
	return localStorage.getItem(keys[key]);
};

export const setLocalStorage = (key: keyof typeof keys, value: any) => {
	localStorage.setItem(keys[key], JSON.stringify(value));
};

export const deleteLocalStorage = (key: keyof typeof keys) => {
	localStorage.removeItem(keys[key]);
};

export const clearLocalStorage = () => {
	localStorage.clear();
};
