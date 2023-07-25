import {
	ArrowRightOutlined,
	PlusOutlined,
	EditOutlined,
	DeleteOutlined,
} from '@ant-design/icons';
import { Button, Input, Table, Tooltip } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

import Container from '../../../components/container';
import {
	TableAvatarTitleOtherCell as PatientCell,
	TableHeadCell,
} from '../../../components/table/cells';
import routes from '../../../config/routes';

function Patients() {
	const columns = React.useMemo(
		() => [
			{
				className: 'font-normal text-gray-700 text-sm',
				title: <TableHeadCell title="Patient" />,
				dataIndex: 'patient',
				width: '40%',
			},
			{
				className: 'font-normal text-gray-700 text-sm',
				title: <TableHeadCell title="Phone number" />,
				dataIndex: 'phone',
			},
			{
				className: 'font-normal text-gray-700 text-sm',
				title: <TableHeadCell title="Gender" />,
				dataIndex: 'gender',
			},
			{
				className: 'font-normal text-gray-700 text-sm',
				title: <TableHeadCell title="Date of Birth" />,
				dataIndex: 'dob',
			},
			{
				className: 'font-normal text-gray-700 text-sm',
				title: <TableHeadCell title="Actions" />,
				dataIndex: 'actions',
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
			patient: (
				<PatientCell
					other={item.email}
					title={item.first_name + ' ' + item.last_name}
				/>
			),
			key: index,
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

	const onChange = React.useCallback((pagination, filters, sorter, extra) => {
		console.log('params', pagination, filters, sorter, extra);
	}, []);

	return (
		<Container title="Patients">
			<div className="gap-4 grid grid-cols-1 items-end my-4 sm:grid-cols-3 lg:grid-cols-4">
				<div className="sm:col-span-2">
					<label
						className="block font-medium my-1 text-sm text-gray-700 md:text-base"
						htmlFor="search"
					>
						Search
					</label>
					<Input.Search
						allowClear
						className="text-sm lg:text-base"
						id="search"
						name="search"
						// disabled={loading}
						placeholder="Search for patients e.g. Richard Cooper"
						size="large"
						type="search"
					/>
				</div>
				<div className="sm:col-span-1">
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
			</div>
			<Table
				columns={columns}
				dataSource={data}
				loading={false}
				onChange={onChange}
				pagination={{
					pageSize: 50,
				}}
				rowClassName=""
				size="large"
				scroll={{
					y: 350,
				}}
			/>
		</Container>
	);
}

export default Patients;
