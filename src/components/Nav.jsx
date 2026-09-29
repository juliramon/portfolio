"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Icon from "@/components/Icon";
import { navLinks, profile } from "@/data/content";
import { iconClose, iconMenu } from "@/utils/icons";

const Nav = () => {
	const [activeLink, setActiveLink] = useState(null);
	const [menuOpen, setMenuOpen] = useState(false);

	// Highlight the link of the section currently in view
	useEffect(() => {
		const sections = navLinks
			.map((link) => document.getElementById(link.id))
			.filter(Boolean);

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) setActiveLink(entry.target.id);
				});
			},
			{ rootMargin: "-45% 0px -50% 0px" }
		);

		sections.forEach((section) => observer.observe(section));
		return () => observer.disconnect();
	}, []);

	const closeMenu = () => setMenuOpen(false);

	return (
		<header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-md">
			<div className="frame">
				<div className="frame-inner flex h-16 items-center justify-between">
					<a
						href="#top"
						title={`${profile.name} - ${profile.role}`}
						className="flex items-center gap-3"
						onClick={closeMenu}
					>
						<Image
							src={profile.avatar}
							alt={`Avatar of ${profile.name}`}
							width={32}
							height={32}
							className="h-8 w-8 rounded-full border border-zinc-200"
						/>
						<span className="text-sm font-medium text-zinc-900">
							{profile.name}
						</span>
					</a>

					<nav className="hidden items-center gap-1 md:flex">
						{navLinks.map((link) => (
							<a
								key={link.id}
								href={`#${link.id}`}
								className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
									activeLink === link.id
										? "bg-zinc-100 text-zinc-900"
										: "text-zinc-600 hover:text-zinc-900"
								}`}
							>
								{link.text}
							</a>
						))}
					</nav>

					<div className="flex items-center gap-2">
						<a
							href="#contact"
							className="button button-primary button-sm hidden sm:inline-flex"
						>
							Let&apos;s connect
						</a>
						<button
							type="button"
							className="button button-secondary button-sm md:hidden"
							aria-label={menuOpen ? "Close menu" : "Open menu"}
							aria-expanded={menuOpen}
							onClick={() => setMenuOpen(!menuOpen)}
						>
							<Icon classList="h-5 w-5">
								{menuOpen ? iconClose : iconMenu}
							</Icon>
						</button>
					</div>
				</div>

				{menuOpen && (
					<nav className="frame-inner border-t border-zinc-200 py-3 md:hidden">
						<ul className="flex flex-col">
							{[...navLinks, { id: "contact", text: "Connect" }].map(
								(link) => (
									<li key={link.id}>
										<a
											href={`#${link.id}`}
											onClick={closeMenu}
											className="block rounded-md px-3 py-2.5 text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900"
										>
											{link.text}
										</a>
									</li>
								)
							)}
						</ul>
					</nav>
				)}
			</div>
		</header>
	);
};

export default Nav;
