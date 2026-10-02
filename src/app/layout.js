import localFont from "next/font/local";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { profile, seo, siteUrl, socials } from "@/data/content";
import "../styles/app.sass";

// Self-hosted fonts through next/font: preloaded, with a metric-matched
// fallback, so text doesn't reflow when the webfont arrives.
const circular = localFont({
	src: [
		{
			path: "../../fonts/circular-book.woff2",
			weight: "400",
			style: "normal",
		},
		{
			path: "../../fonts/circular-medium.woff2",
			weight: "500",
			style: "normal",
		},
		{
			path: "../../fonts/circular-bold.woff2",
			weight: "700",
			style: "normal",
		},
	],
	variable: "--font-circular",
	display: "swap",
});

const handwritten = localFont({
	src: "../../fonts/shadowsintolight-regular-webfont.woff2",
	variable: "--font-handwritten",
	display: "swap",
});

export const metadata = {
	metadataBase: new URL(siteUrl),
	title: {
		default: seo.title,
		template: `%s · ${seo.shortTitle}`,
	},
	description: seo.description,
	keywords: seo.keywords,
	authors: [{ name: profile.name, url: siteUrl }],
	creator: profile.name,
	alternates: { canonical: "/" },
	openGraph: {
		type: "profile",
		url: "/",
		siteName: seo.shortTitle,
		title: seo.title,
		description: seo.description,
		locale: "en_US",
		firstName: "Juli",
		lastName: "Ramon",
	},
	twitter: {
		card: "summary_large_image",
		title: seo.title,
		description: seo.description,
		creator: "@juligoodie",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#ffffff" },
		{ media: "(prefers-color-scheme: dark)", color: "#0a0a0c" },
	],
};

// Before first paint: applies the saved theme (or the OS preference) so
// there is no flash of the wrong theme, and flags that JS is running so
// scroll-reveal elements can start hidden (see app.sass).
const themeScript = `(function(){try{var t=localStorage.getItem("theme");var d=t?t==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;if(d)document.documentElement.classList.add("dark")}catch(e){}document.documentElement.classList.add("js")})();`;

// Structured data for search engines and AI assistants
const jsonLd = {
	"@context": "https://schema.org",
	"@graph": [
		{
			"@type": "Person",
			"@id": `${siteUrl}/#person`,
			name: profile.name,
			url: siteUrl,
			image: `${siteUrl}${profile.avatar}`,
			jobTitle: profile.role,
			description: seo.description,
			worksFor: {
				"@type": "Organization",
				name: "LA TEVA WEB",
				url: "https://latevaweb.com",
			},
			address: {
				"@type": "PostalAddress",
				addressLocality: profile.location,
				addressCountry: "ES",
			},
			knowsAbout: seo.keywords.slice(2),
			sameAs: socials.map((social) => social.href),
		},
		{
			"@type": "WebSite",
			"@id": `${siteUrl}/#website`,
			url: siteUrl,
			name: seo.shortTitle,
			inLanguage: "en",
			author: { "@id": `${siteUrl}/#person` },
		},
	],
};

export default function RootLayout({ children }) {
	return (
		<html
			lang="en"
			className={`${circular.variable} ${handwritten.variable}`}
			suppressHydrationWarning
		>
			<head>
				<script dangerouslySetInnerHTML={{ __html: themeScript }} />
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
			</head>
			<body>
				<a href="#content" className="skip-link">
					Skip to content
				</a>
				<Nav />
				<main id="content">{children}</main>
				<Footer />
			</body>
		</html>
	);
}
