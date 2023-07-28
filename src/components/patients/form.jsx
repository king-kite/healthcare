import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Alert, Button, Upload } from "antd";
import React from "react";
import { Form, useActionData, useNavigation } from "react-router-dom";

import { DatePicker, Input, Select } from "../../components/controls";
import { useUpload } from "../../firebase/storage/hooks";

function PatientsForm({ action: actionUrl, data = {}, method = "post" }) {
	const action = useActionData();
	const { state } = useNavigation();

	const [error, setError] = React.useState(null);

	const loading = React.useMemo(
		() => state === "loading" || state === "submitting",
		[state]
	);

	React.useEffect(() => {
		if (action?.error) {
			setError(action.error.message);
			window.scrollTo(0, 0); // scroll to the top to view the message
		}
	}, [action]);

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
			<Form method={method} action={actionUrl}>
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
										style={{ width: "100%" }}
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
							error={
								error && action?.error?.path === "first_name"
									? error
									: undefined
							}
							disabled={loading}
							placeholder="Enter patient's first name e.g. Richard"
						/>
					</div>

					<div className="sm:col-span-3">
						<Input
							label="Last name"
							defaultValue={data.last_name || undefined}
							error={
								error && action?.error?.path === "last_name" ? error : undefined
							}
							id="last_name"
							name="last_name"
							disabled={loading}
							placeholder="Enter patient's last name e.g. Cooper"
						/>
					</div>

					<div className="sm:col-span-4">
						<Input
							label="Email Address"
							error={
								error && action?.error?.path === "email" ? error : undefined
							}
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
							error={
								error && action?.error?.path === "address" ? error : undefined
							}
							id="address"
							label="Address"
							name="address"
							disabled={loading}
							placeholder="Enter patient's home address"
						/>
					</div>

					<div className="sm:col-span-2">
						<Select
							id="gender"
							label="Gender"
							name="gender"
							placeholder="Select Gender"
							error={
								error && action?.error?.path === "gender" ? error : undefined
							}
							options={[
								{
									value: "M",
									label: "Male",
								},
								{
									value: "F",
									label: "Female",
								},
							]}
						/>
					</div>

					<div className="sm:col-span-2">
						<Input
							label="Phone number"
							defaultValue={data.phone || undefined}
							error={
								error && action?.error?.path === "phone" ? error : undefined
							}
							id="phone"
							name="phone"
							disabled={loading}
							placeholder="Enter patient's phone number e.g. +234-012-3456-789"
						/>
					</div>

					<div className="sm:col-span-2">
						<DatePicker
							label="Date of Birth"
							error={error && action?.error?.path === "dob" ? error : undefined}
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
			</Form>
		</>
	);
}

export default PatientsForm;
