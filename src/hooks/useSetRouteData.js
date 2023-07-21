import React from 'react';

import { setRouteData } from '../firebase/database';

function useSetRouteData({ id, name, onError, onSuccess }) {
	const [data, setData] = React.useState(null);
	const [error, setError] = React.useState(null);
	const [loading, setLoading] = React.useState(false);

	const handleLoad = React.useCallback(({ error, data }) => {
		if (data !== undefined) setData(data);
		if (error !== undefined) setError(error);

		setLoading(false);
	}, []);

	const mutate = React.useCallback(
		({ value }) => {
			setLoading(true);
			setRouteData({
				route: id,
				value,
				onError: (error) => {
					handleLoad({ error });
					if (onError) onError(error);
				},
				onSuccess: (data) => {
					handleLoad({ data });
					if (onSuccess)
						onSuccess({
							description: `Switch was turned ${
								value === 0 ? 'off' : 'on'
							} successfully.`,
							message: value === 0 ? `${name} switch off` : `${name} switch on`,
						});
				},
			});
		},
		[id, handleLoad, name, onError, onSuccess]
	);

	return {
		loading,
		error,
		data,
		mutate,
	};
}

export default useSetRouteData;
