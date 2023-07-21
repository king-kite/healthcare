import { Outlet } from 'react-router-dom';

function AuthLayout() {
	return (
		<div>
			<div>This is the show screen</div>
			<div>
				<Outlet />
			</div>
		</div>
	);
}

export default AuthLayout;
