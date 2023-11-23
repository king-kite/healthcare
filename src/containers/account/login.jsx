import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import { Alert, Button, Input } from 'antd';
import React from 'react';
import { Form, Link, useActionData, useNavigation } from 'react-router-dom';

import routes from '../../config/routes';
import { useNotificationContext } from '../../store/contexts';

function Login() {
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
				SIGN IN
			</h2>
			{action?.error && (
				<div>
					<Alert message={action.error.message} showIcon type="error" />
				</div>
			)}
			<Form className="w-full" method="post" action={routes.LOGIN_PAGE}>
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
				<div className="my-5">
					<label
						className="block font-medium my-1 text-xs text-gray-700 sm:text-sm"
						htmlFor="password"
					>
						Password
					</label>
					<Input.Password
						allowClear
						className="border-primary-500 text-sm lg:text-base"
						id="password"
						disabled={loading}
						iconRender={(visible) =>
							!visible ? (
								<EyeTwoTone className="cursor-pointer text-primary-500" />
							) : (
								<EyeInvisibleOutlined className="cursor-pointer text-primary-500" />
							)
						}
						name="password"
						placeholder="Enter your password"
						size="large"
					/>
				</div>
				<div className="text-right">
					<Link to={routes.FORGOT_PASSWORD_PAGE}>
						<Button htmlType="button" type="link">
							<span className="text-primary-500 text-sm">Forgot Password?</span>
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
						<span className="px-4 text-sm">Sign In</span>
					</Button>
				</div>
			</Form>
		</>
	);
}

export default Login;
