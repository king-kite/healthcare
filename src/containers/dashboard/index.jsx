import Container from '../../components/container';
import Cards from '../../components/dashboard/cards';
import PatientTable from '../../components/dashboard/patient-table';
import TestTable from '../../components/dashboard/test-table';
import { useGetPatientsQuery } from '../../store/features/api/patients';
import { useGetTestsQuery } from '../../store/features/api/tests';

function Dashboard() {
	const { data: patients, isLoading: patientsLoading } = useGetPatientsQuery();
	const { data: tests, isLoading: testsLoading } = useGetTestsQuery();

	return (
		<Container title="Overview">
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
			<PatientTable />
			<TestTable />
		</Container>
	);
}

export default Dashboard;
