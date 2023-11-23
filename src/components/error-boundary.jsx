/* eslint-disable react/prop-types */
import { Button } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

class ErrorBoundary extends React.Component {
	state = {
		hasError: false,
	};

	static getDerivedStateFromError() {
		// Update state so the next render will show the fallback UI.
		return { hasError: true };
	}

	componentDidCatch(error, errorInfo) {
		// logErrorToMyService(error, errorInfo.componentStack);
		this.setState({ message: error.message });
		console.error('Uncaught Error: ', error, errorInfo);
	}

	render() {
		const message =
			this.state.message || 'Sorry, an unexpected error occurred!';
		const Fallback = this.props.fallback;
		if (this.state.hasError) {
			return Fallback ? (
				<Fallback message={message} />
			) : (
				<div className="container flex flex-col justify-between min-h-screen mx-auto p-4">
					<div className="h-[21px] w-[120px] md:h-[48px] md:w-[282px]">
						<img
							className="h-full w-full md:hidden"
							src="/images/mobile-login-switchwise.png"
							alt="SwitchWise"
						/>
						<img
							className="hidden h-full w-full md:block"
							src="/images/desktop-login-switchwise.png"
							alt="SwitchWise"
						/>
					</div>
					<div className="flex flex-col items-center justify-center relative bottom-14 w-full">
						<h1 className="font-black my-3 text-primary-600 text-4xl tracking-wide sm:text-5xl md:text-6xl lg:text-7xl">
							Oops!
						</h1>
						<p className="font-medium my-3 text-center text-secondary-500 text-sm md:text-base">
							{message}
						</p>
						<Link to="/">
							<Button>
								<span>Go Back Home</span>
							</Button>
						</Link>
					</div>
					<div className="h-px w-px" />
				</div>
			);
		}
		return this.props.children;
	}
}

export default ErrorBoundary;
