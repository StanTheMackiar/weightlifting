const themeKey = "weightlifting-theme";

export function getSavedTheme() {
	return localStorage.getItem(themeKey) || "light";
}

export function saveTheme(theme) {
	localStorage.setItem(themeKey, theme);
}
