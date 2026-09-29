const Icon = ({ classList = "", children }) => {
	return (
		<i className={`inline-flex shrink-0 [&>svg]:h-full [&>svg]:w-full ${classList}`}>
			{children}
		</i>
	);
};

export default Icon;
