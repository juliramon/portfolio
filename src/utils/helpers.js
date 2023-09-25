const isInViewport = (el) => {
	const rect = el.getBoundingClientRect();
	const elHeight = el.offsetHeight,
		elWidth = el.offsetWidth;
	return {
		top: rect.top,
		bottom: rect.bottom,
		left: rect.left,
		right: rect.right,
		isVisible:
			rect.top >= -elHeight &&
			rect.left >= -elWidth &&
			rect.bottom <=
				(window.innerHeight || document.documentElement.clientHeight) +
					elHeight &&
			rect.right <=
				(window.innerWidth || document.documentElement.clientWidth) +
					elWidth,
	};
};

export default isInViewport;
