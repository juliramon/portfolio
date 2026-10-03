import { projects, siteUrl } from "@/data/content";

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
		...projects
			.filter((project) => project.page)
			.map((project) => ({
				url: `${siteUrl}${project.page}`,
				lastModified: new Date(),
				changeFrequency: "monthly",
				priority: 0.7,
			})),
	];
}
