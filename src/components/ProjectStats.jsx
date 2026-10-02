import { projectStats } from "@/data/content";

// KPI tiles + a ranked horizontal bar chart of projects by technology.
// Single series in brand violet (validated: #7c3aed on light, #8b5cf6 on dark),
// value at each bar tip, per-row hover/focus tooltip, and a real <table>
// underneath so the data never depends on color or hover.
const ProjectStats = () => {
	const { total, technologies, isApproximate } = projectStats;
	const sorted = [...technologies].sort((a, b) => b.share - a.share);
	const max = sorted[0]?.share || 100;

	return (
		<div className="mb-10 grid gap-4 lg:grid-cols-3">
			{/* KPI tiles */}
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
				<div data-reveal className="card p-6">
					<span className="eyebrow">Projects delivered</span>
					<p className="mt-3 text-5xl font-medium tracking-tight text-zinc-900">
						{total}+
					</p>
					<p className="mt-2 text-sm text-zinc-500">
						Websites and online stores built and shipped.
					</p>
				</div>
				<div data-reveal className="card p-6">
					<span className="eyebrow">Core technologies</span>
					<p className="mt-3 text-5xl font-medium tracking-tight text-zinc-900">
						{technologies.length}
					</p>
					<p className="mt-2 text-sm text-zinc-500">
						{technologies.map((tech) => tech.name).join(" · ")}
					</p>
				</div>
			</div>

			{/* Distribution chart */}
			<div data-reveal className="card p-6 md:p-8 lg:col-span-2">
				<div className="flex flex-wrap items-start justify-between gap-3">
					<div>
						<h3 className="text-lg">Projects by technology</h3>
						<p className="mt-1 text-sm text-zinc-500">
							Share of the {total}+ projects I&apos;ve worked on.
						</p>
					</div>
					{isApproximate ? (
						<span className="tag">Approximate</span>
					) : null}
				</div>

				<table className="mt-6 w-full border-separate border-spacing-y-3">
					<caption className="sr-only">
						Share of {total}+ projects by technology
						{isApproximate ? " (approximate)" : ""}
					</caption>
					<thead className="sr-only">
						<tr>
							<th scope="col">Technology</th>
							<th scope="col">Share of projects</th>
						</tr>
					</thead>
					<tbody>
						{sorted.map((tech) => {
							const projects = Math.round(
								(total * tech.share) / 100,
							);
							return (
								<tr
									key={tech.name}
									tabIndex={0}
									className="group outline-none"
								>
									<th
										scope="row"
										className="w-28 pr-4 text-left text-sm font-normal text-zinc-700 group-hover:text-zinc-900 group-focus-visible:text-zinc-900 group-focus-visible:underline group-focus-visible:underline-offset-4"
									>
										{tech.name}
									</th>
									<td className="relative">
										{/* Bar scaled to the largest share (no 100% track, which would
									    misread as a meter); square at the baseline, 4px rounded end */}
										<div
											className="h-2.5"
											aria-hidden="true"
										>
											<div
												className="chart-bar h-full rounded-r-[4px] bg-[#7c3aed] transition-[filter] group-hover:brightness-110 group-focus-visible:brightness-110 dark:bg-[#8b5cf6]"
												style={{
													width: `${(tech.share / max) * 100}%`,
												}}
											/>
										</div>
										{/* Tooltip on hover / keyboard focus */}
										<span
											className="pointer-events-none absolute bottom-full z-10 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded-md border border-zinc-200 bg-surface px-2.5 py-1.5 text-xs text-zinc-700 shadow-sm group-hover:block group-focus-visible:block"
											style={{
												left: `${(tech.share / max) * 100}%`,
											}}
											aria-hidden="true"
										>
											<span className="font-medium text-zinc-900">
												{tech.name}
											</span>{" "}
											· {tech.share}% · ~{projects}{" "}
											projects
										</span>
									</td>
									<td className="w-14 pl-4 text-right text-sm font-medium tabular-nums text-zinc-900">
										{tech.share}%
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default ProjectStats;
