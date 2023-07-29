import { EditOutlined, SecurityScanOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { UpdateForm } from '../../../components/profile';
import { login } from '../../../store/features/auth';

function Profile() {
	const [open, setOpen] = React.useState(false);

	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth.data);

	const data = React.useMemo(
		() => [
			{
				title: 'Full Name',
				value: auth?.displayName || '------',
			},
			{
				title: 'Email Address',
				value: auth?.email || '------',
			},
		],
		[auth]
	);

	const handleSuccess = React.useCallback(
		(data) => {
			setOpen(false);
			dispatch(login({ data }));
		},
		[dispatch]
	);

	return (
		<>
			<div className="profile-top-image">
				<div className="wrapper">
					<div className="container-dashboard h-full relative w-full">
						<span className="absolute bottom-[-3rem] left-4">
							<span className="bg-primary-500 border-4 border-gray-100 border-solid h-24 inline-flex items-center justify-center relative rounded-full text-gray-50 w-24">
								{auth?.image ? (
									<img
										className="h-full rounded-full w-full"
										src={auth.image}
										alt={auth?.displayName[0] || auth.email[0]}
									/>
								) : (
									<span className="left-[0.05rem] relative text-xl top-[0.075rem]">
										{auth?.displayName[0] || auth.email[0]}
									</span>
								)}
							</span>
						</span>
					</div>
				</div>
			</div>
			<div className="container-dashboard py-4 w-full">
				<div className="my-8 py-2">
					<h1 className="font-bold mb-2 mt-5 text-gray-700 text-lg">
						{auth?.displayName || auth?.email}
					</h1>
					<div className="sm:flex sm:items-center">
						<div className="my-4 sm:mr-2 sm:my-0">
							<Button
								className="cursor-pointer hover:text-primary-500"
								icon={
									<span className="mr-2 text-gray-100 text-sm md:text-base">
										<EditOutlined />
									</span>
								}
								onClick={() => setOpen(true)}
								type="primary"
							>
								<span className="text-gray-100 text-sm md:text-base">
									Update
								</span>
							</Button>
						</div>
						<div className="my-4 sm:ml-2 sm:my-0">
							<Button
								className="cursor-pointer hover:text-primary-500"
								icon={
									<span className="mr-2 text-gray-700 text-sm md:text-base">
										<SecurityScanOutlined />
									</span>
								}
								type="default"
							>
								<span className="text-gray-700 text-sm md:text-base">
									Change Password
								</span>
							</Button>
						</div>
					</div>
					<hr className="border-gray-100 my-4" />
					<div>
						<div>
							<h3 className="text-base font-semibold leading-7 text-gray-900">
								Profile Information
							</h3>
							<p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
								Personal details and application.
							</p>
						</div>
						<div className="mt-6 border-t border-gray-100">
							<dl className="divide-y divide-gray-100">
								{data.map((detail, index) => (
									<div key={index} className="p-4">
										<dt className="text-sm font-medium leading-6 text-gray-900 md:text-base md:font-semibold">
											{detail.title}
										</dt>
										<dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 md:text-base md:font-medium">
											{detail.value}
										</dd>
									</div>
								))}
							</dl>
						</div>
					</div>
				</div>
			</div>

			<Modal open={open} onCancel={() => setOpen(false)} footer={<></>}>
				<UpdateForm
					data={{
						full_name: auth.displayName,
						email: auth.email,
						image: auth.image,
					}}
					onSuccess={handleSuccess}
				/>
			</Modal>
		</>
	);
}

export default Profile;
