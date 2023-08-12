/** @type {import('tailwindcss').Config} */

const customColors = {
	primary: {
		100: "#f5f5f5",
		200: "#eeeeee",
		300: "#dddddd",
		400: "#666666",
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
};

module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		container: {
			center: true,
			padding: "1.5rem",
		},
		extend: {
			fontSize: {
				base: "16px",
			},
			fontFamily: {
				heading: ["Circular"],
				body: ["Circular"],
			},
			colors: {
				...customColors,
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
