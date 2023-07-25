import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, DatePicker, Input, Select, Upload, message } from 'antd';
import React from 'react';
import { Form, useNavigation } from 'react-router-dom';

const getBase64 = (img, callback) => {
	const reader = new FileReader();
	reader.addEventListener('load', () => callback(reader.result));
	reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
	const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
	if (!isJpgOrPng) {
		message.error('You can only upload JPG/PNG file!');
	}
	const isLt2M = file.size / 1024 / 1024 < 2;
	if (!isLt2M) {
		message.error('Image must smaller than 2MB!');
	}
	return isJpgOrPng && isLt2M;
};

function PatientForm() {
	const { state } = useNavigation();

	const loading = React.useMemo(
		() => state === 'loading' || state === 'submitting',
		[state]
	);

	const [imageUrl, setImageUrl] = React.useState();
	const [imgLoading, setImgLoading] = React.useState(false);

	const handleChange = React.useCallback((info) => {
		console.log({ info });
		// if (info.file.status === 'uploading') {
		// 	setImgLoading(true);
		// 	return;
		// }
		// if (info.file.status === 'error') {
		// 	setImgLoading(false);
		// }
		// if (info.file.status === 'done') {
		// 	// Get this url from response in real world.
		// 	getBase64(info.file.originFileObj, (url) => {
		// 		setImgLoading(false);
		// 		setImageUrl(url);
		// 	});
		// }
	}, []);

	const uploadButton = (
		<div>
			{loading || imgLoading ? <LoadingOutlined /> : <PlusOutlined />}
			<div style={{ marginTop: 8 }}>Upload</div>
		</div>
	);

	return (
		<Form method="post">
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
							accept="image/"
							name="image"
							listType="picture-card"
							className="avatar-uploader"
							showUploadList={false}
							action={() => new Promise((resolve) => resolve(''))}
							beforeUpload={beforeUpload}
							onChange={handleChange}
							customRequest={(customRequestData) => {
								console.log('The custom request function was called');
								console.log(customRequestData);
							}}
						>
							{imageUrl ? (
								<img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
							) : (
								uploadButton
							)}
						</Upload>
					</div>
				</div>
				<div className="sm:col-span-3">
					<label
						className="block font-medium my-1 text-sm text-gray-700 md:text-base"
						htmlFor="first_name"
					>
						First name
					</label>
					<Input
						allowClear
						className="text-sm lg:text-base"
						id="first_name"
						name="first_name"
						// disabled={loading}
						placeholder="Enter patient's first name e.g. Richard"
						size="large"
						type="text"
					/>
				</div>

				<div className="sm:col-span-3">
					<label
						className="block font-medium my-1 text-sm text-gray-700 md:text-base"
						htmlFor="last_name"
					>
						Last name
					</label>
					<Input
						allowClear
						className="text-sm lg:text-base"
						id="last_name"
						name="last_name"
						// disabled={loading}
						placeholder="Enter patient's last name e.g. Cooper"
						size="large"
						type="text"
					/>
				</div>

				<div className="sm:col-span-4">
					<label
						className="block font-medium my-1 text-sm text-gray-700 md:text-base"
						htmlFor="email"
					>
						Email Address
					</label>
					<Input
						allowClear
						className="text-sm lg:text-base"
						id="email"
						name="email"
						// disabled={loading}
						placeholder="Enter patient's email address e.g. richardcooper@gmail.com"
						size="large"
						type="email"
					/>
				</div>

				<div className="col-span-full">
					<label
						className="block font-medium my-1 text-sm text-gray-700 md:text-base"
						htmlFor="address"
					>
						Address
					</label>
					<Input.TextArea
						allowClear
						className="text-sm lg:text-base"
						id="address"
						autoSize={{
							minRows: 2,
							maxRows: 4,
						}}
						name="address"
						// disabled={loading}
						placeholder="Enter patient's home address"
						size="large"
					/>
				</div>

				<div className="sm:col-span-2">
					<label
						className="block font-medium my-1 text-sm text-gray-700 md:text-base"
						htmlFor="gender"
					>
						Gender
					</label>
					<Select
						showSearch
						style={{ width: '100%' }}
						id="gender"
						name="gender"
						size="large"
						placeholder="Select Gender"
						optionFilterProp="children"
						filterOption={(input, option) =>
							(option?.label ?? '').includes(input)
						}
						filterSort={(optionA, optionB) =>
							(optionA?.label ?? '')
								.toLowerCase()
								.localeCompare((optionB?.label ?? '').toLowerCase())
						}
						options={[
							{
								value: '',
								label: 'Not Identified',
							},
							{
								value: 'Male',
								label: 'Male',
							},
							{
								value: 'Female',
								label: 'Female',
							},
						]}
					/>
				</div>

				<div className="sm:col-span-2">
					<label
						className="block font-medium my-1 text-sm text-gray-700 md:text-base"
						htmlFor="phone"
					>
						Phone number
					</label>
					<Input
						allowClear
						className="text-sm lg:text-base"
						id="phone"
						name="phone"
						// disabled={loading}
						placeholder="Enter patient's phone number e.g. +234-810-384-7362"
						size="large"
						type="text"
					/>
				</div>

				<div className="sm:col-span-2">
					<label
						className="block font-medium my-1 text-sm text-gray-700 md:text-base"
						htmlFor="dob"
					>
						Date of Birth
					</label>
					<DatePicker
						className="text-sm w-full lg:text-base"
						id="dob"
						name="dob"
						size="large"
					/>
				</div>
			</div>
			<div className="mt-6 flex items-center gap-x-6">
				<Button size="large" type="default" typeof="button">
					<span className="px-2 text-gray-700 text-sm md:px-2 md:text-base">
						Cancel
					</span>
				</Button>
				<Button size="large" type="primary" typeof="submit">
					<span className="px-2 text-gray-100 text-sm md:px-4 md:text-base">
						Save
					</span>
				</Button>
			</div>
		</Form>
	);
}

export default PatientForm;
