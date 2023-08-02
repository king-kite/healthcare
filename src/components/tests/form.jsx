import { Alert, Button, Modal } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import HealthParameters from './health-parameters';
import { parameters as baseParameters } from './parameters';
import SelectInput from './select-input';
import SelectedPatient from './selected-patient';
import { Select } from '../controls';
import routes from '../../config/routes';
import { resetParameters, readParameters } from '../../firebase/database';
import { useGetPatientsQuery } from '../../store/features/api/patients';
import { useCreateTestMutation } from '../../store/features/api/tests';
import { useNotificationContext } from '../../store/contexts';

function FormComponent(props, ref) {
	const [parameters, setParameters] = React.useState({
		height: '0',
		weight: '0',
		pulse: '0',
		temperature: '0',
		loading: '1',
	});

	// track the modal state
	const [open, setOpen] = React.useState(false);

	const [error, setError] = React.useState();

	// store the value of the select input
	const [value, setValue] = React.useState(null);

	// store the data of the selected patient
	const [patient, setPatient] = React.useState(null);

	// store the activity level of the patient
	const [activity, setActivity] = React.useState('1');

	const { api } = useNotificationContext();

	const navigate = useNavigate();

	// store the joint data from realtime database and base parameters
	const jointParameters = React.useMemo(() => {
		return baseParameters.map((parameter) => ({
			...parameter,
			value: parameters[parameter['id']],
		}));
	}, [parameters]);

	// get the patients from the database
	const {
		data: patientsData,
		error: patientsError,
		isLoading: patientsLoading,
	} = useGetPatientsQuery();

	// create user mutation
	const [
		createTest,
		{
			data: createData,
			error: testError,
			reset,
			status,
			isLoading: testLoading,
		},
	] = useCreateTestMutation();

	const handleCreateTest = React.useCallback(() => {
		createTest({
			patient_id: patient.id,
			activity: +activity,
			...parameters,
		});
	}, [activity, createTest, patient, parameters]);

	// get the options from the patients data
	const patientOptions = React.useMemo(() => {
		if (!patientsData) return [];
		return patientsData.map((patient) => ({
			label: patient.first_name + ' ' + patient.last_name,
			value: patient.id,
		}));
	}, [patientsData]);

	// Handle state change if a parameter or loading is updated
	const handleParameterChange = React.useCallback((data) => {
		setParameters((prevParameters) => {
			const newData = {};

			// check height
			if (data.height !== prevParameters.height) newData.height = data.height;

			// check weight
			if (data.weight !== prevParameters.weight) newData.weight = data.weight;

			// check temperature
			if (data.temperature !== prevParameters.temperature)
				newData.temperature = data.temperature;

			// check pulse
			if (data.pulse !== prevParameters.pulse) newData.pulse = data.pulse;

			// check loading
			if (data.loading !== prevParameters.loading)
				newData.loading = data.loading;

			return {
				...prevParameters,
				...newData,
			};
		});
	}, []);

	// handle begin test
	const handleBeginTest = React.useCallback(() => {
		// if no patient has been selected
		if (!value) {
			setError({ message: 'Please select a patient' });
		} else {
			// get the patient from the patients data array
			const patient = patientsData.find((item) => item.id === value);
			if (!patient)
				setError({ message: 'Sorry, could not find the selected patient' });
			else setPatient(patient);
		}
	}, [patientsData, value]);

	// Reset the modal
	const resetModal = React.useCallback(() => {
		setOpen(false);
		setValue(null);
		setPatient(null);
		reset();
	}, [reset]);

	// Listen for errors in when creating tests
	React.useEffect(() => {
		setError(testError);
	}, [testError]);

	// Listen for errors when getting patients
	React.useEffect(() => {
		setError(patientsError);
	}, [patientsError]);

	// Read the parameters
	React.useEffect(() => {
		readParameters({
			onError(error) {
				setError(error);
			},
			onSuccess(data) {
				handleParameterChange(data);
			},
		});
	}, [handleParameterChange]);

	// Successful creation of test
	React.useEffect(() => {
		// show notification
		if (status === 'fulfilled') {
			api.success({
				message: 'Test Saved.',
				description: "Patient's health parameters saved successfully.",
			});
			// Navigate to the test detail page
			if (createData) navigate(routes.TEST_PAGE(createData.id));
			// Reset the modal
			resetModal();
		}
	}, [api, createData, navigate, status, resetModal]);

	React.useImperativeHandle(
		ref,
		() => {
			return {
				closeModal: () => setOpen(false),
				openModal: () => setOpen(true),
			};
		},
		[]
	);

	return (
		<Modal
			onCancel={resetModal}
			title="Conduct Test/Diagnosis."
			open={open}
			maskClosable={false}
			footer={null}
		>
			<p className="my-3 py-1 text-gray-700 text-sm md:text-base">
				{patient
					? 'Patient should proceed to health monitoring device to measure health parameters'
					: 'Select a patient below and click on the begin button to start to test.'}
			</p>
			{error && (
				<div>
					<Alert
						message={error.message}
						closable
						onClose={() => setError(null)}
						showIcon
						type="error"
					/>
				</div>
			)}
			<div className="mt-6 mb-3 w-full">
				<div className="w-full sm:col-span-3">
					{patient ? (
						<>
							<h4 className="font-semibold mb-2 text-gray-700 text-sm md:text-base">
								Patient Selected
							</h4>
							<SelectedPatient {...patient} onClose={() => setPatient(null)} />
							<HealthParameters
								parameters={jointParameters}
								loading={parameters.loading === '1'}
							/>
						</>
					) : (
						<>
							<SelectInput
								loading={patientsLoading}
								onClear={() => setValue(null)}
								onChange={(value) => setValue(value)}
								value={value}
								options={patientOptions}
							/>
							<div className="mt-5 w-full">
								<Select
									label="Activity Level"
									onSelect={(value) => setActivity(value)}
									loading={patientsLoading}
									value={activity}
									options={[
										{
											label: 'Sedentary (little or no exercise)',
											value: '1',
										},
										{
											label: 'Lightly active (exercise/sports 1-3 days a week)',
											value: '2',
										},
										{
											label:
												'Modertely active (moderate exercise/sports 3 - 5 days a week)',
											value: '3',
										},
										{
											label:
												'Very active (hard exercise/sports 6-7 days a week)',
											value: '4',
										},
										{
											label:
												'Extra active (very hard exercise/sports and a physically active job)',
											value: '5',
										},
									]}
								/>
							</div>
						</>
					)}
				</div>
				<div className="flex flex-wrap gap-4 items-center justify-end mt-5 w-full">
					<Button disabled={testLoading} type="ghost" onClick={resetModal}>
						Cancel
					</Button>

					{patient ? (
						<>
							<Button
								type="default"
								disabled={patientsLoading || parameters.loading === '1'}
								size="large"
								onClick={resetParameters}
							>
								Retake Test
							</Button>
							<Button
								size="large"
								type="primary"
								disabled={
									patientsLoading || parameters.loading === '1' || testLoading
								}
								loading={testLoading}
								onClick={handleCreateTest}
							>
								Continue
							</Button>
						</>
					) : (
						<Button
							disabled={!value}
							type="primary"
							size="large"
							loading={patientsLoading}
							onClick={handleBeginTest}
						>
							Begin
						</Button>
					)}
				</div>
			</div>
		</Modal>
	);
}

const TestsForm = React.forwardRef(FormComponent);

export default TestsForm;
