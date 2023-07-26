function Container({ children, title }) {
	return (
		<>
			<div className="container-banner">
				<div className="wrapper">
					<div className="container-dashboard flex h-full items-end p-4 relative w-full">
						<h2 className="text-2xl font-bold leading-7 text-gray-100 sm:text-3xl sm:tracking-tight">
							{title}
						</h2>
					</div>
				</div>
			</div>
			<div className="container-dashboard py-4">{children}</div>
		</>
	);
}

export default Container;
