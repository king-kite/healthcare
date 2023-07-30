import { UndoOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import Container from '../../components/container';
import Actions from '../../components/dashboard/actions';
import Cards from '../../components/dashboard/cards';
import PatientTable from '../../components/dashboard/patient-table';
import TestTable from '../../components/dashboard/test-table';
import { useGetPatientsQuery } from '../../store/features/api/patients';
import { useGetTestsQuery } from '../../store/features/api/tests';

function Dashboard() {
	const {
		data: patients,
		refetch: patientsRefetch,
		isLoading: patientsLoading,
	} = useGetPatientsQuery();
	const {
		data: tests,
		refetch: testsRefetch,
		isLoading: testsLoading,
	} = useGetTestsQuery();

	return (
		<Container title="Overview">
			<div className="my-2 w-full sm:ml-auto sm:w-1/2 md:w-1/3 lg:w-1/4">
				<Button
					block
					loading={patientsLoading || testsLoading}
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
