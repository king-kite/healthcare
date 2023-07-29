/* eslint-disable no-mixed-spaces-and-tabs */
import { EditOutlined, UserDeleteOutlined } from '@ant-design/icons';
import { Button, Spin } from 'antd';
import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';

import DeletePatient from '../../../components/patients/delete-patient';
import routes from '../../../config/routes';
import { useGetPatientQuery } from '../../../store/features/api/patients';

function Detail() {
	const { id } = useParams();

	const { data, isLoading } = useGetPatientQuery(id, {
		skip: id === undefined,
	});

	const info = React.useMemo(
		() =>
			data
				? [
						{
							title: 'First name',
							value: data.first_name,
						},
						{
							title: 'Last name',
							value: data.last_name,
						},
						{
							title: 'Email address',
							value: data.email,
						},
						{
							title: 'Gender',
							value: data.gender === 'M' ? 'Male' : 'Female',
						},
						{
							title: 'Phone number',
							value: data.phone,
						},
						{
							title: 'Address',
							value: data.address,
						},
						{
							title: 'Date of Birth',
							value: data.dob,
						},
						{
							title: 'Last Update',
							value: data.updated_at,
						},
						{
							title: 'Created At',
							value: data.created_at,
						},
				  ]
				: [],
		[data]
	);

	if (isLoading)
		return (
			<div className="flex items-center justify-center min-h-[50vh]">
				<Spin spinning size="large" />
			</div>
		);

	// No data found
	if (!data) return <Navigate to="/404" />;

	return (
		<>
			<div className="profile-top-image">
				<div className="wrapper">
					<div className="container-dashboard h-full mx-auto relative w-full">
						<span className="absolute bottom-[-3rem] left-4">
							<span className="bg-primary-500 border-4 border-gray-100 border-solid h-24 inline-flex items-center justify-center relative rounded-full text-gray-50 w-24">
								{data.image ? (
									<img
										className="h-full rounded-full w-full"
										src={data.image}
										alt={data.first_name[0] + ' ' + data.last_name[0]}
									/>
								) : (
									<span className="left-[0.05rem] relative text-xl top-[0.075rem]">
										{data.first_name[0] + ' ' + data.last_name[0]}
									</span>
								)}
							</span>
						</span>
					</div>
				</div>
			</div>
			<div className="container-dashboard py-4 w-full">
				<div className="my-8 py-2">
					<h1 className="font-bold mb-2 mt-5 text-gray-700 text-lg">
						{data.full_name}
					</h1>
					<div className="sm:flex sm:items-center">
						<div className="my-4 sm:mr-2 sm:my-0">
							<Link to={routes.PATIENT_EDIT_PAGE(id)}>
								<Button
									className="cursor-pointer hover:text-primary-500"
									icon={
										<span className="mr-2 text-gray-100 text-sm md:text-base">
											<EditOutlined />
										</span>
									}
									type="primary"
								>
									<span className="text-gray-100 text-sm md:text-base">
										Update
									</span>
								</Button>
							</Link>
						</div>
						<div className="my-4 sm:ml-2 sm:my-0">
							<DeletePatient
								className="cursor-pointer"
								shape="default"
								icon={
									<span className="mr-2 text-gray-700 text-sm md:text-base">
										<UserDeleteOutlined />
									</span>
								}
								type="default"
							>
								<span className="text-gray-700 text-sm md:text-base">
									Delete
								</span>
							</DeletePatient>
						</div>
					</div>
					<hr className="border-gray-100 my-4" />
					<div>
						<div>
							<h3 className="text-base font-semibold leading-7 text-gray-900">
								Patient Information
							</h3>
							<p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
								Personal details and application data on this patient.
							</p>
						</div>
						<div className="mt-6 border-t border-gray-100">
							<dl className="divide-y divide-gray-100 lg:grid lg:grid-cols-2">
								{info.map((detail, index) => (
									<div key={index} className="px-4 py-6">
										<dt className="text-sm font-medium leading-6 text-gray-900 md:text-base md:font-semibold">
											{detail.title}
										</dt>
										<dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 md:text-base md:font-medium">
											{detail.value}
										</dd>
									</div>
								))}
							</dl>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Detail;
