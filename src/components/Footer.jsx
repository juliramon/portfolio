const Footer = () => {
	const date = new Date();
	const CURRENT_YEAR = date.getFullYear();
	return (
		<footer className="px-6 pt-10 pb-6">
			<div className="flex flex-wrap items-center">
				<pre className="inline-block text-xs whitespace-pre-wrap">
					Copyright © {CURRENT_YEAR} :: Juli Ramon :: Front-End
					Developer
				</pre>
			</div>
		</footer>
	);
};

export default Footer;
