import {
	ArrowRightOutlined,
	DeleteOutlined,
	EditOutlined,
} from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

import DeletePatient from './delete-patient';
import { Select } from '../controls';
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
		Header: 'Date',
		accessor: 'created_at',
	},
	{
		Cell: TableActions,
		Header: 'Actions',
		actionsAccessor: 'actions',
		accessor: 'action',
	},
];

function PatientTable({
	data: patients = [],
	genderFilter: genderFilterSearch = true,
	search = true,
	...props
}) {
	const [filter, setFilter] = React.useState('');
	const [genderFilter, setGenderFilter] = React.useState('');

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

	const filteredData = React.useMemo(() => {
		if (!filter && !genderFilter) return data;
		let patients = data;
		if (filter) {
			patients = patients.filter((patient) => {
				const search = filter.trim().toLowerCase();
				if (patient.first_name.toLowerCase().includes(search)) return true;
				if (patient.last_name.toLowerCase().includes(search)) return true;
				if (patient.email.toLowerCase().includes(search)) return true;
				return false;
			});
		}

		if (genderFilter) {
			patients = patients.filter((patient) => {
				const filter = genderFilter.trim().toLowerCase();
				if (patient.gender.trim().toLowerCase() === filter) return true;
				return false;
			});
		}

		return patients;
	}, [data, genderFilter, filter]);

	return (
		<>
			{/* Filters Start */}
			{(search || genderFilter) && (
				<div className="gap-6 grid mb-6 py-2 items-center sm:grid-cols-2 md:grid-cols-4">
					{search && (
						<GlobalFilter
							count={filteredData.length}
							filter={filter}
							setFilter={setFilter}
						/>
					)}
					{genderFilterSearch && (
						<div className="w-full md:col-span-1">
							<Select
								allowClear
								onClear={() => setGenderFilter(undefined)}
								label="Filter by Gender"
								value={genderFilter || undefined}
								placeholder="Select Gender"
								onSelect={(value) => {
									setGenderFilter(value);
								}}
								options={[
									{
										label: 'Male',
										value: 'Male',
									},
									{
										label: 'Female',
										value: 'Female',
									},
								]}
								id="gender"
								name="gender"
							/>
						</div>
					)}
				</div>
			)}
			{/* Filters Stop */}
			<Table columns={columns} data={filteredData} {...props} />
		</>
	);
}

export default PatientTable;
