import { configureStore } from '@reduxjs/toolkit';

import authReducer from './features/auth';
import baseApi from './features/api';
import { NODE_ENV } from '../config';

const store = configureStore({
	devTools: NODE_ENV !== 'production',
	reducer: {
		auth: authReducer,
		[baseApi.reducerPath]: baseApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(baseApi.middleware),
});

export default store;
