"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
	iconArrowRight,
	iconArrowUpRight,
	iconCSS,
	iconCode,
	iconFigma,
	iconGIT,
	iconGauge,
	iconGithub,
	iconJavaScript,
	iconLinkedin,
	iconNodeJS,
	iconPHP,
	iconReact,
	iconShopify,
	iconNextjs,
	iconWordpress,
	iconSass,
	iconUsers,
	iconShoppingCart,
	iconMysql,
	iconVite,
	iconClaude,
	iconCursor,
	iconSparkles,
	iconRobot,
	iconEye,
	iconTailwindCSS,
	iconX,
} from "@/utils/icons";
import Icon from "@/components/Icon";
import LifeCounter from "@/components/LifeCounter";
import Scribble from "@/components/Scribble";
import {
	experience,
	aiPrinciples,
	aiTools,
	profile,
	projects,
	services,
	socials,
} from "@/data/content";

const stackList = [
	{ svg: iconReact, title: "React" },
	{ svg: iconNextjs, title: "Next.js" },
	{ svg: iconJavaScript, title: "JavaScript" },
	{ svg: iconVite, title: "Vite" },
	{ svg: iconTailwindCSS, title: "Tailwind CSS" },
	{ svg: iconSass, title: "Sass" },
	{ svg: iconShopify, title: "Shopify" },
	{ svg: iconWordpress, title: "WordPress" },
	{ svg: iconPHP, title: "PHP" },
	{ svg: iconMysql, title: "MySQL" },
	{ svg: iconGIT, title: "Git" },
	{ svg: iconFigma, title: "Figma" },
	{ svg: iconClaude, title: "Claude" },
	{ svg: iconCursor, title: "Cursor" },
];

const serviceIcons = {
	ecommerce: iconShoppingCart,
	lead: iconUsers,
	performance: iconGauge,
	frontend: iconCode,
};

// Soft colour tints (pink, violet, teal, yellow) cycled across cards
const tints = ["tint-pink", "tint-violet", "tint-teal", "tint-yellow"];

const socialIcons = {
	github: iconGithub,
	linkedin: iconLinkedin,
	x: iconX,
};

const linkedinUrl = socials.find((s) => s.id === "linkedin").href;
const githubUrl = socials.find((s) => s.id === "github").href;

// Section wrapper: full-bleed top rule + framed content with corner markers
const Section = ({ id, className = "", dark = false, children }) => (
	<section
		id={id}
		className={`rule ${dark ? "section-dark" : ""} ${className}`}
	>
		<div className={`frame ${dark ? "border-night-800" : ""}`}>
			<span className="cross cross-tl" aria-hidden="true" />
			<span className="cross cross-tr" aria-hidden="true" />
			<div className="frame-inner section relative">{children}</div>
		</div>
	</section>
);

const SectionHeader = ({ index, eyebrow, title, lead, note }) => (
	<div data-reveal className="relative mb-10 md:mb-14">
		<span className="eyebrow">
			<span className="opacity-60">{index}</span>
			<span className="h-px w-6 bg-brand-gradient" />
			{eyebrow}
		</span>
		<h2 className="section-title">{title}</h2>
		{lead ? <p className="section-lead">{lead}</p> : null}
		{note ? (
			<span
				aria-hidden="true"
				className="handwritten-note absolute right-0 top-0 hidden rotate-[4deg] md:flex md:items-start md:gap-1"
			>
				{note}
				<Scribble variant="down" className="mt-3 h-10 w-12" />
			</span>
		) : null}
	</div>
);

