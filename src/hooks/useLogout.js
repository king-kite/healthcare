import React from 'react';
import { useNavigate } from 'react-router-dom';

import routes from '../config/routes';
import { logout } from '../firebase/auth';
import { useNotificationContext } from '../store/contexts';

function useLogout() {
	const [loading, setLoading] = React.useState(false);

	const navigate = useNavigate();

	const { api } = useNotificationContext();

	const handleLogout = React.useCallback(async () => {
		try {
			setLoading(true);
			const { error } = await logout();
			if (error)
				api.error({
					message: 'Unable to sign out!',
					description: error.message,
				});
			else navigate(routes.HOME_PAGE);
		} catch (error) {
			api.error({
				message: 'Unable to sign out!',
				description: error.message,
			});
		} finally {
			setLoading(false);
		}
	}, [api, navigate]);

	return {
		loading,
		logout: handleLogout,
	};
}

export default useLogout;
