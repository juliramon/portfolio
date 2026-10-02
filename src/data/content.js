// Central place for all the copy shown on the site.
// Edit texts, links and lists here without touching the components.

// Canonical site URL for metadata, sitemap and robots.txt.
// Override with NEXT_PUBLIC_SITE_URL when the site moves to a custom domain.
export const siteUrl = (
	process.env.NEXT_PUBLIC_SITE_URL || "https://juliramon.dev"
).replace(/\/$/, "");

export const seo = {
	title: "Juli Ramon · Front-End Developer & Team Lead",
	shortTitle: "Juli Ramon",
	description:
		"Front-end developer and team lead in Barcelona. I build websites and e-commerce, lead the front-end team at LA TEVA WEB and work day to day with AI tools like Claude and Cursor.",
	keywords: [
		"Juli Ramon",
		"front-end developer",
		"front-end team lead",
		"Barcelona",
		"websites",
		"e-commerce",
		"Shopify",
		"WordPress",
		"Next.js",
		"React",
		"web performance",
		"AI-assisted development",
	],
};

export const profile = {
	name: "Juli Ramon",
	role: "Front-End Team Lead",
	location: "Barcelona",
	avatar: "/images/avatar-juli-ramon.jpg",
	cover: "/images/cover-juli-ramon.jpg",
	motto: "Do what you love and do it always.",
};

export const socials = [
	{
		id: "github",
		label: "GitHub",
		href: "https://github.com/juliramon",
		handle: "@juliramon",
	},
	{
		id: "linkedin",
		label: "LinkedIn",
		href: "https://www.linkedin.com/in/juliramon",
		handle: "in/juliramon",
	},
	{
		id: "x",
		label: "X / Twitter",
		href: "https://twitter.com/juligoodie",
		handle: "@juligoodie",
	},
];

export const navLinks = [
	{ id: "about", text: "About" },
	{ id: "services", text: "Services" },
	{ id: "ai", text: "AI" },
	{ id: "stack", text: "Stack" },
	{ id: "experience", text: "Experience" },
	{ id: "projects", text: "Projects" },
];

export const services = [
	{
		id: "ecommerce",
		title: "Websites & e-commerce",
		description:
			"Corporate sites, online stores and everything in between. Shopify, WordPress or a custom React / Next.js build — whatever fits the business best.",
	},
	{
		id: "lead",
		title: "Front-end team lead",
		description:
			"I lead a front-end team: code reviews, shared standards, mentoring and planning, so we ship consistently good work.",
	},
	{
		id: "performance",
		title: "Web performance",
		description:
			"Core Web Vitals audits, image and bundle optimization and rendering strategies that make sites feel instant.",
	},
	{
		id: "frontend",
		title: "Front-end development",
		description:
			"From Figma to production: accessible, maintainable interfaces with modern JavaScript, clean components and a design system that scales.",
	},
];

// How I work with AI: tools + principles
export const aiTools = [
	{
		id: "claude",
		name: "Claude",
		description:
			"My main AI assistant. I hand Claude well-scoped, multi-step tasks — scaffolding components, refactors, migrations, tests — and review every diff before it ships.",
		tags: ["Claude Code", "Refactors", "Tests"],
	},
	{
		id: "cursor",
		name: "Cursor",
		description:
			"My editor. Codebase-aware chat and inline edits for the small, fast iterations that happen between bigger tasks.",
		tags: ["Editor", "Inline edits"],
	},
];

export const aiPrinciples = [
	{
		id: "context",
		title: "Context first",
		description:
			"Clear specs, project conventions and examples in, so AI produces code that fits the codebase.",
	},
	{
		id: "review",
		title: "Human in the loop",
		description:
			"AI writes drafts; I own the result. Every change is reviewed, tested and understood.",
	},
	{
		id: "team",
		title: "Team adoption",
		description:
			"I help my team work with AI too: shared conventions, reusable prompts and review practices.",
	},
	{
		id: "craft",
		title: "More time for craft",
		description:
			"Less boilerplate means more time for UX details, performance and the things users actually notice.",
	},
];

export const experience = [
	{
		id: "latevaweb",
		company: "LA TEVA WEB",
		href: "https://latevaweb.com",
		logo: "/logo-ltw.svg",
		role: "Front-End Team Lead",
		period: "Present",
		description:
			"LA TEVA WEB has been recognised as the second-best SEO agency in Spain. I lead its front-end team, building websites and e-commerce for clients — from Shopify and WordPress to custom React and Next.js builds. I've brought AI tools like Claude and Cursor into our daily workflow, review code and keep quality and performance high.",
		tags: [
			"Team lead",
			"E-commerce",
			"Shopify",
			"WordPress",
			"React",
			"AI tools",
		],
	},
	{
		id: "escapades",
		company: "Escapades en parella",
		href: "https://escapadesenparella.cat",
		logo: "/logo-escapades-icon.svg",
		role: "Founder & Developer",
		period: "Side project",
		description:
			"A guide to getaways for couples in Catalonia that has even been featured on TV. I design, build and maintain the platform, and document my surroundings one post at a time.",
		tags: ["Featured on TV", "Product", "Content", "SEO"],
	},
];

export const projects = [
	{
		id: "escapades",
		title: "Escapades en parella",
		description:
			"Content platform to discover getaways, cabins and plans for couples across Catalonia — it has even been featured on TV.",
		href: "https://escapadesenparella.cat",
		linkText: "escapadesenparella.cat",
		tags: ["Featured on TV", "Web platform", "SEO"],
	},
	{
		id: "latevaweb",
		title: "Client work at LA TEVA WEB",
		description:
			"Websites and online stores built with the team at the second-best SEO agency in Spain, focused on speed, clarity and conversion.",
		href: "https://latevaweb.com",
		linkText: "latevaweb.com",
		tags: ["#2 SEO agency in Spain", "E-commerce", "Shopify"],
	},
	{
		id: "portfolio",
		title: "This portfolio",
		description:
			"A personal site built as a playground for layout, typography and scroll animations — pair-programmed with Claude.",
		href: "https://github.com/juliramon",
		linkText: "github.com/juliramon",
		tags: ["Next.js", "Tailwind CSS", "GSAP", "Claude"],
	},
];

// Project metrics shown above the featured projects.
// TODO: the percentages are PLACEHOLDERS until the exact figures arrive.
// Keep `isApproximate: true` (shows an "Approximate" tag) until they're real.
export const projectStats = {
	total: 200,
	isApproximate: true,
	technologies: [
		{ name: "WordPress", share: 35 },
		{ name: "PHP", share: 25 },
		{ name: "Shopify", share: 20 },
		{ name: "PrestaShop", share: 12 },
		{ name: "Laravel", share: 8 },
	],
};