// Small visuals shown inside each service card of the bento grid
const ServiceVisual = ({ id }) => {
	if (id === "ecommerce") {
		return (
			<div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
				<div className="flex items-center gap-4 rounded-lg border border-zinc-200 bg-zinc-50 p-3">
					<span className="tint-teal h-14 w-14 shrink-0 rounded-md border" />
					<span className="min-w-0 flex-1">
						<span className="block truncate text-sm font-medium text-zinc-900">
							Everyday Tote
						</span>
						<span className="block font-mono text-xs text-zinc-500">
							€49.00 · In stock
						</span>
					</span>
					<span className="shrink-0 rounded-md bg-zinc-900 px-3 py-1.5 text-xs font-medium text-surface">
						Add to cart
					</span>
				</div>
				<ul className="flex flex-wrap gap-2 sm:flex-col">
					{["Shopify", "WordPress", "Next.js"].map((platform) => (
						<li key={platform} className="tag">
							{platform}
						</li>
					))}
				</ul>
			</div>
		);
	}
	if (id === "lead") {
		return (
			<ul className="mt-6 space-y-2 rounded-lg border border-zinc-200 bg-zinc-50 p-3 font-mono text-xs">
				{[
					["Code review", "approved"],
					["Standards", "shared"],
					["Sprint plan", "on track"],
				].map(([item, status]) => (
					<li
						key={item}
						className="flex items-center justify-between gap-3"
					>
						<span className="flex items-center gap-2 text-zinc-700">
							<span className="text-emerald-600 dark:text-emerald-400">
								✓
							</span>
							{item}
						</span>
						<span className="rounded bg-emerald-50 dark:bg-emerald-500/20 px-1.5 py-0.5 text-emerald-700 dark:text-emerald-400">
							{status}
						</span>
					</li>
				))}
			</ul>
		);
	}
	if (id === "performance") {
		return (
			<ul className="mt-6 space-y-3">
				{[
					["LCP", "w-[88%]"],
					["INP", "w-[94%]"],
					["CLS", "w-[97%]"],
				].map(([metric, width]) => (
					<li key={metric} className="flex items-center gap-3">
						<span className="w-8 font-mono text-xs text-zinc-500">
							{metric}
						</span>
						<span className="h-1.5 flex-1 overflow-hidden rounded-full bg-zinc-100">
							<span
								className={`block h-full rounded-full bg-emerald-400 ${width}`}
							/>
						</span>
						<span className="font-mono text-xs text-emerald-700 dark:text-emerald-400">
							good
						</span>
					</li>
				))}
			</ul>
		);
	}
	// Front-end: palette + Vite dev server
	return (
		<div className="mt-6 grid gap-3 sm:grid-cols-[auto_1fr]">
			<div className="flex items-center gap-4 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
				<div className="flex -space-x-2">
					{[
						"bg-pink-300",
						"bg-violet-300",
						"bg-teal-300",
						"bg-zinc-900",
					].map((color) => (
						<span
							key={color}
							className={`h-7 w-7 rounded-full border-2 border-surface ${color}`}
						/>
					))}
				</div>
				<span className="text-2xl font-medium text-zinc-900">Aa</span>
			</div>
			<pre className="overflow-x-auto rounded-lg border border-zinc-200 bg-zinc-50 p-4 font-mono text-[13px] leading-6 text-zinc-600">
				<code>
					<span className="text-zinc-500">$</span> npm run dev{"\n"}
					<span className="font-semibold text-violet-600 dark:text-violet-400">
						VITE
					</span>{" "}
					<span className="text-zinc-500">ready in</span> 184 ms{"\n"}
					<span className="text-emerald-600 dark:text-emerald-400">
						➜
					</span>{" "}
					Local:{" "}
					<span className="text-teal-700 dark:text-teal-400">
						http://localhost:5173/
					</span>
				</code>
			</pre>
		</div>
	);
};

// Bento layout for services: wide, narrow / narrow, wide
const serviceSpans = [
	"lg:col-span-2",
	"lg:col-span-1",
	"lg:col-span-1",
	"lg:col-span-2",
];

