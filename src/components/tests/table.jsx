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

function TestTable({ data: tests = [] }) {
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

	return <Table columns={columns} data={data} />;
}

export default TestTable;
