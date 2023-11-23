import { ValidationError } from "yup";

export function handleYupError(err) {
	if (err instanceof ValidationError) {
		if (err.inner.length > 0) {
			const error = err.inner.reduce(
				(acc, item) => {
					if (acc.message !== null) return acc;
					return {
						message: item.message,
						path: item.path,
					};
				},
				{ message: null, path: null }
			);
			return error;
		} else {
			const error = err.errors[0] || err.message;
			return { message: error, path: err.path };
		}
	}
	return undefined;
}
