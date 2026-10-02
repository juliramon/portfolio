import { siteUrl } from "@/data/content";

// AI crawlers are listed explicitly so it's clear they are welcome to
// index the site (search, answers and citations), not just tolerated.
const aiCrawlers = [
	"GPTBot",
	"OAI-SearchBot",
	"ChatGPT-User",
	"ClaudeBot",
	"Claude-SearchBot",
	"Claude-User",
	"anthropic-ai",
	"PerplexityBot",
	"Perplexity-User",
	"Google-Extended",
	"Applebot-Extended",
	"CCBot",
];

export default function robots() {
	return {
		rules: [
			{ userAgent: "*", allow: "/" },
			{ userAgent: aiCrawlers, allow: "/" },
		],
		sitemap: `${siteUrl}/sitemap.xml`,
		host: siteUrl,
	};
}
