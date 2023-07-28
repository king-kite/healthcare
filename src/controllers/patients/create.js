import { redirect } from 'react-router-dom';

import routes from '../../config/routes';
import { addPatient } from '../../firebase/firestore';

export default async function createPatient({ request }) {
	try {
		// Get the data from the request if request method is POST
		// and the submit name field was found
		const form = await request.formData();
		if (request.method === 'POST' && form.get('submit') !== undefined) {
			// Get the data from the form
			const data = {
				first_name: form.get('first_name') || undefined,
				last_name: form.get('last_name') || undefined,
				email: form.get('email') || undefined,
				image: form.get('image') || undefined,
				address: form.get('address') || undefined,
				image_ref: form.get('image_ref') || undefined,
				phone: form.get('phone') || undefined,
				gender: form.get('gender') || undefined,
				dob: form.get('dob') || undefined,
			};

			// create patient
			const response = await addPatient({ data });

			// redirect to the user detail page
			return redirect(routes.PATIENT_PAGE(response.id));
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
				path: error.path,
			},
		};
	}
}
