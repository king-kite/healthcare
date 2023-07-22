/* eslint-disable react/prop-types */
import {
	CloseOutlined,
	LogoutOutlined,
	SettingOutlined,
	WindowsOutlined,
} from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';

import { SimpleLink } from './link';
import routes from '../../config/routes';
import useLogout from '../../hooks/useLogout';

const sidebarStyle =
	'bg-white duration-1000 h-full ml-auto overflow-y-auto relative shadow-lg transform w-3/5 md:px-2 md:w-1/3 lg:bg-gray-100 lg:px-0 lg:py-4 lg:translate-x-0 lg:w-full';

const Sidebar = ({ setVisible, visible }, ref) => {
	const links = React.useMemo(
		() => [
			{
				icon: WindowsOutlined,
				title: 'Home',
				href: routes.DASHBOARD_PAGE,
				onClick: () => setVisible(false),
			},
			{
				icon: SettingOutlined,
				title: 'Settings',
				href: routes.SETTINGS_PAGE,
				onClick: () => setVisible(false),
			},
		],
		[setVisible]
	);

	const { logout: handleLogout, loading: logoutLoading } = useLogout();

	return (
		<nav
			className={`${
				visible ? 'opacity-100 z-[1000]' : 'opacity-0 z-[-100]'
			} duration-500 fixed h-full left-0 top-0 overflow-x-hidden w-full lg:opacity-100 lg:shadow-lg lg:w-1/5 lg:z-0`}
			style={{
				backgroundColor: 'rgba(0, 0, 0, 0.2)',
			}}
		>
			<div
				ref={ref}
				className={`${
					visible ? 'translate-x-0' : 'translate-x-full'
				} ${sidebarStyle}`}
			>
				<div className="flex items-center justify-between px-4 py-5 lg:hidden">
					<span className="h-[50px] inline-block w-[70px]">
						<img
							className="h-full w-full"
							src="/images/logo.png"
							alt="Vitalcare"
						/>
					</span>
					<span
						className="bg-transparent cursor-pointer duration-300 flex h-10 items-center justify-center rounded-full text-primary-600 text-xl transform transition w-10 hover:bg-gray-200 hover:scale-110"
						onClick={() => setVisible(false)}
					>
						<CloseOutlined />
					</span>
				</div>
				<div className="hidden p-4 pt-0 md:block">
					<div className="h-[40px] w-[40px]">
						<img
							className="h-full w-full"
							src="/images/logo.png"
							alt="Vitalcare"
						/>
					</div>
					<div className="h-[30px] w-[150px]">
						<img
							className="h-full w-full"
							src="/images/vitalcare-logo.png"
							alt="Vitalcare"
						/>
					</div>
				</div>
				<div className="mt-3">
					<div>
						{links.map((props, index) => (
							<SimpleLink key={index} {...props} />
						))}
					</div>
					<div className="sidebar-logout w-full">
						<Button
							disabled={logoutLoading}
							loading={logoutLoading}
							onClick={handleLogout}
							icon={
								<span className="text-red-500 text-sm">
									<LogoutOutlined />
								</span>
							}
							size="large"
							type="ghost"
						>
							<span className="text-red-500 text-sm">Logout</span>
						</Button>
					</div>
				</div>
			</div>
		</nav>
	);
};

Sidebar.displayName = 'Sidebar';

const SidebarComponent = React.forwardRef(Sidebar);

export default SidebarComponent;
