function Container({ children, title }) {
	return (
		<>
			<div className="container-banner">
				<div className="wrapper">
					<div className="container flex h-full items-end mx-auto p-4 relative w-full">
						<h2 className="text-2xl font-bold leading-7 text-gray-100 sm:text-3xl sm:tracking-tight">
							{title}
						</h2>
					</div>
				</div>
			</div>
			<div className="container mx-auto p-4 md:px-5 lg:px-6">{children}</div>
		</>
	);
}

export default Container;
