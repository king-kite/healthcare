import { Alert, Button } from 'antd';
import React from 'react';

import { Input } from '../controls';
import { useNotificationContext } from '../../store/contexts';
import { useUpdatePasswordMutation } from '../../store/features/api/auth';

function ChangePassword({ onSuccess }) {
	const [error, setError] = React.useState();

	const formRef = React.useRef();

	const [
		updatePassword,
		{ error: errors, reset, isLoading: loading, isError, isSuccess },
	] = useUpdatePasswordMutation();

	const resetRef = React.useRef(reset);
	resetRef.current = reset;

	const { api } = useNotificationContext();

	React.useEffect(() => {
		() => {
			if (resetRef.current) resetRef.current();
		};
	}, []);

	React.useEffect(() => {
		if (isSuccess) {
			api.success({
				message: 'Password Changed!',
				description: 'Your password was updated successfully.',
			});
			if (onSuccess) onSuccess();
			if (resetRef.current) resetRef.current();
		}
	}, [api, isSuccess, onSuccess]);

	React.useEffect(() => {
		if (isError && errors) {
			setError(errors);
		}
	}, [isError, errors]);

	return (
		<>
			<h2 className="font-bold mb-3 text-center text-primary-500 text-xl">
				CHANGE PASSWORD
			</h2>
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
			<form
				ref={formRef}
				className="w-full"
				onSubmit={(e) => {
					e.preventDefault();
					if (formRef.current) {
						const password1 = formRef.current.password1.value?.trim();
						const password2 = formRef.current.password2.value?.trim();

						if (!password1) {
							setError({
								message: 'Password field is required!',
								path: 'password1',
							});
						} else if (!password2) {
							setError({
								message: 'Password confirmation field is required!',
								path: 'password2',
							});
						} else if (password1 !== password2) {
							setError({
								message: 'Password do not match',
								path: 'password1',
							});
						} else {
							updatePassword(password1);
						}
					}
				}}
			>
				<div className="my-5">
					<Input.Password
						label="Enter Password"
						error={error && error?.path === 'password1' ? error : undefined}
						id="password1"
						name="password1"
						disabled={loading}
						placeholder="Enter Password"
					/>
				</div>
				<div className="my-5">
					<Input.Password
						label="Enter Password Again"
						error={error && error?.path === 'password2' ? error : undefined}
						id="password2"
						name="password2"
						disabled={loading}
						placeholder="Enter Password Again"
					/>
				</div>
				<div className="mt-5">
					<Button
						block
						htmlType="submit"
						name="submit"
						loading={loading}
						disabled={loading}
						size="large"
						type="primary"
					>
						<span className="px-4 text-sm">Submit</span>
					</Button>
				</div>
			</form>
		</>
	);
}

export default ChangePassword;
