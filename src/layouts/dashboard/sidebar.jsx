/* eslint-disable react/prop-types */
import {
	CaretRightOutlined,
	CloseOutlined,
	GroupOutlined,
	PieChartOutlined,
	SettingOutlined,
	UserOutlined,
} from '@ant-design/icons';
import React from 'react';

import SidebarLink from './link';
import LogoutButton from './logout-button';
import routes from '../../config/routes';

const sidebarStyle =
	'bg-white duration-1000 h-full ml-auto overflow-y-auto relative shadow-lg transform w-3/5 sm:w-1/2 md:w-1/3 lg:bg-gray-100 lg:px-0 lg:py-4 lg:translate-x-0 lg:w-full';

const Sidebar = ({ setVisible, visible }, ref) => {
	const links = React.useMemo(
		() => [
			{
				icon: PieChartOutlined,
				title: 'Overview',
				href: routes.DASHBOARD_PAGE,
			},
			{
				icon: GroupOutlined,
				title: 'Patients',
				href: routes.PATIENTS_PAGE,
			},
			{
				icon: UserOutlined,
				title: 'Profile',
				href: routes.PROFILE_PAGE,
			},
			{
				icon: SettingOutlined,
				title: 'Settings',
				href: routes.SETTINGS_PAGE,
			},
		],
		[]
	);

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
				<div className="flex items-center justify-between px-4 py-5">
					<span className="h-[30px] inline-block w-[150px]">
						<img
							className="h-full w-full"
							src="/images/vitalcare-logo.png"
							alt="Vitalcare"
						/>
					</span>
					<span
						className="sidebar-close-icon"
						onClick={() => setVisible(false)}
					>
						<CloseOutlined />
					</span>
				</div>
				<div className="bg-gray-200 cursor-pointer flex items-center justify-between my-4 px-4 pl-3 py-2 rounded-br-3xl hover:bg-gray-300">
					<span className="flex items-center">
						<span className="mr-2 text-lg">
							<span className="bg-primary-500 h-10 inline-flex items-center justify-center rounded-full text-gray-50 w-10">
								<span className="left-[0.05rem] relative top-[0.075rem]">
									J
								</span>
							</span>
						</span>
						<span className="font-semibold text-gray-700 text-sm md:text-base">
							John Doe
						</span>
					</span>
					<span className="ml-2 relative text-[8px] text-primary-500 top-[0.11rem]">
						<CaretRightOutlined />
					</span>
				</div>
				<div className="mt-6">
					<div>
						{links.map((props, index) => (
							<SidebarLink
								key={index}
								{...props}
								onClick={() => setVisible(false)}
							/>
						))}
					</div>

					{/* Logout Button */}
					<LogoutButton setVisible={setVisible} />
					{/* Logout Button */}
				</div>
			</div>
		</nav>
	);
};

Sidebar.displayName = 'Sidebar';

const SidebarComponent = React.forwardRef(Sidebar);

export default SidebarComponent;
