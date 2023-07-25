import {
	ArrowRightOutlined,
	PlusOutlined,
	EditOutlined,
	DeleteOutlined,
} from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

import Container from '../../../components/container';
import { TableAvatarTitleSubCell as PatientCell } from '../../../components/table/cells';
import ReactTable from '../../../components/table';
import routes from '../../../config/routes';

function Patients() {
	const columns = React.useMemo(
		() => [
			{
				Cell: PatientCell,
				Header: 'Patient',
				accessor: 'patient',
				avatarAccessor: 'avatar',
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
				Header: 'Date of Birth',
				accessor: 'dob',
			},
			{
				Header: 'Actions',
				accessor: 'actions',
			},
		],
		[]
	);

	const data = React.useMemo(() => {
		const data = [
			{
				first_name: 'John',
				last_name: 'Doe',
				email: 'johndoe@gmail.com',
				phone: '08103874632',
				gender: 'Male',
				dob: '2000-01-01',
			},
			{
				first_name: 'Jane',
				last_name: 'Doe',
				email: 'janedoe@gmail.com',
				phone: '123456789',
				gender: 'Female',
				dob: '2000-01-01',
			},
			{
				first_name: 'Richard',
				last_name: 'Cooper',
				email: 'richardcooper@gmail.com',
				phone: '08103874632',
				gender: 'Male',
				dob: '2000-01-01',
			},
			{
				first_name: 'Mary',
				last_name: 'Jane',
				email: 'maryjane@gmail.com',
				phone: '123456789',
				gender: 'Female',
				dob: '2000-01-01',
			},
		];
		const keyedData = data.map((item, index) => ({
			...item,
			key: index,
			full_name: item.first_name + ' ' + item.last_name,
			actions: (
				<div className="flex items-center">
					<span className="px-2">
						<Tooltip title="View">
							<Link to={routes.PATIENT_PAGE(index)}>
								<Button type="primary" shape="circle">
									<span className="text-gray-100 text-sm md:text-base">
										<ArrowRightOutlined />
									</span>
								</Button>
							</Link>
						</Tooltip>
					</span>
					<span className="px-2">
						<Tooltip title="Edit">
							<Link to={routes.PATIENT_EDIT_PAGE(index)}>
								<Button className="bg-blue-500" type="dashed" shape="circle">
									<span className="text-gray-100 text-sm md:text-base">
										<EditOutlined />
									</span>
								</Button>
							</Link>
						</Tooltip>
					</span>
					<span className="px-2">
						<Tooltip title="Delete">
							<Button className="bg-red-500" type="dashed" shape="circle">
								<span className="text-gray-100 text-sm md:text-base">
									<DeleteOutlined />
								</span>
							</Button>
						</Tooltip>
					</span>
				</div>
			),
		}));
		return keyedData;
	}, []);

	return (
		<Container title="Patients">
			<div className="w-full sm:w-1/2 md:w-1/3">
				<Link className="block w-full" to={routes.PATIENT_CREATE_PAGE}>
					<Button
						block
						icon={
							<span className="mr-2 text-sm md:text-base">
								<PlusOutlined />
							</span>
						}
						size="large"
					>
						<span className="text-sm md:text-base">New Patient</span>
					</Button>
				</Link>
			</div>
			<ReactTable columns={columns} data={data} />
		</Container>
	);
}

export default Patients;
