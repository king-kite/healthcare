export function handleError(error) {
	console.log(error.message);
	return {
		message: error.code || error.message,
	};
}
