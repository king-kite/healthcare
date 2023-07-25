import {
	CloseOutlined,
	GroupOutlined,
	PieChartOutlined,
	SettingOutlined,
	SolutionOutlined,
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
				icon: SolutionOutlined,
				title: 'Tests',
				href: routes.TESTS_PAGE,
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
