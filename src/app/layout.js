import Nav from "@/components/Nav";
import ScrollOverlay from "@/components/ScrollOverlay";
import Footer from "@/components/Footer";
import "../styles/app.sass";

export const metadata = {
	title: "Juli Ramon · Front-End Team Lead",
	description:
		"Juli Ramon is a front-end team lead in Barcelona building websites and e-commerce, working daily with AI agents like Claude and Cursor.",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>
				<ScrollOverlay />
				<Nav />
				<main>{children}</main>
				<Footer />
			</body>
		</html>
	);
}
