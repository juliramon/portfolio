// Central place for all the copy shown on the site.
// Edit texts, links and lists here without touching the components.

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
			"I lead the front-end team building websites and e-commerce for clients — from Shopify and WordPress to custom React and Next.js builds. I've brought AI tools like Claude and Cursor into our daily workflow, review code and keep quality and performance high.",
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
		role: "Founder & Developer",
		period: "Side project",
		description:
			"A guide to getaways for couples in Catalonia. I design, build and maintain the platform, and document my surroundings one post at a time.",
		tags: ["Product", "Content", "SEO"],
	},
];

export const projects = [
	{
		id: "escapades",
		title: "Escapades en parella",
		description:
			"Content platform to discover getaways, cabins and plans for couples across Catalonia.",
		href: "https://escapadesenparella.cat",
		linkText: "escapadesenparella.cat",
		tags: ["Web platform", "SEO", "Performance"],
	},
	{
		id: "latevaweb",
		title: "Client work at LA TEVA WEB",
		description:
			"Websites and online stores for businesses, focused on speed, clarity and conversion.",
		href: "https://latevaweb.com",
		linkText: "latevaweb.com",
		tags: ["E-commerce", "Shopify", "WordPress"],
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
