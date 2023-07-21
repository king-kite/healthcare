import { Outlet } from 'react-router-dom';

function AuthLayout() {
	return (
		<div className="w-full">
			<div className="h-full hidden min-h-screen w-full">
				<img
					className="h-full w-full"
					src="/images/auth-bg.jpg"
					alt="Vitalcare"
				/>
			</div>
			<div className="bg-gray-100 min-h-[100vh] w-full">
				<div className="bg-white flex items-center justify-center p-4 shadow-lg">
					<div className="h-[30px] w-[150px]">
						<img
							className="h-full w-full"
							src="/images/vitalcare-logo.png"
							alt="Vitalcare"
						/>
					</div>
				</div>
				<div className="flex items-center justify-center p-6">
					<div className="bg-white max-w-sm p-6 rounded-md shadow-lg w-full md:max-w-md">
						<Outlet />
					</div>
				</div>
			</div>
		</div>
	);
}

export default AuthLayout;
