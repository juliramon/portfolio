import Nav from "@/components/Nav";
import Image from "next/image";

export default function Home() {
	return (
		<>
			<header>
				<Nav />
			</header>
			<main>
				<section className="py-24">
					<div className="container-xs">
						<h1 className="text-3xl mt-0 mb-7">Hi, it's Juli.</h1>
						<p className="font-light text-lg text-primary-100">
							A creative frontend developer on a steady mission to
							make digital products fancier and valuable. Very
							passionate about web performance optimization, User
							Interface design and the MERN stack.
						</p>
						<p className="font-light text-lg text-primary-100">
							Currently part of the team of web artisans at{" "}
							<img
								src="./logo-ltw.svg"
								alt=""
								class="inline w-7 h-auto"
							/>{" "}
							<a
								href="https://latevaweb.com"
								title="LA TEVA WEB"
								rel="nofollow noreferrer"
								target="_blank"
							>
								LA TEVA WEB
							</a>
							, where I develop optimized platforms for clients to
							better communicate and sale on the Internet.
						</p>
						<p className="font-light text-lg text-primary-100">
							On my spare time you will either find me up in the
							mountains or exploring and documenting my
							surroundings{" "}
							<a
								href="https://escapadesenparella.cat"
								title="Escapades en parella a Catalunya"
								rel="follow"
								target="_blank"
							>
								one post at a time
							</a>
							.
						</p>
					</div>
				</section>
			</main>
		</>
	);
}
