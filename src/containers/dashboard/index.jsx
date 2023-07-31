import { UndoOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';

import Container from '../../components/container';
import Actions from '../../components/dashboard/actions';
import Cards from '../../components/dashboard/cards';
import PatientTable from '../../components/dashboard/patient-table';
import TestTable from '../../components/dashboard/test-table';
import { useNotificationContext } from '../../store/contexts';
import { useGetPatientsQuery } from '../../store/features/api/patients';
import { useGetTestsQuery } from '../../store/features/api/tests';

function Dashboard() {
	const { api } = useNotificationContext();

	const {
		data: patients,
		error: patientsError,
		refetch: patientsRefetch,
		isLoading: patientsLoading,
		isFetching: patientsFetching,
	} = useGetPatientsQuery();
	const {
		data: tests,
		error: testsError,
		refetch: testsRefetch,
		isLoading: testsLoading,
		isFetching: testsFetching,
	} = useGetTestsQuery();

	React.useEffect(() => {
		if (patientsError) {
			api.error({
				message: 'Fetch Patients Error',
				description: patientsError.message,
			});
		}
	}, [api, patientsError]);

	React.useEffect(() => {
		if (testsError) {
			api.error({
				message: 'Fetch Tests Error',
				description: testsError.message,
			});
		}
	}, [api, testsError]);

	return (
		<Container title="Overview">
			<div className="my-2 w-full sm:ml-auto sm:w-1/2 md:w-1/3 lg:w-1/4">
				<Button
					block
					disabled={patientsFetching || testsFetching}
					loading={patientsFetching || testsFetching}
					icon={
						<span className="mr-2 text-sm text-gray-700 md:text-base">
							<UndoOutlined />
						</span>
					}
					onClick={() => {
						patientsRefetch();
						testsRefetch();
					}}
					size="large"
				>
					<span className="text-sm md:text-base">Refresh</span>
				</Button>
			</div>
			<Cards
				loading={{
					patients: patientsLoading,
					tests: testsLoading,
				}}
				values={{
					patients: patients ? patients.length : '----',
					tests: tests ? tests.length : '----',
				}}
			/>
			<Actions />
			<PatientTable data={patients} loading={patientsLoading} />
			<TestTable data={tests} loading={testsLoading} />
		</Container>
	);
}

export default Dashboard;
