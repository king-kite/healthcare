/* eslint-disable no-mixed-spaces-and-tabs */
import {
	ExclamationCircleOutlined,
	PlusOutlined,
	UndoOutlined,
} from '@ant-design/icons';
import { Button, Result, Skeleton } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

import Container from '../../../components/container';
import { TableAvatarTitleSubCell as PatientCell } from '../../../components/table/cells';
import Table from '../../../components/table';
import routes from '../../../config/routes';
import { useGetPatients } from '../../../firebase/firestore/hooks';

function Patients() {
	const { data, errorMessage, clearError, isLoading, isFetching, refetch } =
		useGetPatients();

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

	return (
		<Container
			alert={
				errorMessage
					? {
							type: 'error',
							title: 'Error: Failed to Load.',
							message: errorMessage,
							close: clearError,
					  }
					: undefined
			}
			title="Patients"
		>
			<div className="sm:flex sm:items-center">
				<div className="my-2 w-full sm:my-0 sm:w-1/2 md:w-1/3 lg:w-1/4">
					<Link className="block w-full" to={routes.PATIENT_CREATE_PAGE}>
						<Button
							block
							icon={
								<span className="mr-2 text-gray-700 text-sm md:text-base">
									<PlusOutlined />
								</span>
							}
							size="large"
						>
							<span className="text-sm text-gray-700 md:text-base">
								New Patient
							</span>
						</Button>
					</Link>
				</div>
				<div className="my-2 w-full sm:my-0 sm:w-1/2 md:ml-4 md:w-1/3 lg:w-1/4">
					<Button
						block
						disabled={isFetching}
						loading={isFetching}
						onClick={refetch}
						icon={
							<span className="mr-2 text-gray-700 text-sm md:text-base">
								<UndoOutlined />
							</span>
						}
						size="large"
					>
						<span className="text-sm text-gray-700 md:text-base">Refresh</span>
					</Button>
				</div>
			</div>

			<div className="my-2 py-4">
				{isLoading ? (
					<Skeleton active />
				) : data && data.length > 0 ? (
					<Table columns={columns} data={data} />
				) : (
					<Result
						icon={
							<span className="text-primary-500 text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
								<ExclamationCircleOutlined />
							</span>
						}
						title="There are no registered patients."
						extra={
							<Link className="w-full" to={routes.PATIENT_CREATE_PAGE}>
								<Button
									icon={
										<span className="mr-2 text-sm md:text-base">
											<PlusOutlined />
										</span>
									}
									size="large"
									type="primary"
								>
									<span className="text-sm md:text-base">Register one now</span>
								</Button>
							</Link>
						}
					/>
				)}
			</div>
		</Container>
	);
}

export default Patients;
