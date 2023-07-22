/* eslint-disable react/prop-types */
import React from 'react';
import { Link, useMatch } from 'react-router-dom';

const activeLinkClasses = 'bg-primary-500 text-gray-100 tracking-widest';
const inactiveLinkClasses =
	'duration-500 text-secondary-500 transform transition hover:bg-primary-500 hover:text-gray-100 hover:tracking-widest';

const DefaultIcon = () => <></>;

export function SimpleLink({
	href = '#',
	icon: Icon = DefaultIcon,
	onClick,
	title,
}) {
	const value = useMatch(href);
	const isActive = React.useMemo(() => value !== null, [value]);

	return (
		<Link
			className={`${
				isActive ? activeLinkClasses : inactiveLinkClasses
			} cursor-pointer flex font-semibold items-center no-underline p-4 rounded-sm text-sm`}
			to={href}
			onClick={onClick}
		>
			<span className="mr-2">
				<Icon />
			</span>
			<span className="">{title}</span>
		</Link>
	);
}
