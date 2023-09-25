"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const Nav = () => {
	const [activeLink, setActiveLink] = useState("home");
	const [navActive, setNavActive] = useState(false);
	const [navButtonActive, setNavButtonActive] = useState(false);

	const handleClick = (e) => {
		setActiveLink(e.target.id);
		setNavActive(!navActive);
		setNavButtonActive(!navButtonActive);
	};
	const handleNavToggle = (e) => {
		e.preventDefault();
		setNavActive(!navActive);
		setNavButtonActive(!navButtonActive);
	};

	const links = [
		{
			href: "/",
			title: "Home",
			id: "home",
			text: "Home",
		},
	];

	useEffect(() => {
		const navLinks = document.querySelectorAll(".nav__link");
		const activeClass = "active";

		if (!navLinks) return;

		const calculateBulletPosition = (linkElement) => {
			const linkXOffset = linkElement.offsetLeft;
			const linkWidth = linkElement
				.getBoundingClientRect()
				.width.toFixed(1);
			const linkHeight = linkElement
				.getBoundingClientRect()
				.height.toFixed(1);

			const bullet = document.querySelector(".nav__bullet");
			const bulletPosition = linkXOffset + linkWidth / 2 - linkWidth / 2;

			if (!bullet.classList.contains(activeClass)) {
				bullet.classList.add(activeClass);
			}

			bullet.style.left = `${bulletPosition}px`;
			bullet.style.width = `${linkWidth}px`;
			bullet.style.height = `${linkHeight}px`;
		};

		navLinks.forEach((link) => {
			link.addEventListener("click", (e) => {
				calculateBulletPosition(link);
			});
		});

		calculateBulletPosition(navLinks[0]);
	}, []);

	return (
		<nav className="nav">
			<button
				className={`nav__button ${navButtonActive ? "active" : ""}`}
				onClick={(e) => handleNavToggle(e)}
			>
				<div className="nav__button-wrapper">
					<span></span>
					<span></span>
				</div>
			</button>
			<div className={`nav__menu ${navActive ? "active" : ""}`}>
				<ul className="nav__list ">
					{links.map((link) => {
						return (
							<li key={link.id} className="nav__item">
								<Link
									href={link.href}
									title={link.title}
									id={link.id}
									onClick={(e) => handleClick(e)}
									className={`nav__link ${
										activeLink === link.id ? "active" : null
									}`}
								>
									{link.text}
								</Link>
							</li>
						);
					})}
					<span className="nav__bullet"></span>

					<li className="nav__social-icons">
						<a
							href="https://twitter.com/juligoodie"
							title="Follow me on Twitter"
							className="inline-block"
							target="_blank"
							rel="nofollow noreferrer"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="text-primary-700"
								width={20}
								height={20}
								viewBox="0 0 24 24"
								strokeWidth={1.2}
								stroke="currentColor"
								fill="none"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path
									stroke="none"
									d="M0 0h24v24H0z"
									fill="none"
								></path>
								<path d="M4 4l11.733 16h4.267l-11.733 -16z"></path>
								<path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path>
							</svg>
						</a>
						<a
							href="https://github.com/juliramon"
							title="Follow me on Github"
							className="inline-block"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="text-primary-700"
								width={20}
								height={20}
								viewBox="0 0 24 24"
								strokeWidth={1.2}
								stroke="currentColor"
								fill="none"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path
									stroke="none"
									d="M0 0h24v24H0z"
									fill="none"
								></path>
								<path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"></path>
							</svg>
						</a>
						<a
							href="https://linkedin.com/juliramon"
							title="Let's connect on LinkedIn"
							className="inline-block"
							target="_blank"
							rel="nofollow noreferrer"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="text-primary-700"
								width={22}
								height={22}
								viewBox="0 0 24 24"
								strokeWidth={1.2}
								stroke="currentColor"
								fill="none"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path
									stroke="none"
									d="M0 0h24v24H0z"
									fill="none"
								></path>
								<path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
								<path d="M8 11l0 5"></path>
								<path d="M8 8l0 .01"></path>
								<path d="M12 16l0 -5"></path>
								<path d="M16 16v-3a2 2 0 0 0 -4 0"></path>
							</svg>
						</a>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Nav;
