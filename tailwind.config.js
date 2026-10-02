/** @type {import('tailwindcss').Config} */

const customColors = {
	primary: {
		100: "#f5f5f5",
		200: "#eeeeee",
		300: "#dddddd",
		400: "#bbbbbb",
		500: "#4d4d4d",
		600: "#3e3e3e",
		700: "#232323",
		800: "#1f1f1f",
		900: "#0f0f0f",
	},
	secondary: {
		100: "#fff4cd",
		200: "#fee99b",
		300: "#fedf69",
		400: "#fdd437",
		500: "#fdc905",
		600: "#caa104",
		700: "#987903",
		800: "#655002",
		900: "#332801",
	},
	tertiary: {
		100: "#cdfff4",
		200: "#9bfee9",
		300: "#69fedf",
		400: "#37fdd4",
		500: "#05fdc9",
		600: "#04caa1",
		700: "#039879",
		800: "#026550",
		900: "#013328",
	},
	quartiary: {
		100: "#ffcce8",
		200: "#ff99d2",
		300: "#ff66bb",
		400: "#ff33a5",
		500: "#ff008e",
		600: "#cc0072",
		700: "#990055",
		800: "#660039",
		900: "#33001c",
	},
};

// Neutral scale driven by CSS variables (see app.sass): it inverts under
// `.dark`, so every zinc-* utility adapts to the theme automatically.
const themedZinc = Object.fromEntries(
	[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((step) => [
		step,
		`rgb(var(--zinc-${step}) / <alpha-value>)`,
	]),
);

// Fixed dark neutrals for the always-dark AI section (never inverted)
const night = {
	50: "#fafafa",
	100: "#f4f4f5",
	200: "#e4e4e7",
	300: "#d4d4d8",
	400: "#a1a1aa",
	500: "#71717a",
	600: "#52525b",
	700: "#3f3f46",
	800: "#27272a",
	900: "#18181b",
	950: "#09090b",
};

module.exports = {
	darkMode: "class",
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				...customColors,
				zinc: themedZinc,
				night,
				// Page background: white in light mode, near-black in dark mode
				surface: "rgb(var(--surface) / <alpha-value>)",
			},
			fontSize: {
				10: "10px",
				base: "16px",
			},
			fontFamily: {
				// Font variables come from next/font/local in layout.js
				heading: [
					"var(--font-circular)",
					"ui-sans-serif",
					"system-ui",
					"sans-serif",
				],
				body: [
					"var(--font-circular)",
					"ui-sans-serif",
					"system-ui",
					"sans-serif",
				],
				handwritten: ["var(--font-handwritten)", "cursive"],
				mono: [
					"ui-monospace",
					"SFMono-Regular",
					"Menlo",
					"Monaco",
					"Consolas",
					"monospace",
				],
			},
			textColor: {
				...customColors,
			},
			backgroundColor: {
				...customColors,
			},
		},
	},
	plugins: [],
};
