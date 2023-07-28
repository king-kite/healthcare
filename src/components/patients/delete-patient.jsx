import { Button, Popconfirm } from 'antd';
import React from 'react';

import { useNotificationContext } from '../../store/contexts';
import { useDeletePatientMutation } from '../../store/features/api/patients';

function DeletePatient({ children, patientId: id, ...props }) {
	const [open, setOpen] = React.useState(false);

	const { api } = useNotificationContext();
	const [deletePatient, { error, status, isLoading }] =
		useDeletePatientMutation();

	const handleDelete = React.useCallback(() => {
		deletePatient(id);
	}, [deletePatient, id]);

	React.useEffect(() => {
		console.log(error, status);
		if (error && status === 'rejected')
			api.error({
				message: `Sorry, counld not delete patient!`,
				description: error.message,
			});
		else if (status === 'fulfilled')
			api.success({
				message: 'Patient deleted successfully.',
			});
	}, [api, status, error]);

	return (
		<Popconfirm
			title="Delete Patient"
			description="Do you wish to delete this patient?"
			open={open}
			onConfirm={handleDelete}
			okButtonProps={{ loading: isLoading }}
			onCancel={() => setOpen(false)}
			okType="danger"
		>
			<Button
				shape="circle"
				type="ghost"
				disabled={isLoading}
				onClick={() => setOpen(true)}
				{...props}
			>
				{children}
			</Button>
		</Popconfirm>
	);
}

export default DeletePatient;
