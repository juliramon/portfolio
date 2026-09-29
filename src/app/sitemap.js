import { siteUrl } from "@/data/content";

export default function sitemap() {
	return [
		{
			url: siteUrl,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 1,
		},
		{
			url: `${siteUrl}/llms.txt`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.5,
		},
	];
}
