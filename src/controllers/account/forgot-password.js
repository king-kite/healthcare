import { redirect } from 'react-router-dom';

import routes from '../../config/routes';
import { resetPassword } from '../../firebase/auth';

export default async function forgotPassword({ request }) {
	try {
		// Get the form data from the request
		const form = await request.formData();
		const data = {
			email: form.get('email'),
			submit: form.get('submit'),
		};

		// Check if it's a POST request and submit field is not undefined
		if (request.method === 'POST' && data.submit !== 'undefined') {
			// check the email field was passed
			if (!data.email) throw new Error('Email address is required!');

			// reset the password
			const response = await resetPassword({ email: data.email });

			// check for response error
			if (response.error) throw new Error(response.error.message);

			// redirect to the login page
			return redirect(routes.LOGIN_PAGE);
		}

		return {
			error: {
				message: 'API route was not found!',
			},
		};
	} catch (error) {
		return {
			error: {
				message: error.message,
			},
		};
	}
}
