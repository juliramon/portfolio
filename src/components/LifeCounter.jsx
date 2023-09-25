"use client";

import { useEffect, useState } from "react";

const LifeCounter = () => {
	const currentDate = new Date();
	const birthDate = new Date("1993-12-20T08:30:00+0000");
	const MILISECONDS_YEAR = 31556952000;

	const [miliseconds, setMiliseconds] = useState(null);

	useEffect(() => {
		const birthDateToMiliseconds = birthDate.getTime();
		const currentDateToMiliseconds = currentDate.getTime();

		const diffMiliseconds =
			currentDateToMiliseconds - birthDateToMiliseconds;

		const diffYears = diffMiliseconds / MILISECONDS_YEAR;

		const interval = setInterval(() => {
			setMiliseconds(diffYears);
		}, 10);

		return () => clearInterval(interval);
	}, [miliseconds]);

	return (
		<>
			{miliseconds ? (
				<pre className="text-xs inline-block text-primary-400 bg-primary-500 px-1 py-0.5">
					v{miliseconds}
				</pre>
			) : null}
		</>
	);
};

export default LifeCounter;
