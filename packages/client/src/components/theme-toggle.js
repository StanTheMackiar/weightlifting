import { getSavedTheme, saveTheme } from "../storage/theme-storage.js";

function applyTheme(theme, button) {
	document.body.classList.toggle("dark", theme === "dark");

	if (button) {
		const label =
			theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro";

		button.setAttribute("aria-label", label);
		button.setAttribute("title", label);
	}

	saveTheme(theme);
}

export function initThemeToggle(button) {
	applyTheme(getSavedTheme(), button);

	if (!button) {
		return;
	}

	button.addEventListener("click", () => {
		const nextTheme = document.body.classList.contains("dark")
			? "light"
			: "dark";
		applyTheme(nextTheme, button);
	});
}
