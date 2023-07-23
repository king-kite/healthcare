import { BarsOutlined } from '@ant-design/icons';
import { Outlet } from 'react-router-dom';

import Sidebar from './sidebar';
import Topbar from './topbar';
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
					<Topbar />
					<Outlet />
				</div>
			</div>
		</div>
	);
}

export default DashboardLayout;
