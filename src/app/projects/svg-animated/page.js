import ProjectPage from "@/components/ProjectPage";
import EmbeddedPage from "@/components/projects/EmbeddedPage";
import { projects } from "@/data/content";

const project = projects.find((p) => p.id === "svg-animated");

export const metadata = {
	title: project.title,
	description: project.description,
	alternates: { canonical: project.page },
};

export default function SvgAnimatedPage() {
	return (
		<ProjectPage project={project}>
			<EmbeddedPage
				src="/projects/svg-animated/index.html"
				title={project.title}
			/>
		</ProjectPage>
	);
}
