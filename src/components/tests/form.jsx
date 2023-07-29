import { Alert, Button, Modal } from "antd";
import React from "react";

import HealthParameters from "./health-parameters";
import { parameters as baseParameters } from "./parameters";
import SelectInput from "./select-input";
import SelectedPatient from "./selected-patient";
import { resetParameters, readParameters } from "../../firebase/database";
import { useGetPatientsQuery } from "../../store/features/api/patients";
import { useCreateTestMutation } from "../../store/features/api/tests";
import { useNotificationContext } from "../../store/contexts";

function FormComponent(props, ref) {
  const [parameters, setParameters] = React.useState({
    height: "0",
    weight: "0",
    pulse: "0",
    temperature: "0",
    loading: "1",
  });

  // track the modal state
  const [open, setOpen] = React.useState(false);

  const [error, setError] = React.useState();

  // store the value of the select input
  const [value, setValue] = React.useState(null);

  // store the data of the selected patient
  const [patient, setPatient] = React.useState(null);

  const { api } = useNotificationContext();

  // store the joint data from realtime database and base parameters
  const jointParameters = React.useMemo(() => {
    return baseParameters.map((parameter) => ({
      ...parameter,
      value: parameters[parameter["id"]],
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
    { error: testError, reset, status, isLoading: testLoading },
  ] = useCreateTestMutation();

  const handleCreateTest = React.useCallback(() => {
    createTest({
      patient_id: patient.id,
      ...parameters,
    });
  }, [createTest, patient, parameters]);

  React.useEffect(() => {
    setError(testError);
  }, [testError]);

  // get the options from the patients data
  const patientOptions = React.useMemo(() => {
    if (!patientsData) return [];
    return patientsData.map((patient) => ({
      label: patient.first_name + " " + patient.last_name,
      value: patient.id,
    }));
  }, [patientsData]);

  const changeValue = React.useCallback((key, value) => {
    setParameters((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  }, []);

  const handleParameterChange = React.useCallback(
    (data) => {
      // check height
      if (data.height !== parameters.height) changeValue("height", data.height);

      // check weight
      if (data.weight !== parameters.weight) changeValue("weight", data.weight);

      // check temperature
      if (data.temperature !== parameters.temperature)
        changeValue("temperature", data.temperature);

      // check pulse
      if (data.pulse !== parameters.pulse) changeValue("pulse", data.pulse);

      // check loading
      if (data.loading !== parameters.loading)
        changeValue("loading", data.loading);
    },
    [parameters, changeValue]
  );

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

  React.useEffect(() => {
    setError(patientsError);
  }, [patientsError]);

  // handle begin test
  const handleBeginTest = React.useCallback(() => {
    // if no patient has been selected
    if (!value) {
      setError({ message: "Please select a patient" });
    } else {
      // get the patient from the patients data array
      const patient = patientsData.find((item) => item.id === value);
      if (!patient)
        setError({ message: "Sorry, could not find the selected patient" });
      else setPatient(patient);
    }
  }, [patientsData, value]);

  const resetModal = React.useCallback(() => {
    setOpen(false);
    setValue(null);
    setPatient(null);
    reset();
  }, [reset]);

  // Successful creation of test
  React.useEffect(() => {
    // show notification
    if (status === "fulfilled") {
      api.success({
        message: "Test Saved.",
        description: "Patient's health parameters saved successfully.",
      });
      resetModal();
    }

    return () => {
      resetModal();
    };
  }, [api, status, resetModal]);

  const footerButtons = React.useMemo(() => {
    const buttons = [
      <Button key="cancel" type="ghost" onClick={resetModal}>
        Cancel
      </Button>,
    ];
    if (patient)
      buttons.push(
        <Button
          key="retake"
          type="default"
          disabled={patientsLoading || parameters.loading === "1"}
          size="large"
          onClick={() => resetParameters()}
        >
          Retake Test
        </Button>,
        <Button
          key="continue"
          size="large"
          type="primary"
          disabled={
            patientsLoading || parameters.loading === "1" || testLoading
          }
          loading={testLoading}
          onClick={handleCreateTest}
        >
          Continue
        </Button>
      );
    else
      buttons.push(
        <Button
          key="begin"
          disabled={!value}
          type="primary"
          size="large"
          loading={patientsLoading}
          onClick={handleBeginTest}
        >
          Begin
        </Button>
      );
    return buttons;
  }, [
    testLoading,
    handleCreateTest,
    value,
    patient,
    parameters.loading,
    handleBeginTest,
    patientsLoading,
    resetModal,
  ]);

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
      footer={footerButtons}
    >
      <p className="my-3 py-1 text-gray-700 text-sm md:text-base">
        {patient
          ? "Patient should proceed to health monitoring device to measure health parameters"
          : "Select a patient below and click on the begin button to start to test."}
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
      <div className="mt-4 mb-12">
        <div className="my-2">
          <div className="w-full sm:col-span-3">
            {patient ? (
              <>
                <h4 className="font-semibold mb-2 text-gray-700 text-sm md:text-base">
                  Patient Selected
                </h4>
                <SelectedPatient
                  {...patient}
                  onClose={() => setPatient(null)}
                />
                <HealthParameters
                  parameters={jointParameters}
                  loading={parameters.loading === "1"}
                />
              </>
            ) : (
              <SelectInput
                loading={patientsLoading}
                onClear={() => setValue(null)}
                onChange={(value) => setValue(value)}
                value={value}
                options={patientOptions}
              />
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}

const TestsForm = React.forwardRef(FormComponent);

export default TestsForm;
