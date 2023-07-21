import { emailPasswordLogin } from '../../firebase/auth';

export default async function login({ request }) {
	try {
		// Get the data from the request if request method is POST
		// and the submit name field was found
		const form = await request.formData();
		if (request.method === 'POST' && form.get('submit') !== undefined) {
			// Get the data from the form
			const data = {
				email: form.get('email'),
				password: form.get('password'),
			};

			// login user
			const response = await emailPasswordLogin({
				email: data.email,
				password: data.password,
			});

			// Check if there is an error in the response and throw it
			if (response.error) throw new Error(response.error.message);

			// Remove the password
			delete data.password;

			return {
				data: {
					...data,
					...response,
					displayName: response.dsiplayName || response.displayName,
				},
			};
		}
		return {
			error: {
				message: 'API route was not found.',
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
