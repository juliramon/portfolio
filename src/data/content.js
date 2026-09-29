// Central place for all the copy shown on the site.
// Edit texts, links and lists here without touching the components.

export const profile = {
	name: "Juli Ramon",
	role: "Front-End Developer",
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
	{ id: "stack", text: "Stack" },
	{ id: "experience", text: "Experience" },
	{ id: "projects", text: "Projects" },
];

export const services = [
	{
		id: "frontend",
		title: "Front-end development",
		description:
			"Pixel-perfect, accessible interfaces built with React and Next.js, with components designed to scale with the product.",
	},
	{
		id: "performance",
		title: "Web performance",
		description:
			"Core Web Vitals audits, image and bundle optimization and rendering strategies that make sites feel instant.",
	},
	{
		id: "design",
		title: "UI design",
		description:
			"From Figma to production: clear layouts, consistent design systems and small details that make an interface feel crafted.",
	},
	{
		id: "fullstack",
		title: "MERN stack",
		description:
			"APIs with Node.js and Express, data with MongoDB or MySQL, and everything wired together end-to-end.",
	},
];

export const experience = [
	{
		id: "latevaweb",
		company: "LA TEVA WEB",
		href: "https://latevaweb.com",
		role: "Front-End Developer · Web artisan",
		period: "Present",
		description:
			"I use a wide range of technologies to develop optimized web platforms that help clients communicate better and sell on the Internet.",
		tags: ["React", "JavaScript", "Performance"],
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
		title: "Client platforms at LA TEVA WEB",
		description:
			"Websites and e-commerce platforms for small businesses, focused on speed, clarity and conversion.",
		href: "https://latevaweb.com",
		linkText: "latevaweb.com",
		tags: ["E-commerce", "Websites", "UI"],
	},
	{
		id: "portfolio",
		title: "This portfolio",
		description:
			"A personal site built as a playground for layout, typography and scroll animations.",
		href: "https://github.com/juliramon",
		linkText: "github.com/juliramon",
		tags: ["Next.js", "Tailwind CSS", "GSAP"],
	},
];
