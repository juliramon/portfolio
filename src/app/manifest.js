import { profile, seo } from "@/data/content";

export default function manifest() {
	return {
		name: seo.title,
		short_name: profile.name,
		description: seo.description,
		start_url: "/",
		display: "browser",
		background_color: "#ffffff",
		theme_color: "#18181b",
		icons: [
			{ src: "/icon.png", sizes: "512x512", type: "image/png" },
			{ src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
		],
	};
}
