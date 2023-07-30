import { GroupOutlined, SolutionOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const cards = [
	{
		color: 'text-primary-500',
		icon: GroupOutlined,
		title: 'No. of Patients',
		key: 'patients',
	},
	{
		color: 'text-red-600',
		icon: SolutionOutlined,
		title: 'Total Tests/Diagnosis',
		key: 'tests',
	},
];

function Cards({ loading, values }) {
	return (
		<div className="gap-4 grid grid-cols-1  my-4 sm:gap-5 md:gap-6 sm:grid-cols-2 lg:gap-8">
			{cards.map(({ color, icon: Icon, title, key }, index) => (
				<div className="h-full w-full" key={index}>
					<Spin size="small" spinning={loading[key]}>
						<div className="bg-white flex items-center justify-between p-4 rounded-md shadow-lg md:p-5 lg:p-6">
							<div className="pr-2">
								<h1
									className={`${color} font-bold mb-2 text-gray-700 text-2xl sm:text-3xl`}
								>
									{values[key]}
								</h1>
								<p className="text-gray-700 text-sm md:text-base">{title}</p>
							</div>
							<div className="pl-2">
								<span className={`${color} text-3xl`}>
									<Icon />
								</span>
							</div>
						</div>
					</Spin>
				</div>
			))}
		</div>
	);
}

export default Cards;
