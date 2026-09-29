// Hand-drawn arrows used next to the handwritten notes.
// All of them point to the right; rotate/flip with classes when needed.

const paths = {
	curve: "M4 10 C 22 2, 44 4, 56 22 M46 20 L57 23 L58 12",
	loop: "M4 30 C 14 6, 38 4, 34 20 C 30 34, 12 24, 26 14 C 36 8, 50 12, 58 20 M49 21 L59 21 L56 11",
	down: "M8 4 C 4 22, 14 40, 34 50 M24 50 L35 51 L32 41",
};

const Scribble = ({ variant = "curve", className = "" }) => (
	<svg
		viewBox="0 0 64 56"
		fill="none"
		stroke="currentColor"
		strokeWidth={2}
		strokeLinecap="round"
		strokeLinejoin="round"
		aria-hidden="true"
		className={className}
	>
		<path d={paths[variant]} />
	</svg>
);

export default Scribble;
