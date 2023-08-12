import Link from "next/link";
import React from "react";

const Nav = () => {
	return (
		<nav className="flex items-center justify-center fixed bottom-10 left-1/2 -translate-x-1/2 shadow shadow-primary-700 rounded-full overflow-hidden">
			<ul className="list-none m-0 bg-supercolor inline-flex items-center px-4">
				<li>
					<Link
						href="/"
						title="Home"
						className="text-primary-700 text-sm px-4 py-3 inline-block"
					>
						Home
					</Link>
				</li>
				<li>
					<Link
						href="/"
						title="Experience"
						className="text-primary-700 text-sm px-4 py-3 inline-block"
					>
						Experience
					</Link>
				</li>
				<li>
					<Link
						href="/"
						title="Education"
						className="text-primary-700 text-sm px-4 py-3 inline-block"
					>
						Education
					</Link>
				</li>
				<li>
					<Link
						href="/"
						title="Projects"
						className="text-primary-700 text-sm px-4 py-3 inline-block"
					>
						Projects
					</Link>
				</li>
				<li>
					<Link
						href="/"
						title="What I use"
						className="text-primary-700 text-sm px-4 py-3 inline-block"
					>
						What I use
					</Link>
				</li>
				<li>
					<Link
						href="/"
						title="Articles"
						className="text-primary-700 text-sm px-4 py-3 inline-block"
					>
						Articles
					</Link>
				</li>
				<li className="px-4 py-3 inline-flex items-center">
					<Link
						href="https://twitter.com/juligoodie"
						title="Follow me on Twitter"
						className="inline-block mr-2"
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
					</Link>
					<Link
						href="https://github.com/juliramon"
						title="Follow me on Github"
						className="inline-block mr-2"
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
					</Link>
					<Link
						href="https://linkedin.com/juliramon"
						title="Let's connect on LinkedIn"
						className="inline-block mr-2"
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
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Nav;
