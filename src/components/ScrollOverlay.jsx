"use client";

import { useEffect, useState } from "react";

const ScrollOverlay = () => {
	const [isVisible, setIsVisible] = useState(true);

	useEffect(() => {
		const timeout = setTimeout(() => setIsVisible(false), 400);
		return () => clearTimeout(timeout);
	}, []);

	const activeClass = isVisible
		? "opacity-100 z-[60] pointer-events-auto"
		: "opacity-0 -z-10 pointer-events-none";

	return (
		<div
			className={`fixed inset-0 w-full h-full bg-white transition-opacity duration-500 ease-in-out ${activeClass}`}
		></div>
	);
};

export default ScrollOverlay;
