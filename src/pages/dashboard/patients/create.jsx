import CreatePatient from '../../../containers/dashboard/patients/create';
import action from '../../../controllers/patients/create';

function Page() {
	return <CreatePatient />;
}

Page.action = action;
export default Page;
