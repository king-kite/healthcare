import Login from '../../containers/account/login';
import action from '../../controllers/account/login';

function Page() {
	return <Login />;
}

Page.action = action;

export default Page;
