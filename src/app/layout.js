"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Nav from "@/components/Nav";
import LifeCounter from "@/components/LifeCounter";
import ScrollOverlay from "@/components/ScrollOverlay";
import Footer from "@/components/Footer";
import "../styles/app.sass";

export default function RootLayout({ children }) {
	const body = useRef();
	const [scrollOverlayActive, setScrollOverlayActive] = useState(true);

	useEffect(() => {
		setTimeout(() => setScrollOverlayActive(false), 0);
	}, []);

	return (
		<html lang="en">
			<body className="bg-dark" ref={body}>
				<ScrollOverlay isVisible={scrollOverlayActive} />
				<header className="fixed z-50 top-0 inset-x-0 px-6 py-4 md:py-6">
					<Link
						href="/"
						title="Juli Ramon - Front-End Developer"
						className="flex items-center"
					>
						<Image
							src={"/images/avatar-juli-ramon.jpg"}
							alt={"Avatar of Juli Ramon - Frontend Developer"}
							width={44}
							height={44}
							className="rounded-full mr-3 w-11 h-11 md:w-12 md:h-12"
						/>
						<div className="flex flex-col">
							<pre className="inline-block text-xs text-primary-200 mb-0.5 bg-primary-500 px-1 py-0.5">
								Juli Ramon :: Front-End Developer
							</pre>
							<LifeCounter />
						</div>
					</Link>
				</header>
				<main>{children}</main>
				<Nav />
				<Footer />
			</body>
		</html>
	);
}
