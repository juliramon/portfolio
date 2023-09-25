"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Home() {
	const firstSectionContainer = useRef();
	const firstSectionHeading = useRef();
	const firstSectionTextBlock = useRef();
	const firstSectionImage = useRef();
	const firstSectionImageDetail = useRef();
	const firstSectionTextBlock2 = useRef();
	const sectionContainerArticles = useRef();

	useEffect(() => {
		gsap.registerPlugin(ScrollTrigger);

		const timeline = gsap.timeline({
			scrollTrigger: {
				trigger: firstSectionContainer.current,
				ease: "power1.linear",
			},
		});

		timeline.to(firstSectionHeading.current, {
			top: "50%",
			duration: 0.7,
			delay: 0.3,
		});

		let fromFontSize = "";
		let toScale = 0;

		const initScrollTrigger = () => {
			gsap.fromTo(
				firstSectionHeading.current,
				{
					fontSize: fromFontSize,
				},
				{
					scrollTrigger: {
						trigger: firstSectionContainer.current,
						start: "top 0%",
						scrub: 1,
						pin: true,
						end: `+=${window.innerHeight / 2}`,
						// toggleClass: "show",
						markers: false,
						ease: "power1.linear",
						duration: 0.7,
					},
					scale: toScale,
				}
			);
		};

		ScrollTrigger.matchMedia({
			"(min-width:768px)": () => {
				fromFontSize = "8vw";
				toScale = 160;
				initScrollTrigger();
			},
			"(max-width:767px)": () => {
				fromFontSize = "15vw";
				toScale = 180;
				initScrollTrigger();
			},
		});

		gsap.to(firstSectionTextBlock.current, {
			opacity: 1,
			translateY: 0,
			scrollTrigger: {
				trigger: firstSectionTextBlock.current,
				start: "top 70%",
				scrub: 1,
				pin: false,
				end: `+=${firstSectionTextBlock.current.offsetHeight}`,
				// toggleClass: "show",
				markers: false,
				ease: "power1.linear",
				duration: 0.7,
			},
		});

		gsap.to(firstSectionImage.current, {
			opacity: 1,
			translateY: 0,
			scrollTrigger: {
				trigger: firstSectionImage.current,
				start: "top 70%",
				scrub: 1,
				pin: false,
				end: `+=${firstSectionImage.current.offsetHeight}`,
				// toggleClass: "show",
				markers: false,
				ease: "power1.linear",
				duration: 0.7,
			},
		});

		gsap.to(firstSectionImageDetail.current, {
			scrollTrigger: {
				trigger: firstSectionImage.current,
				start: "top 70%",
				ease: "power1.linear",
			},
			translateX: 0,
			opacity: 1,
			duration: 0.6,
			delay: 0.3,
		});

		gsap.to(firstSectionTextBlock2.current, {
			opacity: 1,
			translateY: 0,
			scrollTrigger: {
				trigger: firstSectionTextBlock2.current,
				start: "top 70%",
				scrub: 1,
				pin: false,
				end: `+=${firstSectionTextBlock2.current.offsetHeight}`,
				// toggleClass: "show",
				markers: false,
				ease: "power1.linear",
				duration: 0.7,
			},
		});

		gsap.to(sectionContainerArticles.current, {
			opacity: 1,
			translateY: 0,
			scrollTrigger: {
				trigger: sectionContainerArticles.current,
				start: "top 70%",
				// scrub: 1,
				pin: false,
				end: `+=${sectionContainerArticles.current.offsetHeight}`,
				// toggleClass: "show",
				markers: false,
				ease: "power1.linear",
				duration: 0.7,
			},
		});
	});

	return (
		<>
			{/* Section heading h1 */}
			<section
				className="h-adaptative relative overflow-hidden bg-dark"
				ref={firstSectionContainer}
			>
				<h1
					className="absolute inset-x-0 top-full -translate-y-1/2 text-center"
					ref={firstSectionHeading}
				>
					Hi, it's <span>Juli</span>.
				</h1>
			</section>

			{/* Section about */}
			<section className="bg-primary-200 text-primary-800 py-12 md:py-24">
				<div className="container-xs">
					<div ref={firstSectionTextBlock} className="opacity-0">
						<p>
							I'm a{" "}
							<span className="bg-primary-900 text-quartiary-500 inline-block px-2.5">
								creative front-end developer
							</span>{" "}
							on a mission to make digital products fancier and
							valuable. Very passionate about web performance
							optimization and user interface design.
						</p>
						<a
							href={"mailto:julideramon@gmail.com"}
							title={"Want to say hi? Drop me an email"}
							className="button button-primary mt-4"
							target="_blank"
							rel="nofollow noreferrer"
						>
							Want to say hi? Drop me an email
						</a>
					</div>
					<div
						className="relative mt-12 md:mt-16 opacity-0 translate-y-12"
						ref={firstSectionImage}
					>
						<picture className="block w-full h-full rounded-md overflow-hidden ">
							<img
								src="/images/cover-juli-ramon.jpg"
								alt="Portrait picture of Juli Ramon"
								className="w-full h-full object-cover grayscale"
							/>
						</picture>
						<div
							className="absolute top-[5vh] md:top-[8vh] md:-left-[12vh] w-auto h-auto -rotate-[20deg] flex flex-col max-w-[190px] md:max-w-[390px] -translate-x-36 opacity-0"
							ref={firstSectionImageDetail}
						>
							<span className="inline-block mb-2 font-handwritten text-secondary-500 text-2xl">
								The motto.
							</span>
							<span className="font-handwritten inline-block text-[3vh] md:text-[5vh] leading-[1.1] text-quartiary-500">
								Do what you love and to it{" "}
								<span className="line-through">often</span>{" "}
								always.
							</span>
						</div>
					</div>
					<div
						className="relative mt-12 md:mt-16 opacity-0 translate-y-12"
						ref={firstSectionTextBlock2}
					>
						<p>
							Currently a happy{" "}
							<span className="bg-primary-800 text-secondary-500 px-2.5">
								web artisan
							</span>{" "}
							at{" "}
							<a
								href="https://latevaweb.com"
								title="LA TEVA WEB"
								rel="nofollow noreferrer"
								target="_blank"
							>
								LA TEVA WEB
							</a>
							, where I develop optimized web platforms for
							clients to better communicate and sale on the
							Internet.
						</p>
						<p className="mt-7 mb-0">
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
				</div>
			</section>

			{/* Section articles */}
			<section
				className="pt-12 pb-24 md:pt-24 md:pb-32 opacity-0 translate-y-12"
				ref={sectionContainerArticles}
			>
				<div className="container-xs">
					<h2 className="text-block max-w-lg">
						I code, and occasionaly I also write. Have a look at my
						latest articles.
					</h2>
				</div>
				<div className="container">
					<div className="flex items-start mt-8 md:mt-12 justify-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="mr-2.5"
							width={24}
							height={24}
							viewBox="0 0 24 24"
							strokeWidth={1.2}
							stroke="currentColor"
							fill="none"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path
								stroke="none"
								d="M0 0h24v24H0z"
								fill="none"
							></path>
							<path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
							<path d="M14.5 16.05a3.5 3.5 0 0 0 -5 0"></path>
							<path d="M8.5 11.5l1.5 -1.5l-1.5 -1.5"></path>
							<path d="M15.5 11.5l-1.5 -1.5l1.5 -1.5"></path>
						</svg>
						<p className="font-mono text-sm max-w-md mb-0 flex-1">
							No articles imported yet. Please try again later.
						</p>
					</div>
				</div>
			</section>
		</>
	);
}
