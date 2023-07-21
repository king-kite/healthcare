import { Spin } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import {
	Navigate,
	Outlet,
	useLocation,
	useSearchParams,
} from 'react-router-dom';

import routes from '../../config/routes';

function NotAuthenticated() {
	// store the value of the goto route after authenticating
	const [nextRoute, setNextRoute] = React.useState(routes.HOME_PAGE);

	const { isAuthenticated, isLoading } = useSelector((state) => state.auth);

	// Get the state from the location and the searchParams
	const { state } = useLocation(); // get the next property in the state object
	const [searchParams] = useSearchParams(); // get the next param

	React.useEffect(() => {
		// A function to check if the url might be an :id route
		// and return the url if related routes found.
		const unsafeCheckRoute = (url, routes) => {
			let route = '/' + url.split('/')[1] + '/';
			if (routes.includes(route)) return url;
			return null;
		};

		const checkRoute = () => {
			// Get all the values from the routes object
			const arrayRoutes = Object.values(routes);

			// Get the values as a string in an array
			// If the route is a function, pass it a :id parameter
			const filteredRoutes = arrayRoutes.map((route) => {
				if (typeof route === 'function') return route(':id');
				else return route;
			});

			// Get the next route from the searchParams or state
			let nextRoute = routes.HOME_PAGE;
			const searchNext = searchParams.get('next');
			if (searchNext !== null && typeof searchNext === 'string')
				nextRoute = searchNext;
			else if (state?.next !== undefined && typeof state.next === 'string')
				nextRoute = state.next;

			// Add a forward slash at the end if not found
			// if (!nextRoute.endsWith('/') && nextRoute !== '/') nextRoute += '/';

			// Make sure the next route also starts with a '/'
			if (nextRoute !== '/' && !nextRoute.startsWith('/'))
				nextRoute = '/' + nextRoute;

			// Check if the route exists in our filteredRoutes array
			if (filteredRoutes.includes(nextRoute)) setNextRoute(nextRoute);
			else {
				const route = unsafeCheckRoute(nextRoute, filteredRoutes);
				if (route !== null) setNextRoute(route);
			}
		};
		checkRoute();
	}, [state, searchParams]);

	if (isLoading)
		return (
			<div className="flex h-full items-center justify-center min-h-[50vh] w-full">
				<Spin spinning={isLoading} size="large" />
			</div>
		);

	if (!isAuthenticated) return <Outlet />;

	// replace to remove the old state from the useLocation hook
	return <Navigate to={nextRoute} replace />;
}

export default NotAuthenticated;
