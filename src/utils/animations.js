import isInViewport from "./helpers";

const animateElements = () => {
	const animatedBlocks = document.querySelectorAll(".block-animated");
	const animatedBlockElements =
		document.querySelectorAll(".animated-element");

	if (!animatedBlocks.length > 0 && !animatedBlockElements.length > 0) return;

	animatedBlocks.forEach(function (blockElement) {
		const renderBlock = function renderBlock(elements) {
			let triggerDelay = 0;
			elements.forEach((element, idx) => {
				if (isInViewport(element).isVisible) {
					triggerDelay = element.dataset.delay
						? element.dataset.delay
						: 0;
					setTimeout(() => {
						return element.classList.add("show");
					}, triggerDelay);
				}
			});
		};

		isInViewport(blockElement).isVisible
			? renderBlock(blockElement.querySelectorAll(".animated-element"))
			: null;
		window.addEventListener("scroll", function bindScrollEvent(e) {
			e.preventDefault();
			isInViewport(blockElement).isVisible
				? renderBlock(
						blockElement.querySelectorAll(".animated-element")
				  )
				: null;
		});
	});
};

export default animateElements;
