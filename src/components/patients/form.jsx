import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Alert, Button, Upload } from 'antd';
import React from 'react';

import { DatePicker, Input, Select } from '../../components/controls';
import { useUpload } from '../../firebase/storage/hooks';

function PatientsForm({ data = {}, errors, loading, onSubmit }) {
	const [error, setError] = React.useState();

	const formRef = React.useRef();

	React.useEffect(() => {
		if (errors) {
			setError(errors.message);
			window.scrollTo(0, 0); // scroll to the top to view the message
		} else setError(undefined);
	}, [errors]);

	const {
		data: uploadData,
		loading: imgLoading,
		upload: uploadFile,
	} = useUpload({
		onError(error) {
			setError(error.message);
		},
	});

	const handleImageUpload = React.useCallback(
		(data) => {
			uploadFile({ file: data.file });
		},
		[uploadFile]
	);

	return (
		<>
			{error && (
				<div className="my-3">
					<Alert
						message="Failed to save patient information"
						description={error}
						showIcon
						type="error"
						closable
						onClose={() => setError(null)}
					/>
				</div>
			)}
			<form
				ref={formRef}
				onSubmit={(e) => {
					e.preventDefault();
					if (formRef.current && onSubmit) {
						onSubmit({
							first_name: formRef.current.first_name.value || null,
							last_name: formRef.current.last_name.value || null,
							email: formRef.current.email.value || null,
							address: formRef.current.address.value || null,
							image: formRef.current.image.value || null,
							image_ref: formRef.current.image_ref.value || null,
							gender: formRef.current.gender.value || null,
							phone: formRef.current.phone.value || null,
							dob: formRef.current.dob.value || null,
						});
					}
				}}
			>
				<div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
					<div className="sm:col-span-full">
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
								{uploadData?.url || data.image ? (
									<img
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
								value={uploadData?.url || data.image}
							/>
							<input
								type="hidden"
								name="image_ref"
								value={uploadData?.location}
							/>
						</div>
					</div>
					<div className="sm:col-span-3">
						<Input
							defaultValue={data.first_name || undefined}
							id="first_name"
							label="First name"
							name="first_name"
							error={error && errors?.path === 'first_name' ? error : undefined}
							disabled={loading}
							placeholder="Enter patient's first name e.g. Richard"
						/>
					</div>

					<div className="sm:col-span-3">
						<Input
							label="Last name"
							defaultValue={data.last_name || undefined}
							error={error && errors?.path === 'last_name' ? error : undefined}
							id="last_name"
							name="last_name"
							disabled={loading}
							placeholder="Enter patient's last name e.g. Cooper"
						/>
					</div>

					<div className="sm:col-span-4">
						<Input
							label="Email Address"
							error={error && errors?.path === 'email' ? error : undefined}
							defaultValue={data.email || undefined}
							id="email"
							name="email"
							disabled={loading}
							placeholder="Enter patient's email address e.g. richardcooper@gmail.com"
						/>
					</div>

					<div className="col-span-full">
						<Input.TextArea
							defaultValue={data.address || undefined}
							error={error && errors?.path === 'address' ? error : undefined}
							id="address"
							label="Address"
							name="address"
							disabled={loading}
							placeholder="Enter patient's home address"
						/>
					</div>

					<div className="sm:col-span-2">
						<Select
							defaultValue={data.gender || undefined}
							id="gender"
							label="Gender"
							name="gender"
							placeholder="Select Gender"
							error={error && errors?.path === 'gender' ? error : undefined}
							options={[
								{
									value: 'M',
									label: 'Male',
								},
								{
									value: 'F',
									label: 'Female',
								},
							]}
						/>
					</div>

					<div className="sm:col-span-2">
						<Input
							label="Phone number"
							defaultValue={data.phone || undefined}
							error={error && errors?.path === 'phone' ? error : undefined}
							id="phone"
							name="phone"
							disabled={loading}
							placeholder="Enter patient's phone number e.g. +234-012-3456-789"
						/>
					</div>

					<div className="sm:col-span-2">
						<DatePicker
							label="Date of Birth"
							error={error && errors?.path === 'dob' ? error : undefined}
							id="dob"
							name="dob"
							defaultValue={data.dob || undefined}
						/>
					</div>
				</div>
				<div className="mt-6 flex items-center gap-x-6">
					<Button
						disabled={loading}
						size="large"
						htmlType="button"
						type="default"
					>
						<span className="px-2 text-gray-700 text-sm md:px-2 md:text-base">
							Cancel
						</span>
					</Button>
					<Button
						disabled={loading}
						loading={loading}
						name="submit"
						htmlType="submit"
						size="large"
						type="primary"
					>
						<span className="px-2 text-gray-100 text-sm md:px-4 md:text-base">
							Save
						</span>
					</Button>
				</div>
			</form>
		</>
	);
}

export default PatientsForm;
