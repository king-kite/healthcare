import { BarsOutlined } from '@ant-design/icons';
import { Outlet } from 'react-router-dom';

import Sidebar from './sidebar';
import useOutsideClick from '../../hooks/useOutsideClick';

function DashboardLayout() {
	const menu = useOutsideClick();

	return (
		<div className="bg-gray-50 w-full">
			<div className="bg-white p-4 shadow-lg lg:hidden">
				<div className="container flex items-center justify-between mx-auto">
					{/* Logo */}
					<div>
						<div className="h-[30px] w-[150px]">
							<img
								className="h-full w-full"
								src="/images/vitalcare-logo.png"
								alt="Vitalcare"
							/>
						</div>
					</div>
					{/* Logo */}

					<span
						className="cursor-pointer duration-300 text-primary-600 text-lg transform transition hover:scale-105"
						ref={menu.buttonRef}
						onClick={() => menu.setVisible(true)}
					>
						<BarsOutlined />
					</span>
				</div>
			</div>

			<div className="flex">
				<Sidebar
					setVisible={menu.setVisible}
					visible={menu.visible}
					ref={menu.ref}
				/>
				<div className="h-full min-h-screen w-full lg:max-w-none lg:ml-auto lg:mr-0 lg:w-4/5">
					<Outlet />
				</div>
			</div>
		</div>
	);
}

export default DashboardLayout;

/*

import { BarsOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';

import Sidebar from './sidebar';
import pageRoutes from '../config/routes';
import useOutsideClick from '../hooks/useOutsideClick';

function Layout() {
	const menu = useOutsideClick();

	const data = useSelector((state) => state.auth.data);

	return (
		<div className="overflow-x-hidden w-full">
			<div className="bg-gray-100">
				<div className="flex items-center justify-between p-4 sm:max-w-[580px] sm:mx-auto md:max-w-[768px] md:px-6 md:py-3 lg:hidden">
					
					<div>
						<div className="h-[21px] mx-auto w-[120px] md:h-[32px] md:w-[181px]">
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
					</div>
					

					<span
						className="cursor-pointer duration-300 text-color-primary text-lg transform transition hover:scale-105"
						ref={menu.buttonRef}
						onClick={() => menu.setVisible(true)}
					>
						<BarsOutlined />
					</span>
				</div>
			</div>
			<div className="flex">
				<Sidebar
					setVisible={menu.setVisible}
					visible={menu.visible}
					ref={menu.ref}
				/>

				<div className="h-full min-h-screen p-4 w-full sm:max-w-[580px] sm:mx-auto md:max-w-[768px] md:px-6 md:py-3 lg:max-w-none lg:ml-auto lg:mr-0 lg:px-12 lg:w-4/5">
					<div className="hidden items-center justify-between my-3 lg:flex">
						<h3 className="font-semibold text-base text-secondary-500">
							Welcome, {data?.displayName || data?.email || 'Anonymous User'}
						</h3>
						<div className="flex items center">
							<Link
								to={pageRoutes.HOME_PAGE}
								className="cursor-pointer duration-500 font-semibold ml-4 text-secondary-500 text-lg transform hover:scale-105"
							>
								<ArrowRightOutlined />
							</Link>
						</div>
					</div>
					<Outlet />
				</div>
			</div>
		</div>
	);
}

export default Layout;

*/
