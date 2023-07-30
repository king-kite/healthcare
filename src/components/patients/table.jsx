import {
	ArrowRightOutlined,
	DeleteOutlined,
	EditOutlined,
} from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

import DeletePatient from './delete-patient';
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
		avatarAccessor: 'image',
		subAccessor: 'email',
		titleAccessor: 'full_name',
	},
	{
		Header: 'Phone number',
		accessor: 'phone',
	},
	{
		Header: 'Gender',
		accessor: 'gender',
	},
	{
		Cell: TableActions,
		Header: 'Actions',
		actionsAccessor: 'actions',
		accessor: 'action',
	},
];

function PatientTable({ data: patients = [] }) {
	const data = React.useMemo(
		() =>
			patients.map((patient) => ({
				...patient,
				gender: patient.gender === 'M' ? 'Male' : 'Female',
				actions: [
					{
						container: ({ children, ...props }) => (
							<span className="block">
								<Link to={routes.PATIENT_PAGE(patient.id)}>
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
						container: ({ children, ...props }) => (
							<span className="block">
								<Link to={routes.PATIENT_EDIT_PAGE(patient.id)}>
									<Button shape="circle" type="ghost" {...props}>
										{children}
									</Button>
								</Link>
							</span>
						),
						iconColor: 'text-blue-700',
						title: 'Edit',
						icon: EditOutlined,
					},
					{
						container: (props) => (
							<DeletePatient patientId={patient.id} {...props} />
						),
						iconColor: 'text-red-600',
						title: 'Delete',
						icon: DeleteOutlined,
					},
				],
			})),
		[patients]
	);

	return <Table columns={columns} data={data} />;
}

export default PatientTable;