export default function Home() {
	const pageRef = useRef();

	useEffect(() => {
		const prefersReducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
		if (prefersReducedMotion) return;

		gsap.registerPlugin(ScrollTrigger);

		const ctx = gsap.context(() => {
			gsap.set("[data-reveal]", { opacity: 0, y: 16 });
			ScrollTrigger.batch("[data-reveal]", {
				start: "top 90%",
				once: true,
				onEnter: (elements) =>
					gsap.to(elements, {
						opacity: 1,
						y: 0,
						duration: 0.6,
						ease: "power2.out",
						stagger: 0.08,
					}),
			});
		}, pageRef);

		return () => ctx.revert();
	}, []);

	return (
		<div ref={pageRef} id="top">
			{/* Hero */}
			<section className="relative overflow-hidden">
				<div className="hero-glow" aria-hidden="true" />
				<div className="frame">
					<div className="frame-inner grid items-center gap-16 py-16 md:py-28 lg:grid-cols-[1.1fr_1fr]">
						<div data-reveal className="min-w-0">
							<span className="handwritten-note mb-3 inline-block -rotate-3 text-2xl">
								nice to meet you!
							</span>
							<h1 className="text-4xl leading-[1.08] tracking-tighter md:text-[3.25rem]">
								Hi, I&apos;m Juli. I make the web a little{" "}
								<span className="text-gradient">better</span>,
								one site at a time.
							</h1>
							<p className="mt-6 max-w-xl text-lg leading-relaxed">
								Front-end developer and team lead in{" "}
								{profile.location}. I build websites and{" "}
								<span className="whitespace-nowrap">
									e-commerce
								</span>
								, and lead the front-end team at LA TEVA WEB.
								Lately, a lot of that work happens alongside AI
								tools like Claude and Cursor.
							</p>
							<div className="mt-8 flex flex-wrap gap-3">
								<a
									href="#projects"
									className="button button-primary"
								>
									See my work
									<Icon classList="h-4 w-4">
										{iconArrowRight}
									</Icon>
								</a>
								<a
									href="#contact"
									className="button button-secondary"
								>
									Let&apos;s connect
								</a>
							</div>
						</div>

						{/* Profile "file" card with handwritten annotations */}
						<div data-reveal className="relative min-w-0">
							<div className="gradient-border shadow-sm">
								<div className="overflow-hidden rounded-[15px] bg-surface">
									<div className="flex items-center justify-between border-b border-zinc-200 bg-zinc-50 px-4 py-2.5">
										<div className="flex gap-1.5">
											<span className="h-2.5 w-2.5 rounded-full border border-zinc-300 bg-surface" />
											<span className="h-2.5 w-2.5 rounded-full border border-zinc-300 bg-surface" />
											<span className="h-2.5 w-2.5 rounded-full border border-zinc-300 bg-surface" />
										</div>
										<span className="font-mono text-xs text-zinc-500">
											juli.json
										</span>
										<span className="w-12" />
									</div>
									<pre className="overflow-x-auto p-5 font-mono text-[13px] leading-7 text-zinc-700">
										<code>
											{"{\n"}
											{"  "}
											<span className="text-zinc-500">
												&quot;name&quot;
											</span>
											{": "}
											<span className="text-emerald-700 dark:text-emerald-400">
												&quot;{profile.name}&quot;
											</span>
											{",\n  "}
											<span className="text-zinc-500">
												&quot;version&quot;
											</span>
											{": "}
											<span className="text-quartiary-600 dark:text-quartiary-400">
												&quot;
												<LifeCounter />
												&quot;
											</span>
											{",\n  "}
											<span className="text-zinc-500">
												&quot;role&quot;
											</span>
											{": "}
											<span className="text-emerald-700 dark:text-emerald-400">
												&quot;{profile.role}&quot;
											</span>
											{",\n  "}
											<span className="text-zinc-500">
												&quot;location&quot;
											</span>
											{": "}
											<span className="text-emerald-700 dark:text-emerald-400">
												&quot;{profile.location}&quot;
											</span>
											{",\n  "}
											<span className="text-zinc-500">
												&quot;stack&quot;
											</span>
											{": ["}
											<span className="text-emerald-700 dark:text-emerald-400">
												&quot;Next.js&quot;,
												&quot;Shopify&quot;,
												&quot;WordPress&quot;,
												&quot;PHP&quot;
											</span>
											{"],\n  "}
											<span className="text-zinc-500">
												&quot;aiTools&quot;
											</span>
											{": ["}
											<span className="text-violet-600 dark:text-violet-400">
												&quot;Claude&quot;,
												&quot;Cursor&quot;
											</span>
											{"],\n  "}
											<span className="text-zinc-500">
												&quot;motto&quot;
											</span>
											{": "}
											<span className="text-emerald-700 dark:text-emerald-400">
												&quot;{profile.motto}&quot;
											</span>
											{"\n}"}
										</code>
									</pre>
								</div>
							</div>

							<span
								aria-hidden="true"
								className="handwritten-note absolute -bottom-14 left-6 flex items-end gap-1"
							>
								that&apos;s me, in JSON
								<Scribble
									variant="down"
									className="mb-1 h-10 w-12 -scale-y-100"
								/>
							</span>
						</div>
					</div>
				</div>
			</section>

			{/* About — bento grid */}
			<Section id="about">
				<SectionHeader
					index="01"
					eyebrow="About"
					title="A creative developer, curious by nature."
				/>
				<div className="grid auto-rows-[minmax(0,auto)] gap-4 md:grid-cols-2 lg:grid-cols-6">
					{/* Story */}
					<div
						data-reveal
						className="card p-6 md:col-span-2 md:p-8 lg:col-span-4 lg:row-span-2"
					>
						<div className="space-y-5 text-lg leading-relaxed">
							<p>
								I&apos;m a front-end developer on a mission to
								make digital products fancier and more valuable.
								I care about the details that make an interface
								feel fast, clear and honest.
							</p>
							<p>
								Currently front-end team lead at{" "}
								<a
									href="https://latevaweb.com"
									target="_blank"
									rel="noreferrer"
									className="text-link"
								>
									LA TEVA WEB
								</a>
								, where my team and I build websites and
								e-commerce for clients. AI tools are part of how
								we work every day: they take care of the
								repetitive work so we can focus on craft.
							</p>
							<p>
								In my spare time you&apos;ll either find me up
								in the mountains or exploring and documenting my
								surroundings,{" "}
								<a
									href="https://escapadesenparella.cat"
									target="_blank"
									rel="noreferrer"
									className="text-link"
								>
									one post at a time
								</a>{" "}
								(it&apos;s even been on TV).
							</p>
						</div>
					</div>

					{/* Photo */}
					{/* The source is only 740px wide: request the largest
					    variant so the crop isn't upscaled from a smaller one */}
					<figure
						data-reveal
						className="card group relative min-h-[320px] overflow-hidden md:row-span-2 lg:col-span-2"
					>
						<Image
							src={profile.cover}
							alt={`Portrait picture of ${profile.name}`}
							fill
							quality={95}
							sizes="(min-width: 768px) 740px, 100vw"
							className="object-cover object-right grayscale transition duration-500 group-hover:grayscale-0 dark:brightness-90"
						/>
						<figcaption
							aria-hidden="true"
							className="handwritten-note absolute bottom-4 left-4 rounded-md bg-surface/90 px-2.5 py-1 backdrop-blur"
						>
							hover me for colour
						</figcaption>
					</figure>

					{/* Life counter */}
					<div data-reveal className="card p-6 lg:col-span-2">
						<span className="eyebrow">Currently running</span>
						<p className="mt-3 font-mono text-2xl text-zinc-900 md:text-3xl">
							v<LifeCounter />
						</p>
						<p className="mt-2 text-sm text-zinc-500">
							Years of age, updated every few milliseconds.
						</p>
					</div>

					{/* Location */}
					<div
						data-reveal
						className="card dot-grid relative overflow-hidden p-6 lg:col-span-2"
					>
						<span className="eyebrow">Based in</span>
						<p className="mt-3 text-2xl text-zinc-900 md:text-3xl">
							{profile.location}
						</p>
						<p className="mt-2 font-mono text-xs text-zinc-500">
							41.3874° N, 2.1686° E
						</p>
						<span className="absolute right-8 top-1/2 flex h-4 w-4 -translate-y-1/2">
							<span className="absolute inline-flex h-full w-full motion-safe:animate-ping rounded-full bg-quartiary-400 opacity-40" />
							<span className="relative inline-flex h-4 w-4 rounded-full border-2 border-surface bg-quartiary-500 shadow" />
						</span>
					</div>

					{/* Motto */}
					<div
						data-reveal
						className="card tint-pink flex flex-col justify-between p-6 md:col-span-2 lg:col-span-2"
					>
						<span className="eyebrow">The motto</span>
						<p className="mt-3 font-handwritten text-3xl leading-tight text-zinc-900">
							Do what you love and do it{" "}
							<span className="text-zinc-400 line-through">
								often
							</span>{" "}
							<span className="text-quartiary-600 dark:text-quartiary-400">
								always.
							</span>
						</p>
					</div>
				</div>
			</Section>

			{/* Services — bento grid */}
			<Section id="services" className="bg-zinc-50/60">
				<SectionHeader
					index="02"
					eyebrow="Services"
					title="What I can help you with."
					lead="From the first sketch in Figma to a fast, maintainable interface in production."
				/>
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
					{services.map((service, idx) => (
						<div
							key={service.id}
							data-reveal
							className={`card card-hover flex flex-col p-6 md:p-8 ${serviceSpans[idx]}`}
						>
							<span
								className={`inline-flex h-10 w-10 items-center justify-center rounded-lg border shadow-sm ${tints[idx % tints.length]}`}
							>
								<Icon classList="h-5 w-5">
									{serviceIcons[service.id]}
								</Icon>
							</span>
							<h3 className="mt-5 text-lg">{service.title}</h3>
							<p className="mt-2 leading-relaxed">
								{service.description}
							</p>
							<div className="mt-auto">
								<ServiceVisual id={service.id} />
							</div>
						</div>
					))}
				</div>
			</Section>

			{/* AI — dark section */}
			<Section id="ai" dark>
				<div className="dark-glow" aria-hidden="true" />
				<div className="relative">
					<SectionHeader
						index="03"
						eyebrow="AI workflow"
						title="Built with AI, reviewed by a human."
						lead="I work with AI every day. It handles the repetitive, multi-step work; I focus on architecture, UX and quality."
						note="my AI teammates"
					/>

					<div className="grid gap-4 lg:grid-cols-3">
						{/* Agent session mock */}
						<div
							data-reveal
							className="relative overflow-hidden rounded-xl border border-night-800 bg-night-900/60 lg:col-span-2 lg:row-span-2"
						>
							<div className="flex items-center justify-between border-b border-night-800 px-4 py-2.5">
								<div className="flex gap-1.5">
									<span className="h-2.5 w-2.5 rounded-full border border-night-700" />
									<span className="h-2.5 w-2.5 rounded-full border border-night-700" />
									<span className="h-2.5 w-2.5 rounded-full border border-night-700" />
								</div>
								<span className="font-mono text-xs text-night-500">
									claude — ~/client-store
								</span>
								<span className="w-12" />
							</div>
							<pre className="overflow-x-auto p-5 font-mono text-[13px] leading-7 text-night-300">
								<code>
									<span className="text-quartiary-300">
										&gt;
									</span>{" "}
									Add a size selector to the product page,
									{"\n  "}
									following our project conventions{"\n\n"}
									<span className="text-violet-300">
										●
									</span>{" "}
									<span className="text-night-500">Read</span>{" "}
									src/components/ProductForm.jsx{"\n"}
									<span className="text-violet-300">
										●
									</span>{" "}
									<span className="text-night-500">Read</span>{" "}
									src/components/VariantPicker.jsx{"\n"}
									<span className="text-violet-300">
										●
									</span>{" "}
									<span className="text-night-500">Edit</span>{" "}
									src/components/VariantPicker.jsx{"\n"}
									<span className="text-violet-300">
										●
									</span>{" "}
									<span className="text-night-500">Run</span>{" "}
									npm run build{" "}
									<span className="text-emerald-400">✓</span>
									{"\n\n"}
									<span className="text-emerald-400">
										✓
									</span>{" "}
									2 files changed · ready for review
								</code>
							</pre>
							<span
								aria-hidden="true"
								className="handwritten-note absolute bottom-4 right-5 flex items-end gap-1"
							>
								<Scribble className="h-7 w-9 -scale-x-100" />
								then I review every diff
							</span>
						</div>

						{/* Tools */}
						{aiTools.map((tool) => (
							<div
								key={tool.id}
								data-reveal
								className="rounded-xl border border-night-800 bg-night-900/40 p-6"
							>
								<div className="flex items-center gap-3">
									<span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-night-700 bg-night-900 text-white">
										<Icon classList="h-5 w-5">
											{tool.id === "claude"
												? iconClaude
												: iconCursor}
										</Icon>
									</span>
									<h3 className="text-lg">{tool.name}</h3>
								</div>
								<p className="mt-4 text-sm leading-relaxed text-night-400">
									{tool.description}
								</p>
								<ul className="mt-4 flex flex-wrap gap-2">
									{tool.tags.map((tag) => (
										<li key={tag} className="tag-dark">
											{tag}
										</li>
									))}
								</ul>
							</div>
						))}
					</div>

					{/* Principles */}
					<ul
						data-reveal
						className="grid-cells-dark mt-4 sm:grid-cols-2 lg:grid-cols-4"
					>
						{aiPrinciples.map((principle, idx) => (
							<li key={principle.id} className="p-6">
								<Icon classList="h-5 w-5 text-quartiary-300">
									{
										[
											iconSparkles,
											iconEye,
											iconUsers,
											iconRobot,
										][idx]
									}
								</Icon>
								<h3 className="mt-4 text-base">
									{principle.title}
								</h3>
								<p className="mt-2 text-sm leading-relaxed text-night-400">
									{principle.description}
								</p>
							</li>
						))}
					</ul>
				</div>
			</Section>

			{/* Stack */}
			<Section id="stack">
				<SectionHeader
					index="04"
					eyebrow="Stack"
					title="Tools I use every day."
					lead="A pragmatic toolbox: the right technology for each project, not the trendiest one."
					note="my daily toolbox"
				/>
				<ul
					data-reveal
					className="grid-cells grid-cols-2 sm:grid-cols-4 lg:grid-cols-7"
				>
					{stackList.map((tool) => (
						<li
							key={tool.title}
							className="group flex flex-col items-center justify-center gap-3 px-4 py-8 transition-colors hover:bg-zinc-50"
						>
							<Icon classList="h-8 w-8 text-zinc-500 transition-colors group-hover:text-zinc-900">
								{tool.svg}
							</Icon>
							<span className="text-sm text-zinc-700">
								{tool.title}
							</span>
						</li>
					))}
				</ul>
			</Section>

			{/* Experience */}
			<Section id="experience" className="bg-zinc-50/60">
				<SectionHeader
					index="05"
					eyebrow="Experience"
					title="Where I've been building."
				/>
				<ol data-reveal className="card divide-y divide-zinc-200">
					{experience.map((job) => (
						<li
							key={job.id}
							className="grid gap-4 p-6 md:grid-cols-[180px_1fr] md:p-8"
						>
							<div className="flex items-center gap-4 md:flex-col md:items-start">
								<span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-zinc-200 bg-surface p-2.5 shadow-sm">
									{job.logo ? (
										<Image
											src={job.logo}
											alt={`${job.company} logo`}
											width={40}
											height={40}
											unoptimized
											className="h-full w-full object-contain"
										/>
									) : (
										<span
											aria-hidden="true"
											className="font-medium text-zinc-900"
										>
											{job.company
												.split(" ")
												.filter(
													(word) => word.length > 2,
												)
												.map((word) => word[0])
												.join("")
												.slice(0, 2)}
										</span>
									)}
								</span>
								<span className="font-mono text-xs uppercase tracking-widest text-zinc-500">
									{job.period}
								</span>
							</div>
							<div>
								<h3 className="text-lg">
									<a
										href={job.href}
										target="_blank"
										rel="noreferrer"
										className="group inline-flex items-center gap-1.5 hover:underline hover:underline-offset-4"
									>
										{job.company}
										<Icon classList="h-4 w-4 text-zinc-400 transition-colors group-hover:text-zinc-900">
											{iconArrowUpRight}
										</Icon>
									</a>
								</h3>
								<p className="text-sm text-zinc-500">
									{job.role}
								</p>
								<p className="mt-3 leading-relaxed">
									{job.description}
								</p>
								<ul className="mt-4 flex flex-wrap gap-2">
									{job.tags.map((tag) => (
										<li key={tag} className="tag">
											{tag}
										</li>
									))}
								</ul>
							</div>
						</li>
					))}
				</ol>
				<div data-reveal className="mt-6">
					<a
						href={linkedinUrl}
						target="_blank"
						rel="noreferrer"
						className="button button-secondary"
					>
						Full resume on LinkedIn
						<Icon classList="h-4 w-4">{iconArrowUpRight}</Icon>
					</a>
				</div>
			</Section>

			{/* Projects */}
			<Section id="projects">
				<SectionHeader
					index="06"
					eyebrow="Projects"
					title="Featured projects."
					lead="A selection of things I've designed, built and keep improving."
					note="some favourites"
				/>
				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{projects.map((project, idx) => (
						<a
							key={project.id}
							data-reveal
							href={project.href}
							target="_blank"
							rel="noreferrer"
							className="card card-hover group flex flex-col overflow-hidden"
						>
							<div
								className={`flex h-36 items-end justify-between border-b p-5 ${tints[idx % tints.length]}`}
							>
								<span className="font-mono text-5xl opacity-40 transition-opacity group-hover:opacity-70">
									{String(idx + 1).padStart(2, "0")}
								</span>
								<span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 bg-surface text-zinc-500 transition-colors group-hover:border-zinc-900 group-hover:text-zinc-900">
									<Icon classList="h-4 w-4">
										{iconArrowUpRight}
									</Icon>
								</span>
							</div>
							<div className="flex flex-1 flex-col p-5">
								<h3 className="text-lg">{project.title}</h3>
								<p className="mt-2 flex-1 leading-relaxed">
									{project.description}
								</p>
								<ul className="mt-4 flex flex-wrap gap-2">
									{project.tags.map((tag) => (
										<li key={tag} className="tag">
											{tag}
										</li>
									))}
								</ul>
								<span className="mt-5 border-t border-zinc-200 pt-4 font-mono text-xs text-zinc-500">
									{project.linkText}
								</span>
							</div>
						</a>
					))}
				</div>
			</Section>

			{/* Connect */}
			<Section id="contact" className="bg-zinc-50/60">
				<div data-reveal className="gradient-border shadow-sm">
					<div className="grid overflow-hidden rounded-[15px] bg-surface lg:grid-cols-[1.4fr_1fr]">
						<div className="p-8 md:p-12">
							<span className="eyebrow">
								<span className="opacity-60">07</span>
								<span className="h-px w-6 bg-brand-gradient" />
								Connect
							</span>
							<h2 className="section-title">
								Let&apos;s{" "}
								<span className="text-gradient">connect</span>.
							</h2>
							<p className="section-lead">
								I enjoy meeting people who care about the web.
								Follow along, swap ideas about front-end,
								performance or design, or just say hi — I&apos;m
								always up for a good conversation.
							</p>
							<ul className="mt-6 flex flex-wrap gap-2">
								{[
									"Front-end",
									"E-commerce",
									"AI tools",
									"Team leadership",
									"Web performance",
								].map((topic) => (
									<li key={topic} className="tag">
										{topic}
									</li>
								))}
							</ul>
							<div className="mt-8 flex flex-wrap items-center gap-3">
								<a
									href={linkedinUrl}
									target="_blank"
									rel="noreferrer"
									className="button button-primary"
								>
									Connect on LinkedIn
									<Icon classList="h-4 w-4">
										{iconArrowUpRight}
									</Icon>
								</a>
								<a
									href={githubUrl}
									target="_blank"
									rel="noreferrer"
									className="button button-secondary"
								>
									Follow on GitHub
								</a>
								<span
									aria-hidden="true"
									className="handwritten-note hidden items-center gap-1 sm:flex"
								>
									<Scribble className="h-7 w-9 -scale-x-100" />
									don&apos;t be shy!
								</span>
							</div>
						</div>
						<ul className="divide-y divide-zinc-200 border-t border-zinc-200 bg-zinc-50 lg:border-l lg:border-t-0">
							{socials.map((social) => (
								<li key={social.id}>
									<a
										href={social.href}
										target="_blank"
										rel="noreferrer"
										className="group flex items-center gap-4 px-8 py-5 transition-colors hover:bg-surface"
									>
										<span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-200 bg-surface text-zinc-700 shadow-sm">
											<Icon classList="h-5 w-5">
												{socialIcons[social.id]}
											</Icon>
										</span>
										<span className="flex-1">
											<span className="block text-sm font-medium text-zinc-900">
												{social.label}
											</span>
											<span className="block font-mono text-xs text-zinc-500">
												{social.handle}
											</span>
										</span>
										<Icon classList="h-4 w-4 text-zinc-400 transition-colors group-hover:text-zinc-900">
											{iconArrowUpRight}
										</Icon>
									</a>
								</li>
							))}
						</ul>
					</div>
				</div>
			</Section>
		</div>
	);
}
