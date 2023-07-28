import React from 'react';
import { useNavigate } from 'react-router-dom';

import Container from '../../../components/container';
import Form from '../../../components/patients/form';
import routes from '../../../config/routes';
import { useCreatePatientMutation } from '../../../store/features/api/patients';

function CreatePatient() {
	const [addPatient, { data, error, isLoading, status }] =
		useCreatePatientMutation();

	const navigate = useNavigate();

	React.useEffect(() => {
		if (status === 'fulfilled' && data) navigate(routes.PATIENT_PAGE(data.id));
	}, [status, data, navigate]);

	return (
		<Container title="Add New Patient">
			<div className="border-b border-gray-900/10 pb-7">
				<h2 className="text-base font-semibold leading-7 text-gray-900">
					Patient Information
				</h2>
				<p className="mt-1 text-sm leading-6 text-gray-600">
					Add an email address and phone number where you can receive mail and
					messages.
				</p>
			</div>
			<Form
				errors={error}
				loading={isLoading || status === 'pending'}
				onSubmit={addPatient}
			/>
		</Container>
	);
}

export default CreatePatient;
