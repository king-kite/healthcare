import React from "react";

import { upload } from "..";

export function useUpload({ onSuccess, onError }) {
	const [data, setData] = React.useState(null);
	const [error, setError] = React.useState(null);
	const [loading, setLoading] = React.useState(false);

	const uploadFile = React.useCallback(
		async (...params) => {
			try {
				setLoading(true);
				const data = await upload(...params);
				if (onSuccess) onSuccess(data);
				setData(data);
			} catch (error) {
				if (onError) onError(error);
				setError(error);
			} finally {
				setLoading(false);
			}
		},
		[onError, onSuccess]
	);

	return {
		upload: uploadFile,
		data,
		error,
		loading,
	};
}
