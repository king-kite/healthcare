import { Alert } from 'antd';

function Container({ children, alert, image, title = 'Page' }) {
	return (
		<>
			<div className="container-banner">
				<div className="wrapper">
					<div
						className={`${
							image ? 'sm:items-end' : 'items-end'
						} container-dashboard flex h-full p-4 relative w-full`}
					>
						<h2
							className={`${
								image ? 'sm:ml-28 lg:ml-24' : ''
							} text-2xl font-bold leading-7 text-gray-100 sm:text-3xl sm:tracking-tight`}
						>
							{title}
						</h2>
						{image && (
							<span className="absolute bottom-[-3rem] left-4">
								<span className="bg-primary-500 border-4 border-gray-100 border-solid h-24 inline-flex items-center justify-center relative rounded-full text-gray-50 w-24">
									{image.url ? (
										<img
											className="h-full rounded-full w-full"
											src={image.url}
											alt={image.alt}
										/>
									) : (
										<span className="left-[0.05rem] relative text-xl top-[0.075rem]">
											{image.alt || title[0]}
										</span>
									)}
								</span>
							</span>
						)}
					</div>
				</div>
			</div>
			<div
				className={`container-dashboard ${
					image ? 'pt-16 pb-4 sm:pt-20' : 'py-4'
				}`}
			>
				{alert && (
					<div className="my-3">
						<Alert
							message={alert.title}
							description={alert.message}
							showIcon
							type={alert.type}
							closable={alert.close ? true : false}
							onClose={alert.close}
						/>
					</div>
				)}
				{children}
			</div>
		</>
	);
}

export default Container;
