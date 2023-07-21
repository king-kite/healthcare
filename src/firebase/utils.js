export function handleError(error) {
	return {
		message: error.code || error.message,
	};
}
