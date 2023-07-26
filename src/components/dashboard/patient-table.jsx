import { ArrowRightOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

import ReactTable from '../table';
import { TableAvatarTitleSubCell as PatientCell } from '../table/cells';
import routes from '../../config/routes';

function PatientTable() {
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
				</div>
			),
		}));
		return keyedData;
	}, []);

	return (
		<div className="my-4">
			<h3 className="font-semibold mb-3 text-gray-700 text-sm md:text-base">
				Recent Patients
			</h3>
			<ReactTable columns={columns} data={data} />
			<div className="my-2 w-full sm:w-1/2 md:w-1/3">
				<Link className="block w-full" to={routes.PATIENTS_PAGE}>
					<Button
						block
						icon={
							<span className="mr-2 text-sm md:text-base">
								<ArrowRightOutlined />
							</span>
						}
						size="large"
					>
						<span className="text-sm md:text-base">See More</span>
					</Button>
				</Link>
			</div>
		</div>
	);
}

export default PatientTable;
