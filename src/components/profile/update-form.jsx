import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Alert, Button, Upload } from 'antd';
import React from 'react';

import { Input } from '../controls';
import { useUpload } from '../../firebase/storage/hooks';
import { useNotificationContext } from '../../store/contexts';
import { useUpdateProfileMutation } from '../../store/features/api/auth';

function UpdateForm({ data, onSuccess }) {
	const [error, setError] = React.useState();

	const formRef = React.useRef();

	const [
		updateProfile,
		{
			data: successData,
			error: errors,
			reset,
			isLoading: loading,
			isError,
			isSuccess,
		},
	] = useUpdateProfileMutation();

	const resetRef = React.useRef(reset);
	resetRef.current = reset;

	const { api } = useNotificationContext();

	const {
		data: uploadData,
		loading: imgLoading,
		upload: uploadFile,
	} = useUpload({
		onError(error) {
			setError(error);
		},
	});

	const handleImageUpload = React.useCallback(
		(data) => {
			uploadFile({ file: data.file });
		},
		[uploadFile]
	);

	React.useEffect(() => {
		() => {
			if (resetRef.current) resetRef.current();
		};
	}, []);

	React.useEffect(() => {
		if (isSuccess) {
			api.success({
				message: 'Profile Updated.',
				description: 'Your profile was updated successfully.',
			});
			if (successData && onSuccess) onSuccess(successData);
			if (resetRef.current) resetRef.current();
		}
	}, [api, isSuccess, onSuccess, successData]);

	React.useEffect(() => {
		if (isError && errors) {
			setError(errors);
		}
	}, [isError, errors]);

	return (
		<>
			<h2 className="font-bold mb-3 text-center text-primary-500 text-xl">
				UPDATE PROFILE
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
						updateProfile({
							full_name: formRef.current.full_name.value,
							image: formRef.current.image.value || data.image || null,
							email: formRef.current.email.value,
						});
					}
				}}
			>
				<div className="my-5">
					<label
						className="block font-medium my-1 text-sm text-gray-700 md:text-base"
						htmlFor="image"
					>
						Image
					</label>
					<div>
						<Upload
							accept="image/*"
							listType="picture-card"
							className="avatar-uploader"
							disabled={loading}
							showUploadList={false}
							customRequest={handleImageUpload}
						>
							{imgLoading ? (
								<div>
									<LoadingOutlined />
								</div>
							) : uploadData?.url || data.image ? (
								<img
									className="h-full w-full rounded-md"
									src={uploadData?.url || data.image}
									alt="avatar"
									style={{ width: '100%' }}
								/>
							) : (
								<div>
									{imgLoading ? <LoadingOutlined /> : <PlusOutlined />}
									<div style={{ marginTop: 8 }}>Upload</div>
								</div>
							)}
						</Upload>
					</div>
					<div>
						<input
							type="hidden"
							name="image"
							value={uploadData?.url || data.image || undefined}
						/>
					</div>
				</div>
				<div className="my-5">
					<Input
						label="Full Name"
						defaultValue={data.full_name || undefined}
						error={error && errors?.path === 'full_name' ? error : undefined}
						id="full_name"
						name="full_name"
						disabled={loading}
						placeholder="Enter Full Name e.g. Richard Cooper"
					/>
				</div>
				<div className="my-5">
					<Input
						label="Email Address"
						defaultValue={data.email || undefined}
						error={error && errors?.path === 'email' ? error : undefined}
						id="email"
						name="email"
						disabled={loading}
						placeholder="Enter email address e.g. test@gmail.com"
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
						<span className="px-4 text-sm">Update</span>
					</Button>
				</div>
			</form>
		</>
	);
}

export default UpdateForm;
