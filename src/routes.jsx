import { createBrowserRouter, ScrollRestoration } from 'react-router-dom';

import pageRoutes from './config/routes';

// Error Page
import Error from './pages/error';
import NotFound from './pages/not-found';

// Layouts
import AuthLayout from './layouts/auth';
// import DashboardLayout from './layout/dashboard';

// Layout protection
import {
	// Authenticated,
	NotAuthenticated,
} from './layouts/protections';

// Auth
import Home from './pages';
// import ForgotPassword from './pages/account/forgot-password';
// import ForgotPasswordSuccess from './pages/account/forgot-password-success';
import Login from './pages/account/login';

// Dashboard
// import Dashboard from './pages/dashboard';
// import RoomDetail from './pages/dashboard/rooms/detail';
// import Settings from './pages/dashboard/settings';

// APIs
// import forgotPassword from './api/account/forgot-password';
import login from './controllers/account/login';
// import updateUserInfo from './api/account/update-user-info';

const routes = [
	{
		index: true,
		path: pageRoutes.HOME_PAGE,
		element: (
			<>
				<Home />
				<ScrollRestoration />
			</>
		),
		errorElement: <Error />,
	},
	{
		path: pageRoutes.AUTH_BASE_PAGE,
		element: (
			<>
				<AuthLayout />
				<ScrollRestoration />
			</>
		),
		children: [
			{
				path: pageRoutes.AUTH_BASE_PAGE,
				element: <NotAuthenticated />,
				children: [
					// {
					// 	action: forgotPassword,
					// 	path: pageRoutes.FORGOT_PASSWORD_PAGE,
					// 	element: <ForgotPassword />,
					// },
					// {
					// 	path: pageRoutes.FORGOT_PASSWORD_SUCCESS_PAGE,
					// 	element: <ForgotPasswordSuccess />,
					// },
					{
						action: login,
						path: pageRoutes.LOGIN_PAGE,
						element: <Login />,
					},
				],
			},
		],
		errorElement: <Error />,
	},
	// {
	// 	path: pageRoutes.DASHBOARD_PAGE,
	// 	element: (
	// 		<>
	// 			<Authenticated />
	// 			<ScrollRestoration />
	// 		</>
	// 	),
	// 	children: [
	// 		{
	// 			path: pageRoutes.DASHBOARD_PAGE,
	// 			element: <DashboardLayout />,
	// 			children: [
	// 				{
	// 					index: true,
	// 					path: '',
	// 					element: <Dashboard />,
	// 				},
	// 				{
	// 					path: pageRoutes.ROOM_PAGE(':id'),
	// 					element: <RoomDetail />,
	// 				},
	// 				{
	// 					action: updateUserInfo,
	// 					path: pageRoutes.SETTINGS_PAGE,
	// 					element: <Settings />,
	// 				},
	// 			],
	// 		},
	// 	],
	// 	errorElement: <Error />,
	// },

	{
		path: '*',
		element: <NotFound />,
	},
];

const router = createBrowserRouter(routes);

export default router;
