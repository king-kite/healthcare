import Container from '../../../components/container';
import Form from '../../../components/patients/form';

function EditPatient() {
	return (
		<Container title="Add New Patient">
			<div className="border-b border-gray-900/10 pb-7">
				<h2 className="text-base font-semibold leading-7 text-gray-900">
					Edit Patient Information
				</h2>
				<p className="mt-1 text-sm leading-6 text-gray-600">
					Fill in the form below to edit the patient&apos; information.
				</p>
			</div>
			<Form />
		</Container>
	);
}

export default EditPatient;
