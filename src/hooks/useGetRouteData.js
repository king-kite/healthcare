import React from 'react';

import { getRouteData } from '../firebase/database';

function useGetRouteData({ id, onError }) {
	const [data, setData] = React.useState(null);
	const [error, setError] = React.useState(null);
	const [loading, setLoading] = React.useState(true);

	const handleLoad = React.useCallback(
		({ error: newError, data: newData }) => {
			if (newData !== undefined && newData !== data) setData(newData);
			if (newError !== undefined && newError !== error) setError(newError);

			setLoading(false);
		},
		[data, error, loading]
	);

	React.useEffect(() => {
		getRouteData({
			route: id,
			onError: (error) => {
				handleLoad({ error });
				if (onError) onError(error);
			},
			onSuccess: (data) => handleLoad({ data }),
		});
	}, [id, onError, handleLoad]);

	return {
		loading,
		error,
		data,
	};
}

export default useGetRouteData;
