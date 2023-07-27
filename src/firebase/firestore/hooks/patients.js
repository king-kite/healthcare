import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { getPatients } from "../patients";
import { init, setData, setError } from "../../../store/features/patients";

export function useGetPatients() {
	// Store error message for easier access and clearing
	const [errorMessage, setErrorMessage] = React.useState();

	const dispatch = useDispatch();

	const { data, error, isLoading, isFetching } = useSelector(
		(state) => state.patients
	);

	// Get the data from the patients firestore collection
	const getData = React.useCallback(() => {
		// Initialize the patient slice data
		dispatch(init());

		setErrorMessage(null);

		getPatients({
			onError: (error) => {
				dispatch(setError({ error }));
				setErrorMessage(
					error.message || "An error occurred. Please try again!"
				);
			},
			onSuccess: (data) => dispatch(setData({ data })),
		});
	}, [dispatch]);

	// clear the errorMessage
	const clearError = React.useCallback(() => {
		setErrorMessage(null);
	}, []);

	React.useEffect(() => {
		getData();
	}, [getData]);

	return {
		data,
		error,
		errorMessage,
		isLoading,
		isFetching,
		refetch: getData,
		clearError,
	};
}
