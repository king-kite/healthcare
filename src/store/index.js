import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./features/auth";
import patientsReducer from "./features/patients";
import { NODE_ENV } from "../config";

const store = configureStore({
	devTools: NODE_ENV !== "production",
	reducer: {
		auth: authReducer,
		patients: patientsReducer,
	},
});

export default store;
