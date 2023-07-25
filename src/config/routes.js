export const HOME_PAGE = '/';

// Auth
export const AUTH_BASE_PAGE = '/account';
export const FORGOT_PASSWORD_PAGE = AUTH_BASE_PAGE + '/forgot-password';
export const LOGIN_PAGE = AUTH_BASE_PAGE + '/login';

// Dashboard
export const DASHBOARD_PAGE = '/dashboard';

// Patients
export const PATIENTS_PAGE = '/dashboard/patients';
export const PATIENT_CREATE_PAGE = '/dashboard/patients/create';
export const PATIENT_PAGE = (id) => PATIENTS_PAGE + `/${id}`;
export const PATIENT_EDIT_PAGE = (id) => PATIENT_PAGE(id) + '/edit';

// Tests
export const TESTS_PAGE = '/dashboard/tests';

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

	// Patients
	PATIENTS_PAGE,
	PATIENT_PAGE,
	PATIENT_CREATE_PAGE,
	PATIENT_EDIT_PAGE,

	// Tests
	TESTS_PAGE,

	PROFILE_PAGE,
	SETTINGS_PAGE,
};

export default routes;
