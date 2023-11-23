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
			className="sidebar-logout lg-btn"
			disabled={loading}
			loading={loading}
			icon={
				<span className="text-xl">
					<LogoutOutlined />
				</span>
			}
			onClick={handleLogout}
			size="large"
			type="ghost"
		>
			<span className="flex font-semibold text-left text-sm w-full md:text-base">
				Logout
			</span>
		</Button>
	);
}

export default LogoutButton;
