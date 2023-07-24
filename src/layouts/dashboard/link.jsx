/* eslint-disable react/prop-types */
import { CaretDownOutlined, CaretRightOutlined } from '@ant-design/icons';
import React from 'react';
import { Link, useLocation, useMatch } from 'react-router-dom';

function SidebarLink({
	href = '#',
	icon: Icon = CaretRightOutlined,
	onClick,
	title,
}) {
	const { pathname } = useLocation();
	const value = useMatch(href);

	const isActive = React.useMemo(() => value !== null, [value]);
	const starts = React.useMemo(() => pathname !== "/" && href !== "/" && pathname !== href & pathname.startsWith(href), [href, pathname])

	return (
		<Link
			className={`${isActive || starts ? 'active' : 'inactive'} sidebar-link`}
			to={href}
			onClick={onClick}
		>
			<span className="flex items-center">
				<span className="link-icon mr-2 text-xl text-gray-400">
					<Icon />
				</span>
				<span className="font-semibold text-sm md:text-base">{title}</span>
			</span>
			{isActive ? (
				<span className="ml-2 relative text-[8px] top-[0.11rem]">
					<CaretRightOutlined />
				</span>
			): starts ? (
				<span className="ml-2 relative text-[8px] top-[0.11rem]">
					<CaretDownOutlined />
				</span>
			) : null}
		</Link>
	);
}

export default SidebarLink;
