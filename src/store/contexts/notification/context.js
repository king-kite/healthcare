import React from 'react';

const NotificationContext = React.createContext({
	api: null,
});

export function useNotificationContext() {
	return React.useContext(NotificationContext);
}

export default NotificationContext;
