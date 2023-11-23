import ForgotPassword from '../../containers/account/forgot-password';
import action from '../../controllers/account/forgot-password';

function Page() {
	return <ForgotPassword />;
}

Page.action = action;

export default Page;
