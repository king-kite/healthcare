/* eslint-disable react/prop-types */
import { notification } from 'antd';

import NotificationContext from './context';

function NotificationProvider({ children }) {
	const [api, contextHolder] = notification.useNotification();

	return (
		<NotificationContext.Provider value={{ api }}>
			{contextHolder}
			{children}
		</NotificationContext.Provider>
	);
}

export default NotificationProvider;
