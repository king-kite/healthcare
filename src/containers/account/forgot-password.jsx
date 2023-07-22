import { ArrowLeftOutlined } from '@ant-design/icons';
import { Alert, Button, Input } from 'antd';
import React from 'react';
import { Form, Link, useActionData, useNavigation } from 'react-router-dom';

import routes from '../../config/routes';
import { useNotificationContext } from '../../store/contexts';

function ForgotPassword() {
	const action = useActionData();
	const { state } = useNavigation();

	const loading = React.useMemo(
		() => state === 'submitting' || state === 'loading',
		[state]
	);

	const { api } = useNotificationContext();

	React.useEffect(() => {
		if (action?.data)
			api.success({
				message: 'Signed In',
				description:
					'Your authentication credentials were accepted and you are now signed in.',
			});
	}, [action, api]);

	return (
		<>
			<h2 className="font-bold mb-3 text-center text-primary-500 text-xl">
				FORGOT PASSWORD?
			</h2>
			{action?.error && (
				<div>
					<Alert message={action.error.message} showIcon type="error" />
				</div>
			)}
			<p className="font-medium leading-6 my-3 px-2 text-center text-gray-800 text-sm">
				Enter your email address to receive further password reset instructions.
			</p>
			<Form
				className="w-full"
				method="post"
				action={routes.FORGOT_PASSWORD_PAGE}
			>
				<div className="my-5">
					<label
						className="block font-medium my-1 text-xs text-gray-700 sm:text-sm"
						htmlFor="email"
					>
						Email
					</label>
					<Input
						allowClear
						className="border-primary-500 text-sm lg:text-base"
						id="email"
						name="email"
						disabled={loading}
						placeholder="Enter email address e.g. test@gmail.com"
						size="large"
						type="email"
					/>
				</div>
				<div className="text-left">
					<Link to={routes.LOGIN_PAGE}>
						<Button
							icon={<ArrowLeftOutlined className="text-xs md:text-sm" />}
							htmlType="button"
							type="link"
						>
							<span className="text-primary-500 text-sm">Login</span>
						</Button>
					</Link>
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
						<span className="px-4 text-sm">Reset</span>
					</Button>
				</div>
			</Form>
		</>
	);
}

export default ForgotPassword;
