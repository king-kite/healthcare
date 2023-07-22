import { Button } from 'antd';
import { Link } from 'react-router-dom';

import routes from '../config/routes';

function Home() {
	return (
		<div className="bg-gray-50 min-h-screen w-full">
			<div className="bg-white p-4 shadow-lg">
				<div className="flex items-center justify-between container mx-auto lg:px-3">
					<div className="h-[30px] w-[150px]">
						<img
							className="h-full w-full"
							src="/images/vitalcare-logo.png"
							alt="Vitalcare"
						/>
					</div>
					<div className="flex items-center">
						<Link to={routes.LOGIN_PAGE}>
							<Button size="large" type="primary">
								<span className="px-2 text-sm md:text-base">Login</span>
							</Button>
						</Link>
						<Link className="mx-3" to={routes.DASHBOARD_PAGE}>
							<Button size="large" type="primary">
								<span className="px-2 text-sm md:text-base">Dashboard</span>
							</Button>
						</Link>
						<span>
							<Button
								className="border border-primary-500 border-solid"
								size="large"
								type="ghost"
							>
								<span className="px-2 text-sm md:text-base">Logout</span>
							</Button>
						</span>
					</div>
				</div>
			</div>
			<div className="container mx-auto p-4 lg:flex lg:flex-row-reverse lg:items-center">
				<div className="bg-auth-lg-background my-2 rounded w-full">
					<div className="h-[250px] relative w-full sm:h-[300px] lg:h-[400px]">
						<img
							className="h-full rounded w-full"
							src="/images/vitalcare.png"
							alt="Vitalcare"
						/>
					</div>
				</div>
				<div className="my-3">
					<h1 className="font-semibold my-3 text-center text-primary-500 lg:font-bold lg:text-left lg:text-5xl">
						Keep track of your health easily.
					</h1>
					<p className="font-medium my-3 p-2 text-center text-gray-800 text-base lg:px-0 lg:text-left lg:text-lg">
						Self service you can do anywhere. Simplify the steps needed to keep
						track of your health.
					</p>
					<div className="flex justify-center lg:justify-start">
						<Link to={routes.LOGIN_PAGE}>
							<Button size="large" type="primary">
								<span className="px-2 text-sm md:text-base">Get Started</span>
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Home;
