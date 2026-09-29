"use client";

import { useEffect, useState } from "react";
import Icon from "@/components/Icon";
import { iconMoon, iconSun } from "@/utils/icons";

const STORAGE_KEY = "theme";

// The initial class is set before paint by the inline script in layout.js
// (stored choice, falling back to the OS preference).
const ThemeToggle = () => {
	const [isDark, setIsDark] = useState(null);

	useEffect(() => {
		setIsDark(document.documentElement.classList.contains("dark"));

		// Follow OS changes until the visitor makes an explicit choice
		const media = window.matchMedia("(prefers-color-scheme: dark)");
		const onChange = (event) => {
			let stored = null;
			try {
				stored = localStorage.getItem(STORAGE_KEY);
			} catch {}
			if (stored) return;
			document.documentElement.classList.toggle("dark", event.matches);
			setIsDark(event.matches);
		};
		media.addEventListener("change", onChange);
		return () => media.removeEventListener("change", onChange);
	}, []);

	const toggle = () => {
		const next = !isDark;
		document.documentElement.classList.toggle("dark", next);
		try {
			localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
		} catch {}
		setIsDark(next);
	};

	return (
		<button
			type="button"
			onClick={toggle}
			className="button button-secondary button-sm"
			aria-label={
				isDark ? "Switch to light theme" : "Switch to dark theme"
			}
			title={isDark ? "Light theme" : "Dark theme"}
		>
			<Icon classList="h-5 w-5">{isDark ? iconSun : iconMoon}</Icon>
		</button>
	);
};

export default ThemeToggle;
