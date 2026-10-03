import Icon from "@/components/Icon";
import { iconArrowRight } from "@/utils/icons";

// Layout for the side projects that run inside the site (/projects/*):
// back link, title, description, stack, then the project itself.
const ProjectPage = ({ project, children }) => (
	<>
		<section className="rule">
			<div className="frame">
				<span className="cross cross-tl" aria-hidden="true" />
				<span className="cross cross-tr" aria-hidden="true" />
				<div className="frame-inner relative pb-10 pt-12 md:pb-14 md:pt-16">
					<a
						href="/#projects"
						className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-zinc-500 transition-colors hover:text-zinc-900"
					>
						<Icon classList="h-3.5 w-3.5 -scale-x-100">
							{iconArrowRight}
						</Icon>
						All projects
					</a>
					<h1 className="section-title md:text-5xl">
						{project.title}
					</h1>
					<p className="section-lead">{project.description}</p>
					<div className="mt-6 flex flex-wrap items-center gap-2">
						<span className="mr-1 font-mono text-xs uppercase tracking-widest text-zinc-500">
							Built with
						</span>
						{project.stack.map((tech) => (
							<span key={tech} className="tag">
								{tech}
							</span>
						))}
					</div>
				</div>
			</div>
		</section>
		<section className="rule">
			<div className="frame">
				<div className="frame-inner py-10 md:py-14">{children}</div>
			</div>
		</section>
	</>
);

export default ProjectPage;
