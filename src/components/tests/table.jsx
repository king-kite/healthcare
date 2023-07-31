import { ArrowRightOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

import DeleteTest from './delete-test';
import Table from '../table';
import {
	TableAvatarTitleSubCell as PatientCell,
	TableActions,
} from '../table/cells';
import { GlobalFilter } from '../table/components';
import routes from '../../config/routes';

const columns = [
	{
		Cell: PatientCell,
		Header: 'Patient',
		accessor: 'patient',
		avatarAccessor: 'patient_image',
		subAccessor: 'patient_email',
		titleAccessor: 'patient_full_name',
	},
	{
		Header: 'Height',
		accessor: 'height',
	},
	{
		Header: 'Weight',
		accessor: 'weight',
	},
	{
		Header: 'Temperature',
		accessor: 'temperature',
	},
	{
		Header: 'Pulse/Heart Rate',
		accessor: 'pulse',
	},
	{
		Cell: TableActions,
		Header: 'Actions',
		actionsAccessor: 'actions',
		accessor: 'action',
	},
];

function TestTable({ data: tests = [], search = true, ...props }) {
	const [filter, setFilter] = React.useState('');

	const data = React.useMemo(
		() =>
			tests.map((test) => ({
				...test,
				patient_image: test.patient ? test.patient.image : undefined,
				patient_email: test.patient ? test.patient.email : '--------',
				patient_full_name: test.patient
					? test.patient.first_name + ' ' + test.patient.last_name
					: '----------',
				actions: [
					{
						container: ({ children, ...props }) => (
							<span className="block">
								<Link to={routes.TEST_PAGE(test.id)}>
									<Button shape="circle" type="ghost" {...props}>
										{children}
									</Button>
								</Link>
							</span>
						),
						iconColor: 'text-primary-500',
						title: 'View',
						icon: ArrowRightOutlined,
					},
					{
						container: (props) => <DeleteTest testId={test.id} {...props} />,
						iconColor: 'text-red-600',
						title: 'Delete',
						icon: DeleteOutlined,
					},
				],
			})),
		[tests]
	);

	const filteredData = React.useMemo(() => {
		if (!filter) return data;
		const tests = data.filter((test) => {
			const search = filter.trim().toLowerCase();
			if (test.patient?.first_name.toLowerCase().includes(search)) return true;
			if (test.patient?.last_name.toLowerCase().includes(search)) return true;
			if (test.patient?.email.toLowerCase().includes(search)) return true;
			return false;
		});
		return tests;
	}, [data, filter]);

	return (
		<>
			{/* Filters Start */}
			{search && (
				<div className="gap-6 grid mb-6 py-2 items-center sm:grid-cols-2 md:grid-cols-4">
					<GlobalFilter
						count={filteredData.length}
						filter={filter}
						setFilter={setFilter}
					/>
				</div>
			)}
			{/* Filters Stop */}
			<Table columns={columns} data={filteredData} {...props} />
		</>
	);
}

export default TestTable;
