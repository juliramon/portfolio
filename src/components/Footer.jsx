import { profile, socials } from "@/data/content";

const Footer = () => {
	const CURRENT_YEAR = new Date().getFullYear();

	return (
		<footer className="border-t border-zinc-200">
			<div className="frame">
				<div className="frame-inner flex flex-col gap-4 py-8 text-sm text-zinc-500 md:flex-row md:items-center md:justify-between">
					<span>
						© {CURRENT_YEAR} {profile.name} · {profile.role}
					</span>
					<ul className="flex flex-wrap gap-x-6 gap-y-2">
						{socials.map((social) => (
							<li key={social.id}>
								<a
									href={social.href}
									target="_blank"
									rel="noreferrer"
									className="transition-colors hover:text-zinc-900"
								>
									{social.label}
								</a>
							</li>
						))}
					</ul>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
