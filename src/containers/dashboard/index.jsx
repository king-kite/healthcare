import Container from '../../components/container';
import Cards from '../../components/dashboard/cards';
import PatientTable from '../../components/dashboard/patient-table';
import TestTable from '../../components/dashboard/test-table';

function Dashboard() {
	return (
		<Container title="Overview">
			<Cards />
			<PatientTable />
			<TestTable />
		</Container>
	);
}

export default Dashboard;
