import { ref, onValue, set } from 'firebase/database';

import { db } from '.';
import { handleError } from './utils';

// Get the route data from the realtime database
export function getRouteData({ route, onError, onSuccess }) {
	try {
		// route === 'L1' || 'L2' and so on...

		// get reference to data
		const reference = ref(db, '/' + route);

		onValue(reference, (snapshot) => {
			if (snapshot.exists()) {
				const value = snapshot.val();
				onSuccess(value);
			} else onError({ message: `No switch exists on route: ${route}` });
		});
	} catch (error) {
		const err = handleError(error);
		if (onError) onError(err);
	}
}

// Set the route data on the realtime database
export async function setRouteData({ route, onSuccess, onError, value }) {
	try {
		// route === 'L1' || 'L2' and so on...

		// get reference to data
		const reference = ref(db, '/' + route);

		// set data on reference
		await set(reference, value);

		if (onSuccess) onSuccess(value);
	} catch (error) {
		const err = handleError(error);
		if (onError) onError(err);
	}
}
