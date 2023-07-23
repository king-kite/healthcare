/* eslint-disable react/prop-types */
import { LogoutOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';

import useLogout from '../../hooks/useLogout';

function LogoutButton({ setVisible }) {
	const { logout, loading } = useLogout();

	const handleLogout = React.useCallback(() => {
		if (!loading) {
			setVisible(false);
			logout();
		}
	}, [logout, loading, setVisible]);

	return (
		<Button
			block
			className="sidebar-logout"
			disabled={loading}
			loading={loading}
			icon={
				<span className="mr-2 text-xl">
					<LogoutOutlined />
				</span>
			}
			onClick={handleLogout}
			size="large"
			type="default"
		>
			<span className="font-semibold text-sm md:text-base">Logout</span>
		</Button>
	);
}

export default LogoutButton;
