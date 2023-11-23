import { Spin } from 'antd';
import React from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import Container from '../../../components/container';
import Form from '../../../components/patients/form';
import routes from '../../../config/routes';
import {
	useGetPatientQuery,
	useEditPatientMutation,
} from '../../../store/features/api/patients';

function EditPatient() {
	const { id } = useParams();

	const { data, isLoading } = useGetPatientQuery(id, {
		skip: id === undefined,
	});

	const [editPatient, { error, isLoading: editLoading, status }] =
		useEditPatientMutation();

	const navigate = useNavigate();

	React.useEffect(() => {
		if (status === 'fulfilled' && id) navigate(routes.PATIENT_PAGE(id));
	}, [status, id, navigate]);

	if (isLoading)
		return (
			<div className="flex items-center justify-center min-h-[50vh]">
				<Spin spinning size="large" />
			</div>
		);

	// No data found
	if (!isLoading && !data) return <Navigate to="/404" />;

	return (
		<Container title="Edit Patient">
			<div className="border-b border-gray-900/10 pb-7">
				<h2 className="text-base font-semibold leading-7 text-gray-900">
					Edit Patient Information
				</h2>
				<p className="mt-1 text-sm leading-6 text-gray-600">
					Fill in the form below to edit the patient&apos; information.
				</p>
			</div>
			<Form
				data={data}
				errors={error}
				loading={editLoading || status === 'pending'}
				onSubmit={(data) => editPatient({ data, id })}
			/>
		</Container>
	);
}

export default EditPatient;
