import { GroupOutlined, SolutionOutlined } from "@ant-design/icons";

import Container from "../../components/container";

const cards = [
	{
		color: "text-primary-500",
		icon: GroupOutlined,
		title: "No. of Patients",
		value: "228",
	},
	{
		color: "text-red-600",
		icon: SolutionOutlined,
		title: "Total Tests/Diagnosis",
		value: "1023",
	},
];

function Dashboard() {
	return (
		<Container title="Overview">
			<div className="gap-4 grid grid-cols-1 sm:gap-5 md:gap-6 sm:grid-cols-2 lg:gap-8">
				{cards.map(({ color, icon: Icon, title, value }, index) => (
					<div
						className="bg-white flex items-center justify-between p-4 rounded-md shadow-lg md:p-5 lg:p-6"
						key={index}
					>
						<div className="pr-2">
							<h1
								className={`${color} font-bold mb-2 text-gray-700 text-2xl sm:text-3xl`}
							>
								{value}
							</h1>
							<p className="text-gray-700 text-sm md:text-base">{title}</p>
						</div>
						<div className="pl-2">
							<span className={`${color} text-3xl`}>
								<Icon />
							</span>
						</div>
					</div>
				))}
			</div>
		</Container>
	);
}

export default Dashboard;
