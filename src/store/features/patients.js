import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	data: null,
	error: null,
	isFetching: false,
	isLoading: false,
};

const patientsSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		// initialize state
		init(state) {
			state.isFetching = true;
			// If some data is available then isLoading is false
			state.isLoading = state.data ? false : true;
			// Clear the error as error
			state.error = null;
		},

		// Store the patients data
		setData(state, { payload }) {
			state.isLoading = false;
			state.isFetching = false;
			state.data = payload.data;
		},

		// set error
		setError(state, { payload }) {
			state.isLoading = false;
			state.isLoading = false;
			state.error = payload.error;
		},
	},
});

export const { init, setData, setError } = patientsSlice.actions;

export default patientsSlice.reducer;
