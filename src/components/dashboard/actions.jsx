import {
	GroupOutlined,
	SolutionOutlined,
	UserOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import React from 'react';

import routes from '../../config/routes';

export function BoxTitle({ title }) {
	return (
		<>
			<h3 className="capitalize my-3 py-2 text-gray-700 text-lg md:text-xl lg:text-2xl">
				{title}
			</h3>
			<div className="bg-gray-200 h-[1px] my-5 w-full">
				<div className="bg-primary-500 h-[1px] w-1/5" />
			</div>
		</>
	);
}

function BoxGridItem({
	bg,
	caps = true,
	component: Component = ({ children }) => <>{children}</>,
	icon: Icon,
	onClick,
	title,
}) {
	return (
		<Component>
			<abbr
				title={title}
				className="block cursor-pointer no-underline transition transform hover:scale-105"
				onClick={onClick}
			>
				<div className="bg-gray-100 border border-gray-200 flex justify-center p-4 rounded-md hover:bg-gray-200">
					<span
						className={`${bg} h-[60px] inline-flex items-center justify-center rounded-full w-[60px]`}
					>
						<Icon className="h-[20px] text-gray-50 w-[20px]" />
					</span>
				</div>
				<p
					className={`${
						caps ? 'capitalize' : 'normal-case'
					} my-2 no-underline text-center text-gray-700 text-sm tracking-wide truncate md:text-base`}
				>
					{title}
				</p>
			</abbr>
		</Component>
	);
}

function BoxContainer(props) {
	if (props.link)
		return (
			<Link className="no-underline" to={props.link}>
				<BoxGridItem {...props} />
			</Link>
		);
	return <BoxGridItem {...props} />;
}

function BoxGrid({ actions = [] }) {
	return (
		<div className="gap-4 grid grid-cols-2 my-3 py-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
			{actions.map((action, index) => (
				<BoxContainer key={index} {...action} />
			))}
		</div>
	);
}

function Actions() {
	const actions = React.useMemo(
		() => [
			{
				bg: 'bg-primary-500',
				icon: GroupOutlined,
				link: routes.PATIENTS_PAGE,
				title: 'Patients',
			},
			{
				bg: 'bg-red-600',
				icon: SolutionOutlined,
				link: routes.TESTS_PAGE,
				title: 'Tests',
			},
			{
				bg: 'bg-blue-700',
				icon: UserOutlined,
				link: routes.PROFILE_PAGE,
				title: 'Profile',
			},
		],
		[]
	);

	return (
		<div className="my-2 md:my-4">
			<BoxTitle title="quick links" />
			<BoxGrid actions={actions} />
		</div>
	);
}

export default Actions;
