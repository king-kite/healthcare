import { Button } from 'antd';
import { Link, Outlet } from 'react-router-dom';

import routes from '../config/routes';

function AuthLayout() {
	return (
		<div className="w-full lg:flex">
			<div className="bg-auth-lg-background h-full hidden min-h-screen relative w-full lg:block">
				<img
					className="h-full w-full"
					src="/images/vitalcare.png"
					alt="Vitalcare"
				/>
			</div>
			<div className="bg-gray-100 min-h-[100vh] w-full">
				<div className="bg-white p-4 shadow-lg">
					<div className="flex items-center justify-between max-w-sm mx-auto">
						<div className="h-[30px] w-[150px]">
							<img
								className="h-full w-full"
								src="/images/vitalcare-logo.png"
								alt="Vitalcare"
							/>
						</div>
						<div className="">
							<Link to={routes.HOME_PAGE}>
								<Button size="large" type="primary">
									<span className="px-2 text-sm md:text-base">Home</span>
								</Button>
							</Link>
						</div>
					</div>
				</div>
				<div className="flex items-center justify-center p-6">
					<div className="bg-white max-w-sm p-6 rounded-md shadow-lg w-full">
						<Outlet />
					</div>
				</div>
			</div>
		</div>
	);
}

export default AuthLayout;
