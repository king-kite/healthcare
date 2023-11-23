import { Button, Popconfirm } from 'antd';
import React from 'react';

import { useNotificationContext } from '../../store/contexts';
import { useDeletePatientMutation } from '../../store/features/api/patients';

function DeletePatient({ children, patientId: id, onSuccess, ...props }) {
	const [open, setOpen] = React.useState(false);

	const { api } = useNotificationContext();
	const [deletePatient, { error, status, isLoading }] =
		useDeletePatientMutation();

	const handleDelete = React.useCallback(() => {
		deletePatient(id);
	}, [deletePatient, id]);

	React.useEffect(() => {
		if (error && status === 'rejected')
			api.error({
				message: `Sorry, could not delete patient!`,
				description: error.message,
			});
		else if (status === 'fulfilled') {
			if (onSuccess) onSuccess();
			setOpen(false);
			api.success({
				message: 'Patient deleted successfully.',
			});
		}
	}, [api, status, error, onSuccess]);

	return (
		<Popconfirm
			title="Delete Patient"
			description="Do you wish to delete this patient?"
			open={open}
			onConfirm={handleDelete}
			okButtonProps={{ loading: isLoading }}
			cancelButtonProps={{ disabled: isLoading }}
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
