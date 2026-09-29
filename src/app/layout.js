import Nav from "@/components/Nav";
import ScrollOverlay from "@/components/ScrollOverlay";
import Footer from "@/components/Footer";
import "../styles/app.sass";

export const metadata = {
	title: "Juli Ramon · Front-End Developer",
	description:
		"Juli Ramon is a front-end developer based in Barcelona who builds web interfaces that engage and convert.",
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
