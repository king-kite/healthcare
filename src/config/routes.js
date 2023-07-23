export const HOME_PAGE = '/';

// Auth
export const AUTH_BASE_PAGE = '/account';
export const FORGOT_PASSWORD_PAGE = AUTH_BASE_PAGE + '/forgot-password';
export const LOGIN_PAGE = AUTH_BASE_PAGE + '/login';

// Dashboard
export const DASHBOARD_PAGE = '/dashboard';
export const PROFILE_PAGE = '/dashboard/profile';
export const SETTINGS_PAGE = '/dashboard/settings';

const routes = {
	HOME_PAGE,

	// Auth
	AUTH_BASE_PAGE,
	FORGOT_PASSWORD_PAGE,
	LOGIN_PAGE,

	// Dashboard
	DASHBOARD_PAGE,
	PROFILE_PAGE,
	SETTINGS_PAGE,
};

export default routes;
