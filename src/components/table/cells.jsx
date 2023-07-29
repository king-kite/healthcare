import { Button, Tooltip } from 'antd';
import { Link } from 'react-router-dom';

function ActionLinkComponent({ children, to }) {
	if (to) return <Link to={to}>{children}</Link>;
	return children;
}

function ActionTooltipComponent({ children, title }) {
	if (title) return <Tooltip>{children}</Tooltip>;
	return children;
}

export function TableActions({ column, row }) {
	return (
		<div className="flex items-center">
			{row.original[column.actionsAccessor].map(
				(
					{
						container: Container,
						title,
						icon: Icon,
						iconColor = 'text-gray-100',
						href,
						...action
					},
					index
				) => (
					<span className="px-2" key={index}>
						<ActionTooltipComponent title={title}>
							<ActionLinkComponent to={href}>
								{Container ? (
									<Container {...action}>
										<span className={`${iconColor} text-sm md:text-base`}>
											<Icon />
										</span>
									</Container>
								) : (
									<Button shape="circle" type="ghost" {...action}>
										<span className={`${iconColor} text-sm md:text-base`}>
											<Icon />
										</span>
									</Button>
								)}
							</ActionLinkComponent>
						</ActionTooltipComponent>
					</span>
				)
			)}
		</div>
	);
}

export function TableAvatarTitleSubCell({ column, row }) {
	return (
		<div className="flex items-center py-2">
			{row.original[column.avatarAccessor] ? (
				<section className="flex-shrink-0 h-10 w-10">
					<div className="h-10 relative rounded-full w-10">
						<img
							alt={row.original[column.titleAccessor][0]}
							className="h-full rounded-full w-full"
							src={row.original[column.avatarAccessor]}
						/>
					</div>
				</section>
			) : (
				<span className="bg-primary-500 h-10 inline-flex items-center justify-center rounded-full text-gray-50 w-10">
					<span className="left-[0.05rem] relative top-[0.075rem]">
						{row.original[column.titleAccessor][0]}
					</span>
				</span>
			)}
			<section className="ml-4 text-left">
				<div className="text-sm font-medium text-gray-700 md:text-base">
					{row.original[column.titleAccessor]}
				</div>
				<div className="normal-case font-normal text-sm text-gray-500">
					{row.original[column.subAccessor]}
				</div>
			</section>
		</div>
	);
}
