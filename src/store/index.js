import { configureStore } from '@reduxjs/toolkit';

import authReducer from './features/auth';
import { NODE_ENV } from '../config';

const store = configureStore({
	devTools: NODE_ENV !== 'production',
	reducer: {
		auth: authReducer,
	},
});

export default store;
