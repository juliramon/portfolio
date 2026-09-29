"use client";

import { useEffect, useState } from "react";

const BIRTH_DATE = new Date("1993-12-20T08:30:00+0000").getTime();
const MILISECONDS_YEAR = 31556952000;

const getAge = () => (Date.now() - BIRTH_DATE) / MILISECONDS_YEAR;

const LifeCounter = ({ className = "" }) => {
	const [age, setAge] = useState(null);

	useEffect(() => {
		setAge(getAge());
		const interval = setInterval(() => setAge(getAge()), 50);
		return () => clearInterval(interval);
	}, []);

	return (
		<span className={`tabular-nums ${className}`}>
			{age ? age.toFixed(9) : "—"}
		</span>
	);
};

export default LifeCounter;
