import { Spin } from 'antd';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import routes from '../../config/routes';

function Authenticated() {
	const { isAuthenticated, isLoading } = useSelector((state) => state.auth);

	const { pathname } = useLocation();

	if (isLoading)
		return (
			<div className="flex h-full items-center justify-center min-h-[80vh] w-full">
				<Spin spinning={isLoading} size="large" />
			</div>
		);

	// if (!isAuthenticated)
	// 	return (
	// 		<Navigate
	// 			to={routes.LOGIN_PAGE + '?next=' + pathname}
	// 			state={{ next: pathname }}
	// 		/>
	// 	);

	return <Outlet />;
}

export default Authenticated;
