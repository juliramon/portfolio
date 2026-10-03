"use client";

import { useEffect, useRef, useState } from "react";

// Same-origin iframe that grows with its content, so a standalone HTML
// project reads as part of the page instead of a scrolling box.
const EmbeddedPage = ({ src, title, minHeight = 900 }) => {
	const ref = useRef(null);
	const [height, setHeight] = useState(minHeight);

	useEffect(() => {
		const frame = ref.current;
		let observer;

		const attach = () => {
			const doc = frame.contentDocument;
			if (!doc?.body) return;
			const resize = () =>
				setHeight(
					Math.max(minHeight, doc.documentElement.scrollHeight),
				);
			observer?.disconnect();
			observer = new ResizeObserver(resize);
			observer.observe(doc.body);
			resize();
		};

		frame.addEventListener("load", attach);
		attach();
		return () => {
			frame.removeEventListener("load", attach);
			observer?.disconnect();
		};
	}, [minHeight]);

	return (
		<iframe
			ref={ref}
			src={src}
			title={title}
			style={{ height }}
			className="block w-full overflow-hidden rounded-xl border border-zinc-200 bg-white"
		/>
	);
};

export default EmbeddedPage;
