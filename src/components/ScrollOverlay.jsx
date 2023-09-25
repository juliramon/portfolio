import React from "react";

const ScrollOverlay = ({ isVisible }) => {
	const activeClass = isVisible ? "translate-y-0" : "-translate-y-full";
	return (
		<div
			className={`fixed inset-0 w-full h-full bg-quartiary-900 transition-all duration-500 ease-in-out z-[60] ${activeClass}`}
		></div>
	);
};

export default ScrollOverlay;
