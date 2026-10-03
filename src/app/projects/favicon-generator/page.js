import ProjectPage from "@/components/ProjectPage";
import FaviconGenerator from "@/components/projects/FaviconGenerator";
import { projects } from "@/data/content";

const project = projects.find((p) => p.id === "favicon-generator");

export const metadata = {
	title: project.title,
	description: project.description,
	alternates: { canonical: project.page },
};

export default function FaviconGeneratorPage() {
	return (
		<ProjectPage project={project}>
			<div className="overflow-hidden rounded-xl border border-zinc-200 [&>div]:min-h-0">
				<FaviconGenerator />
			</div>
		</ProjectPage>
	);
}
