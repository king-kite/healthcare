import { Button } from 'antd';
import { Link, useRouteError } from 'react-router-dom';

function Page() {
	const error = useRouteError();

	return (
		<div className="container flex flex-col justify-between min-h-screen mx-auto p-4">
			<div className="h-[21px] w-[120px] md:h-[48px] md:w-[282px]">
				<img
					className="h-full w-full md:hidden"
					src="/images/mobile-login-switchwise.png"
					alt="SwitchWise"
				/>
				<img
					className="hidden h-full w-full md:block"
					src="/images/desktop-login-switchwise.png"
					alt="SwitchWise"
				/>
			</div>
			<div className="flex flex-col items-center justify-center relative bottom-14 w-full">
				<h1 className="font-black my-3 text-primary-600 text-4xl tracking-wide sm:text-5xl md:text-6xl lg:text-7xl">
					{error.statusText || 'Oops!'}
				</h1>
				<p className="font-medium my-3 text-center text-secondary-500 text-sm md:text-base">
					{error.message || 'Sorry, an unexpected error occurred!'}
				</p>
				<Link to="/">
					<Button>
						<span>Go Back Home</span>
					</Button>
				</Link>
			</div>
			<div className="h-px w-px" />
		</div>
	);
}

export default Page;
